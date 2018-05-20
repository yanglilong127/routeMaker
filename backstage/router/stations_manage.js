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

    //获取公司所有添加过的站点
    server.post('/myroute/get_stations',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名

        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name=sz+'_'+username+'_stations';
                    var sql=`SELECT * FROM ${table_name} ORDER BY CAST(ctime as unsigned) DESC`;
                    connection.query(sql,(err,data)=>{
                        connection.release();
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            sessionCheck.update_database_last_time(req);
                            res.send({msg:'ok',data:data}).end();
                        }
                    });
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //公司添加站点
    server.post('/myroute/add_station',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var xml_id=req.body.xml_id;  //路线route_id
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
                    var table_name=zuhe_key+'_route_lang';
                    var sql=`SELECT lang FROM ${table_name} WHERE route_id='${xml_id}'`;
                    connection.query(sql,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            var languages=data;  //语言数组
                            //检查站点名称是否重复
                            table_name=zuhe_key+'_stations';
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
                                        //插入多对多表格
                                        /* var table_name2=zuhe_key+'_routes_stations';
                                        var sql2=`INSERT INTO ${table_name2}(route_id,station_id) VALUES
                                                ('${xml_id}','${station_id}')`;
                                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2)); */

                                        //站点语言表中插入站点语言
                                        var table_name3=zuhe_key+'_station_lang';
                                        var the_time=new Date().getTime();
                                        var sql3="INSERT INTO "+table_name3+"(ID,station_id,lang,transition) VALUES ";
                                        for(var i=0; i<languages.length; i++){
                                            var lang=languages[i].lang;  //语言
                                            var transition='';
                                            var ID=the_time+i;
                                            if(lang=='en.US'){
                                                transition=stations_name;
                                            }
                                            sql3 += "('"+ID+"','"+station_id+"','"+lang+"','"+transition+"')";
                                            if(i!=languages.length-1){
                                                sql3 += ',';
                                            }
                                        }
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
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //拖拽公司的站点，更新经纬度等信息
    server.post('/myroute/company_drag_station',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var station_id=req.body.station_id;  //站点id
        var origin_station_id=req.body.origin_station_id;  //原始站点id
        var route_id=req.body.route_id;  //站点id
        var latLng=req.body.latLng;  //经纬度
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name=zuhe_key+'_xml_table';
                    var sql=`SELECT * FROM ${table_name} WHERE ctime='${route_id}'`;
                    connection.query(sql,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            if(data.length==0){
                                connection.release();
                                res.send({msg:'no'}).end();
                            }else{
                                table_name=zuhe_key+'_stations';
                                sql =`UPDATE ${table_name} SET station_id='${station_id}',lng='${latLng.lng}',
                                    lat='${latLng.lat}' WHERE station_id='${origin_station_id}'`;
                                connection.query(sql,(err)=>{
                                    connection.release();
                                    if(err){
                                        console.log(err);
                                        res.status(500).send('connect to database error').end();
                                    }else{
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

    //为路线添加站点
    server.post('/myroute/route_add_station',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var route_id=req.body.route_id;  //路线route_id
        var station_id=req.body.station_id;  //站点station_id
        var station_ctime=req.body.station_ctime;  //路线新增站点时间
        if(ID && sz && username){
            function get_data(){
                return new Promise(function(resolve,reject){
                    db.getConnection((err,connection)=>{
                        if(err){
                            reject('err');
                        }else{
                            var table_name=zuhe_key+'_route_lang';
                            var sql=`SELECT lang FROM ${table_name} WHERE route_id='${route_id}'`;
                            connection.query(sql,(err,data)=>{
                                connection.release();
                                if(err){
                                    reject('err');
                                }else{
                                    if(data.length==0){
                                        reject('no');
                                    }else{
                                        resolve(data);
                                    }
                                }
                            });
                        }
                    });
                });
            };
            get_data()
            .then(function(data){
                db.getConnection((err,connection)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error').end();
                    }else{
                        //获取该站点已经存在的那几种语言翻译
                        var table_name=zuhe_key+'_station_lang';
                        var sql="SELECT * FROM "+table_name+" WHERE station_id='"+station_id+"' AND "
                                +"lang in (";
                        for(var i=0; i<data.length; i++){
                            var language=data[i].lang;
                            sql += "'" +language+"'";
                            if(i!=data.length-1){
                                sql += ","
                            }else{
                                sql += ")";
                            }
                        }
                        connection.query(sql,(err,data1)=>{
                            connection.release();
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                var sqlParamsEntity = [];
                                if(data1.length < data.length){ //这路线的翻译个数较少
                                    var sql1 = "REPLACE INTO "+table_name+" (ID,station_id,lang,transition) VALUES ";
                                    var the_time=new Date().getTime();
                                    for(var i=0; i<data.length; i++){
                                        var language=data[i].lang;
                                        var ID=the_time+i;  //ID值
                                        var transition="";  //翻译值
                                        for(var j=0; j<data1.length; j++){
                                            let lang=data1[j].lang;
                                            if(language===lang){
                                                ID = data1[j].ID;
                                                transition = data1[j].transition;
                                                break;
                                            }
                                        }
                                        sql1 += "('"+ID+"','"+station_id+"','"+language+"','"+transition+"')";
                                        if(i!=data.length-1){
                                            sql1 += ",";
                                        }
                                    }
                                    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
                                }
                                var table_name2=zuhe_key+'_routes_stations';
                                var sql2=`INSERT INTO ${table_name2} (ctime,route_id,station_id) VALUES 
                                        ('${station_ctime}','${route_id}','${station_id}')`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));
                                event_poll.execTrans(sqlParamsEntity,function(err,info){
                                    if(err){
                                        console.log(err);
                                        res.status(500).send('connect to database error').end();
                                    }else{
                                        sessionCheck.update_database_last_time(req);
                                        res.send({msg:'ok'}).end();
                                    }
                                });
                            }
                        });
                    }
                });
            },function(msg){
                if(msg==='err'){
                    res.send({msg:'err'}).end();
                }else if(msg==='no'){
                    res.send({msg:'no'}).end();
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //为路线删除公司站点
    server.post('/myroute/route_delete_station',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var route_id=req.body.route_id;  //路线route_id
        var station_id=req.body.station_id;  //站点station_id
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name=zuhe_key+'_xml_table';
                    var sql=`SELECT * FROM ${table_name} WHERE ctime='${route_id}'`;
                    connection.query(sql,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            connection.release();
                            if(data.length==0){
                                res.send({msg:'no'}).end();
                            }else{
                                var station_num=data[0].station_num;  //路线下的站点数目

                                var sqlParamsEntity = [];
                                sql=`UPDATE ${table_name} SET station_num=${station_num-1} 
                                    WHERE ctime='${route_id}'`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql));

                                var table_name1=zuhe_key+'_routes_stations';
                                var sql2=`DELETE FROM ${table_name1} WHERE route_id='${route_id}' AND
                                        station_id='${station_id}'`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));

                                event_poll.execTrans(sqlParamsEntity, (err, info)=>{
                                    if(err){
                                        res.status(500).send('connect to database error').end();
                                    }else{
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

    //获取该路线下已添加的站点数据
    server.post('/myroute/get_route_stations',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        if(ID && sz && username){
            var route_id=req.body.xml_id;  //路线route_id
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name1=zuhe_key+'_routes_stations';
                    var sql1=`SELECT ctime,station_id,inde FROM ${table_name1} WHERE route_id='${route_id}'
                            ORDER BY CAST(inde as unsigned) ASC`;
                    connection.query(sql1,(err,data)=>{
                        connection.release();
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            var added_stations=data;  //添加过的站点
                            if(added_stations.length>0){
                                var table_name2=zuhe_key+'_stations';
                                var sql2="SELECT * FROM "+table_name2+" WHERE station_id in (";
                                for(var i=0; i<added_stations.length; i++){
                                    var station_id=added_stations[i].station_id;
                                    sql2 += "'"+station_id+"'";
                                    if(i!=added_stations.length-1){
                                        sql2 += ",";
                                    }else{
                                        sql2 += ")";
                                    }
                                }
                                connection.query(sql2,(err,data)=>{
                                    if(err){
                                        console.log(err);
                                        res.status(500).send('connect to database error').end();
                                    }else{
                                        //将data按照added_stations中的顺序排好
                                        //todo
                                        for(var i=0; i<added_stations.length; i++){
                                            //已选站点的添加时间，用于批量更新数据时有用
                                            let ctime=added_stations[i].ctime;  
                                            let station_id=added_stations[i].station_id;
                                            let index=added_stations[i].inde; //序列号

                                            for(var j=0; j<data.length; j++){
                                                let the_station_id=data[j].station_id;
                                                let tmp_data={
                                                    ctime : ctime,
                                                    station_id : data[j].station_id,
                                                    stations_name : data[j].stations_name,
                                                    addr_content : data[j].addr_content,
                                                    lng : data[j].lng,
                                                    lat : data[j].lat,
                                                    city_name: data[j].city_name
                                                };
                                                if(station_id ==the_station_id){
                                                    data.splice(j,1);
                                                    data.splice(i,0,tmp_data)
                                                    break;
                                                }
                                            }
                                        }
                                        sessionCheck.update_database_last_time(req);
                                        res.send({msg:'ok',data:data}).end();
                                    }
                                });
                            }else{
                                sessionCheck.update_database_last_time(req);
                                res.send({msg:'ok',data:[]}).end();
                            }
                            
                        }
                    });
                }
            });

        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //更新某路线下的站点排列序号
    server.post('/myroute/sortable_station',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        if(ID && sz && username){
            var send_data=req.body.send_data;
            var route_id=send_data.route_id;
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    new Promise((resolve,reject)=>{
                        var table_name = zuhe_key+ '_xml_table';
                        var sql=`SELECT ctime FROM ${table_name} WHERE routes LIKE '%${route_id}%'`;
                        connection.query(sql,(err,data)=>{
                            connection.release();
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                if(data.length==0){
                                    reject('no');
                                }else{
                                    resolve({routes:data});
                                }
                            }
                        });
                    })
                    .then(function(data){
                        var sqlParamsEntity = [];

                        var table_name=zuhe_key+'_xml_table';
                        var routes= [];
                        for(var i=0; i<data.routes.length; i++){
                            let route_id = data.routes[i].ctime;
                            if(routes.indexOf(route_id)==-1){
                                routes.push(route_id);
                            }
                        }
                        var routes_str="";
                        for(var i=0; i<routes.length; i++){
                            routes_str += " routes LIKE '%" + routes[i]+ "%' ";
                            if(i!= routes.length-1){
                                routes_str += "OR";
                            }
                        }
                        var mtime = new Date().getTime().toString();
                        var sql=`UPDATE ${table_name} SET mtime='${mtime}' WHERE ${routes_str}`;
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql));
                        
                        //更新数据库
                        var sqlParamsEntity = [];
                        var table_name1=zuhe_key+'_routes_stations';
                        var sql1="REPLACE INTO "+table_name1+"(ctime,route_id,station_id,inde) VALUES ";
                        for(var i=0; i<send_data.stations.length; i++){
                            let ctime=send_data.stations[i].ctime;
                            let station_id=send_data.stations[i].station_id;
                            sql1 += "('"+ctime+"','"+route_id+"','"+station_id+"',"+i+")";
                            if(i != send_data.stations.length-1){
                                sql1 += ",";
                            }
                        }
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
                        //更新站点数目
                        var station_num=send_data.stations.length;
                        var table_name2=zuhe_key+'_xml_table';
                        var sql2=`UPDATE ${table_name2} SET station_num=${station_num}
                                WHERE ctime='${route_id}'`;
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));

                        event_poll.execTrans(sqlParamsEntity, function(err, info){
                            if(err){
                                //console.log('事务处理失败');
                                res.status(500).send('connect to database error').end();
                            }else{
                                //console.log('事务处理成功');
                                sessionCheck.update_database_last_time(req);
                                res.send({msg:'ok'}).end();
                            }
                        });
                    },function(msg){
                        res.send({msg:'no'}).end();
                    });
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //点击保存按钮，更新站点id以及经纬度、站点的排序
    server.post('/myroute/save_update_data',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        if(ID && sz && username){
            var route_id = req.body.xml_id;
            var get_data = req.body.send_data;
            return new Promise(function(resolve,reject){
                db.getConnection((err,connection)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error').end();
                    }else{
                        var table_name=zuhe_key+'_xml_table';
                        var sql = `SELECT * FROM ${table_name} WHERE ctime='${route_id}'`;
                        connection.query(sql,(err,data)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                if(data.length==0){
                                    reject('no');
                                }else{
                                    table_name = zuhe_key+ '_xml_table';
                                    sql=`SELECT ctime FROM ${table_name} WHERE routes LIKE '%${route_id}%'`;
                                    connection.query(sql,(err,data)=>{
                                        connection.release();
                                        if(err){
                                            console.log(err);
                                            res.status(500).send('connect to database error').end();
                                        }else{
                                            if(data.length==0){
                                                resolve({msg:'no'});
                                            }else{
                                                resolve({routes:data});
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            })
            .then(function(data){
                var sqlParamsEntity = [];
                if(data.msg!='no'){
                    var table_name=zuhe_key+'_xml_table';
                    var routes= [];
                    for(var i=0; i<data.routes.length; i++){
                        let route_id = data.routes[i].ctime;
                        if(routes.indexOf(route_id)==-1){
                            routes.push(route_id);
                        }
                    }
                    var routes_str="";
                    for(var i=0; i<routes.length; i++){
                        routes_str += " routes LIKE '%" + routes[i]+ "%' ";
                        if(i!= routes.length-1){
                            routes_str += " OR ";
                        }
                    }
                    var mtime = new Date().getTime().toString();
                    var sql=`UPDATE ${table_name} SET mtime='${mtime}' WHERE ${routes_str}`;
                    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql));
                }
                
                //更新顺序
                //更新经纬度以及站点station_id
                var table_name1=zuhe_key+'_stations';
                var sql1 = "UPDATE "+table_name1+" SET lng = CASE station_id "
                for(var i=0; i<get_data.length; i++){  //更新经度
                    var station_id = get_data[i].origin_station_id;
                    var lng = get_data[i].latLng.lng;
                    sql1 += " WHEN '"+station_id+"' THEN '"+lng+"' ";
                    if(i == get_data.length-1){
                        sql1 += "END, lat= CASE station_id ";
                    }
                }
                for(var i=0; i<get_data.length; i++){  //更新纬度
                    var station_id = get_data[i].origin_station_id;
                    var lat = get_data[i].latLng.lat;
                    sql1 += " WHEN '"+station_id+"' THEN '"+lat+"' ";
                    if(i == get_data.length-1){
                        sql1 += "END, station_id= CASE station_id ";
                    }
                }
                for(var i=0; i<get_data.length; i++){  //更新站点id
                    var station_id = get_data[i].station_id;
                    var origin_station_id = get_data[i].origin_station_id;
                    sql1 += " WHEN '"+origin_station_id+"' THEN '"+station_id+"' ";
                    if(i == get_data.length-1){
                        sql1 += "END WHERE station_id IN(";
                    }
                }
                for(var i=0; i<get_data.length; i++){  //站点id
                    var station_id = get_data[i].origin_station_id;
                    sql1 += "'"+station_id+"'";
                    if(i == get_data.length-1){
                        sql1 += ")";
                    }else{
                        sql1 += ",";
                    }
                }
                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
                var table_name2=zuhe_key+'_routes_stations';
                var sql2="REPLACE INTO "+table_name2+"(ctime,route_id,station_id,inde) VALUES ";
                for(var i=0; i<get_data.length; i++){
                    let ctime=get_data[i].ctime;
                    let station_id=get_data[i].station_id;
                    sql2 += "('"+ctime+"','"+route_id+"','"+station_id+"',"+i+")";
                    if(i != get_data.length-1){
                        sql2 += ",";
                    }
                }
                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2)); 
                event_poll.execTrans(sqlParamsEntity,function(err,info){
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error').end();
                    }else{
                        sessionCheck.update_database_last_time(req);
                        res.send({msg:'ok'}).end();
                    }
                });
            },function(msg){
                if(msg =='no'){
                    res.send({msg:'no'}).end();
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //获取公司站点数据信息
    server.post('/myroute/get_company_stations',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        if(ID && sz && username){
            var route_id = req.body.route_id;  //路线的id
            
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error.');
                }
                var table_name1=zuhe_key+'_xml_table';
                var sql1=`SELECT * FROM ${table_name1} WHERE ctime='${route_id}'`;
                connection.query(sql1, (err,data)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error.');
                    }else{
                        if(data.length==0){
                            connection.release();
                            res.send({msg:'no'}).end();
                        }else{
                            var table_name2=zuhe_key+'_stations';
                            sql2=`SELECT COUNT(*) AS count FROM ${table_name2}`;
                            connection.query(sql2,(err,data)=>{
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error.');
                                }else{
                                    var dataLen=data[0].count;  //数据总数
                                    if(dataLen==0){
                                        res.send({msg:'ok', data:[]}).end();
                                    }else{
                                        var sql3=`SELECT * FROM ${table_name2} 
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
                        }
                    }
                });
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //更改公司站点的名称和position
    server.post('/myroute/change_station_info',(req,res)=>{
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
                    var table_name=zuhe_key+'_routes_stations';
                    var sql=`SELECT route_id FROM ${table_name} WHERE station_id='${origin_station_id}'`;
                    connection.query(sql,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            table_name = zuhe_key+ '_xml_table';
                            sql ="SELECT ctime FROM "+table_name+" WHERE ";
                            for(var i=0; i<data.length; i++){
                                let route_id = data[i].route_id;
                                sql += "routes LIKE '%" +route_id+"%'";
                                if(i!=0 && i!=data.length-1){
                                    sql += " OR ";
                                }
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
                    routes = "("+ routes.join(',')+ ")" ;
                    var mtime = new Date().getTime().toString();
                    var sql=`UPDATE ${table_name} SET mtime='${mtime}' WHERE ctime IN ${routes}`;
                    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql));

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
                });
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });
}


module.exports={
    station_manage
}