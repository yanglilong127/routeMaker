//对站点的管理脚本
const fs=require('fs');
const event_poll=require('./dbHelper');  //事务回滚
const xml2js=require('xml2js');
const builder=new xml2js.Builder();
const parser=new xml2js.Parser();
const sessionCheck=require('./check_session.js');  //更新最后操作的时间

//数据库连接
const db=require('./databaseConnection').pool;

var station_manage=function(server){

    //公司添加站点
    server.post('/myroute/company_add_station',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var ctime=req.body.ctime;  //创建时间
        var station_id=req.body.station_id;  //站点id
        var stations_name=req.body.stations_name; //站点名
        var addr_content=req.body.addr_content;  //marker内容
        var city_name=req.body.city_name; //城市名
        var latLng=req.body.latLng;  //经纬度
        var lat=latLng.lat; //纬度
        var lng=latLng.lng; //经度
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    //检查站点名称是否重复
                    var table_name=zuhe_key+'_stations';
                    sql=`SELECT stations_name,station_id FROM ${table_name} WHERE 
                            stations_name='${stations_name}'`;
                    connection.query(sql, (err,data)=>{
                        connection.release();
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error.');
                        }else{
                            if(data.length ==1){
                                res.send({msg:'has'}).end();
                            }else{
                                //执行多条sql语句
                                var sqlParamsEntity = [];

                                //插入公司站点
                                var table_name1=zuhe_key+'_stations';
                                var sql1=`INSERT INTO ${table_name1}(ctime,station_id,stations_name,addr_content,lat,lng,city_name) 
                                        VALUES('${ctime}','${station_id}','${stations_name}','${addr_content}','${lat}','${lng}',
                                        '${city_name}')`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));

                                //站点语言表中插入站点语言
                                var table_name3=zuhe_key+'_station_lang';
                                var the_time=new Date().getTime();
                                var sql3=`INSERT INTO ${table_name3} (ID,station_id,lang,transition) VALUES 
                                        ('${the_time}','${station_id}','en.US','${stations_name}')`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql3));

                                event_poll.execTrans(sqlParamsEntity, (err, info)=>{
                                    if(err){
                                        //console.log('事务处理失败');
                                        res.status(500).send('connect to database error').end();
                                    }else{
                                        //console.log('事务处理成功');
                                        sessionCheck.update_database_last_time(req);
                                        res.send({msg:'ok'}).end();
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //公司删除某个站点
    server.post('/myroute/company_delete_station',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var station_id=req.body.station_id;  //站点id
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    new Promise((resolve,reject)=>{
                        var table_name=zuhe_key+'_routes_stations';
                        var sql=`SELECT route_id FROM ${table_name} WHERE station_id='${station_id}'`;
                        connection.query(sql,(err,data)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                resolve(data);
                            }
                        });
                    })
                    .then(function(data){
                        if(data.length !=0){
                            var table_name = zuhe_key+ '_xml_table';
                            var sql ="SELECT ctime FROM "+table_name+" WHERE ";
                            for(var i=0; i<data.length; i++){
                                let route_id = data[i].route_id;
                                if(i!=0){
                                    sql += " OR ";
                                }
                                sql += "routes LIKE '%" +route_id+"%'";
                            }
                            return new Promise((resolve,reject)=>{
                                connection.query(sql,(err,data1)=>{
                                    connection.release();
                                    if(err){
                                        console.log(err);
                                        res.status(500).send('connect to database error').end();
                                    }else{
                                        resolve({routes1:data,routes2:data1});
                                    }
                                });
                            });
                        }else{
                            return {msg:'no'}; //没有需要更新的
                        }
                    })
                    .then(function(data){
                        var sqlParamsEntity = [];

                        if(data.msg!='no'){
                            var table_name1=zuhe_key+'_xml_table';
                            var routes= [];
                            for(var i=0; i<data.routes1.length; i++){
                                let route_id = data.routes1[i].route_id;
                                if(routes.indexOf(route_id)==-1){
                                    routes.push(route_id);
                                }
                            }
                            for(var i=0; i<data.routes2.length; i++){
                                let route_id = data.routes2[i].ctime;
                                if(routes.indexOf(route_id)==-1){
                                    routes.push(route_id);
                                }
                            }
                            if(routes.length>0){
                                routes = "("+ routes.join(',')+ ")" ;
                                var mtime = new Date().getTime().toString();
                                var sql1=`UPDATE ${table_name1} SET station_num = station_num-1,mtime='${mtime}' 
                                    WHERE ctime IN ${routes}`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
                            }
                        }

                        var table_name2=zuhe_key+'_stations';
                        var sql2=`DELETE FROM ${table_name2} WHERE station_id='${station_id}'`;
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));    
                        event_poll.execTrans(sqlParamsEntity, (err, info)=>{
                            if(err){
                                res.status(500).send('connect to database error').end();
                            }else{
                                sessionCheck.update_database_last_time(req);
                                res.send({msg:'ok'}).end();
                            }
                        });
                    });
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //更改公司站点的名称和position
    server.post('/myroute/company_change_station_info',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        if(ID && sz && username){
            var origin_station_id = req.body.origin_station_id;  //原始的station_id
            var station_id = req.body.station_id;  //更改后的station_id
            var latLng = req.body.latLng;  //经纬度
            var station_name = req.body.station_name;  //站点名称
            //var addr_content='<div><strong>' + station_name + '</strong><br></div>'; 
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error.');
                }
                new Promise((resolve,reject)=>{
                    var table_name=zuhe_key+'_stations';
                    var sql1=`SELECT stations_name,station_id FROM ${table_name} WHERE 
                            stations_name='${station_name}'`;
                    connection.query(sql1, (err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error.');
                        }else{
                            if((data.length ==1)  && (data[0].station_id !=origin_station_id)){
                                reject('has');
                            }else{
                                table_name=zuhe_key+'_routes_stations';
                                sql=`SELECT route_id FROM ${table_name} WHERE station_id='${origin_station_id}'`;
                                connection.query(sql,(err,data)=>{
                                    if(err){
                                        console.log(err);
                                        res.status(500).send('connect to database error').end();
                                    }else{
                                        if(data.length ==0){
                                            resolve({routes1:data,routes2:[]});
                                        }else{
                                            table_name = zuhe_key+ '_xml_table';
                                            sql ="SELECT ctime FROM "+table_name+" WHERE ";
                                            for(var i=0; i<data.length; i++){
                                                let route_id = data[i].route_id;
                                                if(i!=0){
                                                    sql += " OR ";
                                                }
                                                sql += "routes LIKE '%" +route_id+"%'";
                                            }
                                            connection.query(sql,(err,data1)=>{
                                                connection.release();
                                                if(err){
                                                    console.log(err);
                                                    res.status(500).send('connect to database error').end();
                                                }else{
                                                    resolve({routes1:data,routes2:data1});
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                })
                .then(function(data){
                    var sqlParamsEntity = [];

                    var table_name=zuhe_key+'_xml_table';
                    var routes= [];
                    for(var i=0; i<data.routes1.length; i++){
                        let route_id = data.routes1[i].route_id;
                        if(routes.indexOf(route_id)==-1){
                            routes.push(route_id);
                        }
                    }
                    for(var i=0; i<data.routes2.length; i++){
                        let route_id = data.routes2[i].ctime;
                        if(routes.indexOf(route_id)==-1){
                            routes.push(route_id);
                        }
                    }
                    if(routes.length>0){
                        routes = "("+ routes.join(',')+ ")" ;
                        var mtime = new Date().getTime().toString();
                        var sql=`UPDATE ${table_name} SET mtime='${mtime}' WHERE ctime IN ${routes}`;
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql));
                    }

                    //更新stations表
                    var table_name1 = zuhe_key+ '_stations';
                    var sql1 = `UPDATE ${table_name1} SET station_id='${station_id}',
                            stations_name='${station_name}',lat='${latLng.lat}',lng='${latLng.lng}' 
                            WHERE station_id='${origin_station_id}'`;
                    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
                    //更新站点英文翻译表station_lang
                    var table_name2 = zuhe_key+ '_station_lang';
                    var sql2 = `UPDATE ${table_name2} SET transition='${station_name}'
                                WHERE station_id='${station_id}' AND lang='en.US'`;
                    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));
                    event_poll.execTrans(sqlParamsEntity,(err,info)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            sessionCheck.update_database_last_time(req);
                            res.send({msg:'ok'}).end();
                        }
                    });
                },function(msg){
                    res.send({msg:'has'}).end();
                });
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //获取公司站点数据信息
    server.post('/myroute/get_company_stations_manage',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error.');
                }
                var table_name1=zuhe_key+'_stations';
                var sql1=`SELECT COUNT(*) AS count FROM ${table_name1}`;
                connection.query(sql1,(err,data)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error.');
                    }else{
                        var dataLen=data[0].count;  //数据总数
                        if(dataLen==0){
                            res.send({msg:'ok', data:[]}).end();
                        }else{
                            var sql3=`SELECT * FROM ${table_name1} 
                                    ORDER BY city_name`;
                            connection.query(sql3,(err,data)=>{
                                connection.release();
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error.');
                                }else{
                                    sessionCheck.update_database_last_time(req);
                                    res.send({msg:'ok', data,dataLen:dataLen}).end();
                                }
                            });
                        }
                    }
                });
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //拖拽公司的站点，更新经纬度等信息
    server.post('/myroute/company_manage_drag_station',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var station_id=req.body.station_id;  //站点id
        var origin_station_id=req.body.origin_station_id;  //原始站点id
        var latLng=req.body.latLng;  //经纬度
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    new Promise((resolve,reject)=>{
                        var table_name=zuhe_key+'_routes_stations';
                        var sql=`SELECT route_id FROM ${table_name} WHERE station_id='${origin_station_id}'`;
                        connection.query(sql,(err,data)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                if(data.length ==0){
                                    resolve({routes1:data,routes2:[]});
                                }else{
                                    table_name = zuhe_key+ '_xml_table';
                                    sql ="SELECT ctime FROM "+table_name+" WHERE ";
                                    for(var i=0; i<data.length; i++){
                                        let route_id = data[i].route_id;
                                        if(i!=0){
                                            sql += " OR ";
                                        }
                                        sql += "routes LIKE '%" +route_id+"%'";
                                    }
                                    connection.query(sql,(err,data1)=>{
                                        connection.release();
                                        if(err){
                                            console.log(err);
                                            res.status(500).send('connect to database error').end();
                                        }else{
                                            resolve({routes1:data,routes2:data1});
                                        }
                                    });
                                }
                            }
                        });
                    })
                    .then(function(data){
                        var sqlParamsEntity = [];
                        var table_name=zuhe_key+'_xml_table';
                        var routes= [];
                        for(var i=0; i<data.routes1.length; i++){
                            let route_id = data.routes1[i].route_id;
                            if(routes.indexOf(route_id)==-1){
                                routes.push(route_id);
                            }
                        }
                        for(var i=0; i<data.routes2.length; i++){
                            let route_id = data.routes2[i].ctime;
                            if(routes.indexOf(route_id)==-1){
                                routes.push(route_id);
                            }
                        }
                        if(routes.length>0){
                            routes = "("+ routes.join(',')+ ")" ;
                            var mtime = new Date().getTime().toString();
                            var sql=`UPDATE ${table_name} SET mtime='${mtime}' WHERE ctime IN ${routes}`;
                            sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql));
                        }

                        var table_name1=zuhe_key+'_stations';
                        var sql1 =`UPDATE ${table_name1} SET station_id='${station_id}',lng='${latLng.lng}',
                            lat='${latLng.lat}' WHERE station_id='${origin_station_id}'`;
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
                        event_poll.execTrans(sqlParamsEntity,(err,info)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                sessionCheck.update_database_last_time(req);
                                res.send({msg:'ok'}).end();
                            }
                        });
                    });
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //查看公司该站点下被哪些路线所使用
    server.post('/myroute/company_manage_used_for',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var station_id=req.body.station_id;  //站点id
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name=zuhe_key+'_routes_stations';
                    var sql =`SELECT route_id,station_id FROM ${table_name} WHERE station_id='${station_id}'`;
                    connection.query(sql,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            sessionCheck.update_database_last_time(req);
                            if(data.length!=0){
                                table_name = zuhe_key+ '_xml_table';
                                sql = "SELECT ctime,filename FROM " + table_name + " WHERE ctime IN(";
                                for(var i=0; i<data.length; i++){
                                    var route_id = data[i].route_id;
                                    sql += "'" +route_id+ "'";
                                    if(i !=data.length-1){
                                        sql += ",";
                                    }else{
                                        sql += ")";
                                    }
                                }
                                connection.query(sql,(err,data)=>{
                                    connection.release();
                                    if(err){
                                        console.log(err);
                                        res.status(500).send('connect to database error').end();
                                    }else{
                                        res.send({msg:'ok',used_data:data}).end();
                                    }
                                });
                            }else{
                                res.send({msg:'ok',used_data:[]}).end();
                            }
                        }
                    });
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //查看该公司下站点以及翻译
    /* server.post('/myroute/company_stations_get_transition', (req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    //先查路线翻译表
                    var table_name1=zuhe_key+'_user_table';
                    var sql1=`SELECT languages FROM ${table_name1}
                        WHERE sz=${sz} AND username='${username}'`;
                    connection.query(sql1,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            var languages=data[0].languages;  //公司翻译语言
                            languages = languages.split(','); //使之为数组

                            //查路线对站点 多对多表
                            var table_name2=zuhe_key+'_routes_stations';
                            var sql2=`SELECT station_id FROM ${table_name2}
                                WHERE route_id=${xml_id} ORDER BY CAST(inde as unsigned)`;
                            connection.query(sql2,(err,data)=>{
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    var stations=data;  //该路线下的站点

                                    //查路线对应站点的翻译
                                    if(stations.length>0){
                                        var table_name3=zuhe_key+'_station_lang';
                                        var sql3="SELECT ID,station_id,lang,transition FROM " +table_name3+" WHERE ";
                                        for(var i=0; i<stations.length; i++){
                                            var station_id=stations[i].station_id;
                                            if(i!=0){
                                                sql3 +=" or";
                                            }
                                            sql3 += " station_id=" +station_id;
                                        }
                                        connection.query(sql3,(err,data)=>{
                                            if(err){
                                                console.log(err);
                                                res.status(500).send('connect to database error').end();
                                            }else{
                                                var stations_data1=data;  //该路线下的站点的翻译

                                                var table_name4=zuhe_key+'_stations';
                                                //查找站点对应的
                                                var sql4="SELECT ctime,station_id,stations_name,lng,lat FROM " +table_name4+" WHERE ";
                                                for(var i=0; i<stations.length; i++){
                                                    var station_id=stations[i].station_id;
                                                    if(i!=0){
                                                        sql4 +=" or";
                                                    }
                                                    sql4 += " station_id=" +station_id;
                                                }
                                                connection.query(sql4,(err,data)=>{
                                                    connection.release();
                                                    if(err){
                                                        console.log(err);
                                                        res.status(500).send('connect to database error').end();
                                                    }else{
                                                        var stations_data2=data;  //该路线下的站点的经纬度
                                                        for(var i=0; i<stations.length; i++){
                                                            //已选站点的添加时间，用于批量更新数据时有用
                                                            let station_id=stations[i].station_id;
                
                                                            for(var j=0; j<stations_data2.length; j++){
                                                                let the_station_id=stations_data2[j].station_id;
                                                                let tmp_data={
                                                                    ctime : stations_data2[j].ctime,
                                                                    station_id : stations_data2[j].station_id,
                                                                    stations_name : stations_data2[j].stations_name,
                                                                    addr_content : stations_data2[j].addr_content,
                                                                    lng : stations_data2[j].lng,
                                                                    lat : stations_data2[j].lat,
                                                                };
                                                                if(station_id ==the_station_id){
                                                                    stations_data2.splice(j,1);
                                                                    stations_data2.splice(i,0,tmp_data)
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                        sessionCheck.update_database_last_time(req);
                                                        res.send({msg:'ok',route_data,stations_data1,stations_data2}).end();
                                                    }
                                                });
                                            }
                                        });
                                    }else{
                                        //console.log('没有站点')
                                        var stations_data1=[];  //该路线下的站点的翻译
                                        var stations_data2=[];  //该路线下的站点的经纬度
                                        sessionCheck.update_database_last_time(req);
                                        res.send({msg:'ok',route_data,stations_data1,stations_data2}).end();
                                    }
                                    
                                }
                            });
                        }
                    });
                }
            });
        }else{
            res.send({msg:'err'}).end();
        }
    });

    //为路线增加(或者减少)多种语言
    server.post('/myroute/company_station/:action/language',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var action=req.params.action;  //操作
        var language_num=req.body.language_num;  //语言数目
        var xml_id=req.body.xml_id;  //路线route_id
        if(ID && sz && username){
            var route_id=req.body['xml_id']; //路线id
            var language=req.body['jianchen']; //增加的语言简称
            var stations=req.body['stations']; //站点station_id数组
            if(action=='add'){

                //执行多条sql语句
                var sqlParamsEntity = [];
                var table_name1=zuhe_key+'_route_lang';
                var the_time=new Date().getTime();
                var sql1=`INSERT INTO ${table_name1} (ID,route_id,lang,transition) 
                            VALUES('${the_time}','${route_id}','${language}','')`;
                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));

                var table_name2=zuhe_key+'_station_lang';
                function get_data(){
                    return  new Promise(function(resolve,reject){
                        //获取新增的route语言的ID值
                        if(stations){
                            db.getConnection((err,connection)=>{
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    sql1="SELECT ID,station_id,transition FROM "+table_name2+" WHERE lang='"+language
                                        +"' AND station_id in(";
                                    for(var i=0; i<stations.length; i++){
                                        let station_id=stations[i];
                                        sql1 += "'"+station_id+"'";
                                        if(i !=stations.length-1){
                                            sql1 += ",";
                                        }else{
                                            sql1 += ")";
                                        }
                                    }
                                    connection.query(sql1,(err,data)=>{
                                        connection.release();
                                        if(err){
                                            console.log(err);
                                            reject('err');
                                        }else{
                                            var sql2="REPLACE INTO "+table_name2+ " (ID,station_id,lang,transition)" 
                                                    +  " VALUES ";
                                            let this_time=new Date().getTime();
                                            for(var i=0; i<stations.length; i++){
                                                var station_id=stations[i];
                                                var ID=this_time+i;
                                                var transition='';
                                                for(var j=0; j<data.length; j++){
                                                    let _ID=data[j].ID;
                                                    let _stationID=data[j].station_id;
                                                    let _transition=data[j].transition;
                                                    if(station_id===_stationID){
                                                        ID=_ID;
                                                        transition=_transition;
                                                        break;
                                                    }
                                                }
                                                sql2 += "('"+ID+"',"+station_id+",'"+language+"','"+transition+"')";
                                                if(i!=stations.length-1){
                                                    sql2 += ",";
                                                }
                                            }
                                            sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));
                                            resolve();
                                        }
                                    });
                                }
                            });
                        }else{
                            resolve();
                        }
                    })
                }
                get_data()
                .then(function(){
                    var table_name3=zuhe_key+'_xml_table';
                    var mtime=new Date().getTime();
                    //更新修改时间和语言数目
                    var sql3=`UPDATE ${table_name3} SET language_num=${language_num},
                            mtime='${mtime}' WHERE ctime=${xml_id}`;
                    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql3));

                    event_poll.execTrans(sqlParamsEntity, function(err, info){
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            //获取新增的route语言的ID值
                            db.getConnection((err,connection)=>{
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    var sql4=`SELECT ID FROM ${table_name1} WHERE route_id='${route_id}' 
                                            AND lang='${language}'`;
                                    connection.query(sql4,(err,data)=>{
                                        if(err){
                                            console.log(err);
                                            res.status(500).send('connect to database error').end();
                                        }else{
                                            var route_lang_id=data[0].ID;
                                            if(stations){
                                                sql4="SELECT ID,station_id,transition FROM "+table_name2+" WHERE lang='"+language
                                                    +"' AND station_id in(";
                                                for(var i=0; i<stations.length; i++){
                                                    let station_id=stations[i];
                                                    sql4 += "'"+station_id+"'";
                                                    if(i !=stations.length-1){
                                                        sql4 += ",";
                                                    }else{
                                                        sql4 += ")";
                                                    }
                                                }
                                                connection.query(sql4,(err,data)=>{
                                                    connection.release();
                                                    if(err){
                                                        console.log(err);
                                                        res.status(500).send('connect to database error').end();
                                                    }else{
                                                        var stations_data=data;  //返回站点的ID和station_id数组
                                                        sessionCheck.update_database_last_time(req);
                                                        res.send({msg:'ok',route_lang_id,stations_data}).end();
                                                    }
                                                });
                                            }else{
                                                var stations_data=[];  //返回站点的ID和station_id数组
                                                sessionCheck.update_database_last_time(req);
                                                res.send({msg:'ok',route_lang_id,stations_data}).end();
                                            }
                                            
                                        }
                                    });
                                }
                            });
                        }
                    });
                },function(msg){
                    if(msg==='err'){
                        res.status(500).send('connect to database error').end();
                    }
                });
                
            }else if(action=='delete'){
                var sqlParamsEntity = [];
                var table_name1=zuhe_key+'_route_lang';
                var sql1=`DELETE FROM ${table_name1} WHERE route_id='${route_id}' AND lang='${language}'`;
                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));

                //更新语言的数目记录
                var table_name3=zuhe_key+'_xml_table';
                var mtime=new Date().getTime();
                //更新修改时间和语言数目
                var sql3=`UPDATE ${table_name3} SET language_num=${language_num},
                        mtime='${mtime}' WHERE ctime=${xml_id}`;
                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql3));

                event_poll.execTrans(sqlParamsEntity, function(err, info){
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error').end();
                    }else{
                        sessionCheck.update_database_last_time(req);
                        res.send({msg:'ok'}).end();
                    }
                });
            }else{
                res.send({msg:'ERROR operation'}).end();
            }
        }else{
            res.send({msg:'err'}).end();
        }
    }); */

}


module.exports={
    station_manage
}