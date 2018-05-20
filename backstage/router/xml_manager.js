//对xml文件信息的管理脚本
const fs=require('fs');
const event_poll=require('./dbHelper');  //事务回滚
const xml2js=require('xml2js');
const builder=new xml2js.Builder();
const parser=new xml2js.Parser();
//数据库连接
const db=require('./databaseConnection').pool;
const sessionCheck=require('./check_session.js'); //更新最后操作的时间
const common_funs=require('../funcs/common');  //一些公共函数


var xmlManager=function(server){
    //新建xml请求
    server.post('/myroute/create_new_profile',(req,res)=>{
        var filename=req.body.filename;  //xml文件名
        var description=req.body.description;  //xml文件名
        var remove_sysm_filename=req.body.remove_sysm_filename;  //去点标点后的xml文件名
        
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;   //组合主键
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name=zuhe_key+'_xml_table';  //表名
                    //先查询有无该路线名
                    var sql=`SELECT filename from ${table_name} WHERE 
                            new_filename='${remove_sysm_filename}'`;
                    connection.query(sql,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            if(data.length>0){
                                res.send({msg:'has',filename:data[0].filename}).end();
                            }else{
                                connection.release();
                                //执行多条sql语句
                                var sqlParamsEntity = [];
                                var ctime=new Date().getTime().toString();
                                var mtime=ctime;
                                //路线表中插入路线名
                                var sql1=`INSERT INTO ${table_name} (filename,ctime,new_filename,mtime,description,routes)
                                        VALUES('${filename}','${ctime}','${remove_sysm_filename}','${mtime}','${description}','${ctime}')`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
                                //路线语言中插入英语翻译
                                var table_name2=zuhe_key+'_route_lang';
                                var sql2=`INSERT INTO ${table_name2} (ID,route_id,lang,transition)
                                        VALUES('${ctime}','${ctime}','en.US','${filename}')`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));

                                event_poll.execTrans(sqlParamsEntity, (err, info)=>{
                                    if(err){
                                        //console.log('事务处理失败');
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
            res.send({msg:'err'}).end()
        }
    });

    //获取路线xml数据
    server.post('/myroute/get_xml_data',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;   //组合主键

        var filename=req.body.filename;  //文件名
        var first_load=req.body.first_load;  //是否是第一次请求
        var page=req.body.page;  //页码
        if(page < 1){
            page = 1;
        }
        var nums_limit=req.body.nums_limit;  //取的数据条数
        var start= (page-1)* nums_limit;  //起始位置
        
        if(ID && sz && username){  //还存在session
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var sql=`SELECT username,disk_space from user_table where id=${ID}
                            and sz='${sz}' and username='${username}'`;
                    connection.query(sql,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else if(data.lenght===0){
                            res.send({msg:'No'}).end();  //用户不存在
                        }else{
                            var disk_space=data[0].disk_space;  //用户磁盘总空间
                            var table_name=sz+'_'+username+'_xml_table';
                            if(filename){  //搜索
                                sql=`SELECT COUNT(*) AS count FROM ${table_name} where filename LIKE '%${filename}%'`;
                            }else{
                                sql=`SELECT COUNT(*) AS count FROM ${table_name}`;
                            }
                            connection.query(sql,(err,data)=>{
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    var dataLen=data[0].count;  //数据总数
                                    if(filename){
                                        sql=`SELECT * FROM ${table_name} where filename LIKE '%${filename}%'
                                            ORDER BY CAST(mtime as unsigned) desc LIMIT ${start},${nums_limit}`;
                                    }else{
                                        sql=`SELECT * FROM ${table_name}
                                            ORDER BY CAST(mtime as unsigned) desc LIMIT ${start},${nums_limit}`;
                                    }
                                    connection.query(sql,(err,data)=>{
                                        if(err){
                                            console.log(err);
                                            res.status(500).send('connect to database error').end();
                                        }else{
                                            var ret_data=data;
                                            //需要读取文件夹的位置
                                            if(first_load){  //来自于第一次请求
                                                var filenameDir='./web/dist/myroute/profiles/'+zuhe_key;
                                                var dataSize=common_funs.dirSize(filenameDir);  //文件夹大小
                                                sessionCheck.update_database_last_time(req);
                                                res.send({msg:'ok',dataLen,ret_data,dataSize,disk_space});
                                            }else{
                                                sessionCheck.update_database_last_time(req);
                                                res.send({msg:'ok',dataLen,ret_data,disk_space});
                                            }
                                        }
                                    });
                                } 
                            });  
                        }
                    });
                }
            });
        }else{
            res.send({msg:'err'}).end()
        }
    });

    //更改xml里的描述
    server.post('/myroute/change_xml_description',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名

        var xml_id=req.body.xml_id;//创建文件的时间戳
        var description=req.body.description;
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name=sz+'_'+username+'_xml_table';
                    var sql=`UPDATE ${table_name} SET description='${description}'
                            WHERE ctime=${xml_id}`;
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
            });
        }else{
            res.send({msg:'err'}).end();
        }
    });

    //更改xml的文件名
    server.post('/myroute/change_xml_filename',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key = sz+'_'+username;

        var xml_id=req.body.xml_id;  //创建文件的时间戳
        var filename=req.body.filename;
        var remove_sysm_filename=req.body.remove_sysm_filename;  //去点标点后的xml文件名
        var new_filename=req.body.new_filename;
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name=zuhe_key+'_xml_table';
                    new Promise((resolve,reject)=>{
                        //先查询有无该路线名
                        var sql=`SELECT filename,ctime from ${table_name} WHERE 
                                new_filename='${remove_sysm_filename}'`;
                        connection.query(sql,(err,data)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                if(data.length>0 && (data[0].ctime!= xml_id) ){
                                    res.send({msg:'has',filename:data[0].filename}).end();
                                }else{
                                    //再查询该路线被哪些合并的路线使用了
                                    var table_name1 = zuhe_key + '_xml_table';
                                    var sql1 = `SELECT ctime FROM ${table_name1} WHERE routes LIKE '%${xml_id}%'`;
                                    connection.query(sql1,(err,data)=>{
                                        connection.release();
                                        if(err){
                                            console.log(err);
                                            res.status(500).send('connect to database error').end();
                                        }else{
                                            resolve(data);
                                        }
                                    });
                                }
                            }
                        });
                    })
                    .then(function(data){
                        //执行多条sql语句
                        var mtime = new Date().getTime().toString();
                        var sqlParamsEntity = [];
                        var sql1=`UPDATE ${table_name} SET filename='${new_filename}',
                            new_filename='${remove_sysm_filename}' WHERE ctime=${xml_id}`;
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));

                        var table_name2 = sz+'_'+username+'_route_lang';  //更新翻译
                        var sql2=`UPDATE ${table_name2} SET transition='${new_filename}'
                            WHERE route_id='${xml_id}' AND lang='en.US'`;
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));

                        var sql3=`UPDATE ${table_name} SET mtime='${mtime}'
                            WHERE routes LIKE '%${xml_id}%'`;
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql3));
                        event_poll.execTrans(sqlParamsEntity, (err, info)=>{
                            if(err){
                                //console.log('事务处理失败');
                                res.status(500).send('connect to database error').end();
                            }else{
                                var file_dir='./web/dist/myroute/profiles/'+sz+'_'+username+'/';
                                fs.stat(file_dir+filename+'.xml',(err,sta)=>{
                                    if(sta){
                                        var src_file=file_dir+filename+'.xml';
                                        var dst_file=file_dir+new_filename+'.xml'
                                        //重命名
                                        fs.renameSync(src_file, dst_file);
                                        sessionCheck.update_database_last_time(req);
                                        res.send({msg:'ok',changed_routes:data}).end();
                                    }else{
                                        sessionCheck.update_database_last_time(req);
                                        res.send({msg:'ok',changed_routes:data}).end();
                                    }
                                });
                            }
                        });
                    })
                }
            });
        }else{
            res.send({msg:'err'}).end();
        }
    });

    //删除某个xml
    server.post('/myroute/delete_xml',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+ '_'+username;

        var xml_id=req.body.xml_id;  //创建文件的时间戳
        var filename=req.body.filename;
        if(ID && sz && username){
            function del_origin_xml(){
                return new Promise(function(resolve,reject){
                    db.getConnection((err,connection)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            var table_name=zuhe_key+'_xml_table';
                            var sql=`SELECT routes,filename,mtime FROM ${table_name} WHERE 
                                ctime='${xml_id}' OR routes LIKE '%${xml_id}%'`;
                            connection.query(sql,(err,data)=>{
                                connection.release();
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    if(data.length!=0){
                                        resolve(data);
                                        //删除原先的xml
                                        /* var filename=data[0].filename;
                                        var mtime = Number(data[0].mtime);
                                        mtime = new Date(mtime);  //将时间戳转为时间对象
                                        mtime = common_funs.forMatDate(mtime,false);
                                        filename = "RouteEdit_"+filename+"_" + mtime + '.xml';
                                        var file_dir='./web/dist/myroute/profiles/'+zuhe_key+'/'+filename;
                                        fs.stat(file_dir,(err,sta)=>{
                                            if(sta){
                                                fs.unlinkSync(file_dir);
                                                resolve();
                                            }else{
                                                resolve();
                                            }
                                        }); */
                                    }else{
                                        reject('no');
                                    } 
                                }
                            });
                        }
                    });
                });
            };
            del_origin_xml()
            .then(function(data){
                db.getConnection((err,connection)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error').end();
                    }else{
                        var table_name=sz+'_'+username+'_xml_table';
                        var sql=`DELETE FROM ${table_name} WHERE ctime='${xml_id}' OR routes LIKE '%${xml_id}%'`;
                        connection.query(sql,(err)=>{
                            connection.release();
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                sessionCheck.update_database_last_time(req);
                                //删除原先的xml
                                var i_index=0;
                                delete_xml();
                                function delete_xml(){
                                    var filename=data[i_index].filename;
                                    var mtime = Number(data[i_index].mtime);
                                    mtime = new Date(mtime);  //将时间戳转为时间对象
                                    mtime = common_funs.forMatDate(mtime,false);
                                    filename = "RouteEdit_"+filename+"_" + mtime + '.xml';
                                    var file_dir='./web/dist/myroute/profiles/'+zuhe_key+'/'+filename;
                                    fs.stat(file_dir,(err,sta)=>{
                                        if(sta){
                                            fs.unlinkSync(file_dir);
                                        }
                                        i_index ++;
                                        if(i_index < data.length){
                                            delete_xml();
                                        }else{
                                            res.send({msg:'ok'}).end();
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            },function(msg){
                if(msg=='no'){
                    res.send({msg:'err'}).end();
                }
            });
        }else{
            res.send({msg:'err'}).end();
        }
    });

    //查看单一路线信息请求
    server.post('/myroute/get_routeInfo', (req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;
        var xml_id=req.body.xml_id;  //创建文件的时间戳
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    //先查路线翻译表
                    var table_name1=zuhe_key+'_route_lang';
                    var sql1=`SELECT ID,lang,transition FROM ${table_name1}
                        WHERE route_id=${xml_id}`;
                    connection.query(sql1,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            var route_data=data;  //路线翻译数据

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

    //查看合并路线信息请求
    server.post('/myroute/get_merge_route_info', (req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        function getAllData(zuhe_key,xml_id){
            return new Promise(function(resolve,reject){
                db.getConnection((err,connection)=>{
                    if(err){
                        console.log(err);
                        connection.release();
                        resolve({msg:'err'});
                    }else{
                        //先查路线翻译表
                        var table_name1=zuhe_key+'_route_lang';
                        var sql1=`SELECT * FROM ${table_name1}
                            WHERE route_id=${xml_id}`;
                        connection.query(sql1,(err,data)=>{
                            if(err){
                                console.log(err);
                                connection.release();
                                resolve({msg:'err'});
                            }else{
                                var route_data=data;  //路线翻译数据
    
                                //查路线对站点 多对多表
                                var table_name2=zuhe_key+'_routes_stations';
                                var sql2=`SELECT station_id FROM ${table_name2}
                                    WHERE route_id=${xml_id} ORDER BY CAST(inde as unsigned)`;
                                connection.query(sql2,(err,data)=>{
                                    if(err){
                                        console.log(err);
                                        connection.release();
                                        resolve({msg:'err'});
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
                                                    connection.release();
                                                    resolve({msg:'err'});
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
                                                            connection.release();
                                                            resolve({msg:'err'});
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
                                                            resolve({route_data,stations_data1,stations_data2});
                                                        }
                                                    });
                                                }
                                            });
                                        }else{
                                            //console.log('没有站点')
                                            var stations_data1=[];  //该路线下的站点的翻译
                                            var stations_data2=[];  //该路线下的站点的经纬度
                                            resolve({route_data,stations_data1,stations_data2});
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
        var route_id=req.body.route_id;  //路线的route_id
        if(ID && sz && username){
            function ret_route_data(){
                return new Promise(function(resolve,reject){
                    db.getConnection((err,connection)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            var table_name=zuhe_key+'_xml_table';
                            var sql=`SELECT routes FROM ${table_name} WHERE ctime='${route_id}'`;
                            connection.query(sql,(err,data)=>{
                                connection.release();
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    if(data.length!=0){
                                        var all_routes=data[0].routes;
                                        all_routes=all_routes.split(',');
                                        resolve(all_routes);
                                    }else{
                                        reject('no');
                                    } 
                                }
                            });
                        }
                    });
                });
            }
            ret_route_data()
            .then(function(all_routes){
                var myPromise=[];
                for(var i=0; i<all_routes.length; i++){
                    let the_route_id=all_routes[i];
                    var p=getAllData(zuhe_key,the_route_id);
                    myPromise.push(p);
                }
                Promise.all(myPromise).then(function(result){
                    if(result[0].msg=='err'){
                        res.status(500).send('connect to database error').end();
                    }else{
                        sessionCheck.update_database_last_time(req);
                        //更新数据库合并路线的站点数
                        var all_stations=[];
                        for(var i=0; i<result.length; i++){
                            var stations = result[i].stations_data2;
                            for(var j=0; j<stations.length; j++){
                                let station_id = stations[j].station_id;
                                if(all_stations.indexOf(station_id)==-1){
                                    all_stations.push(station_id);
                                }
                            }
                        }
                        var stations_num = all_stations.length;
                        db.getConnection((err,connection)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                var table_name=zuhe_key+'_xml_table';
                                var sql=`UPDATE ${table_name} SET station_num=${stations_num} WHERE ctime='${route_id}'`;
                                connection.query(sql,(err,data)=>{
                                    connection.release();
                                    if(err){
                                        console.log(err);
                                        res.status(500).send('connect to database error').end();
                                    }else{
                                        res.send({msg:'ok',result,stations_num}).end();
                                    }
                                });
                            }
                        });
                    }
                });
            },function(msg){
                if(msg=='no'){
                    res.send({msg:'no'}).end();
                }
            });
        }else{
            res.send({msg:'err'}).end();
        }
    });

    //为路线增加(或者减少)多种语言
    server.post('/myroute/:action/language',(req,res)=>{
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
                    var sql3=`UPDATE ${table_name3} SET language_num=${language_num},languages=CONCAT(languages,',${language}')
                            ,mtime='${mtime}' WHERE ctime=${xml_id}`;
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
                var languages_arr = req.body['languages_arr']; //所有语言简称
                var sqlParamsEntity = [];
                var table_name1=zuhe_key+'_route_lang';
                var sql1=`DELETE FROM ${table_name1} WHERE route_id='${route_id}' AND lang='${language}'`;
                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));

                /* if(stations){
                    var table_name2=zuhe_key+'_station_lang';
                    var sql2="DELETE FROM "+table_name2+ " WHERE lang='"+language+"' AND station_id in (";
                    for(var i=0; i<stations.length; i++){
                        var station_id=stations[i];
                        sql2 += "'"+station_id+"'";
                        if(i==stations.length-1){
                            sql2 += ")";
                        }else{
                            sql2 += "," ;
                        }
                    }
                    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2)); 
                } */
                
                //更新语言的数目记录
                var table_name3=zuhe_key+'_xml_table';
                var mtime=new Date().getTime();
                //更新修改时间和语言数目
                var sql3=`UPDATE ${table_name3} SET language_num=${language_num},languages='${languages_arr}',
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
    });

    //语言改变，更改xml内容
    server.post('/myroute/xml_change_language',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var xml_id=req.body.xml_id;  //创建文件的时间戳
        var filename=req.body.filename; //文件名
        var Stop=req.body.Stop;  //站点数据
        var RouteInfo=req.body.RouteInfo; //路线数据
        var save_operation=req.body.save_operation; //是否是保存操作 ,string型
        var transition_change= req.body.transition_change;  //翻译改变的站点以及路线id，object
        //console.log(transition_change)
        if(ID && sz && username){
            var language_num=RouteInfo.NameTable.length; //语言数目
            //先更改数据库语言个数
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('database connect error').end();
                }else{
                    function del_origin_xml(){
                        return new Promise(function(resolve,reject){
                            var table_name=zuhe_key+'_xml_table';
                            var sql=`SELECT lastfilename FROM ${table_name} WHERE ctime='${xml_id}'`;
                            connection.query(sql,(err,data)=>{
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    if(data.length!=0){
                                        if(save_operation!= 'true'){ //如果是生成xml就先删除原先的
                                            //删除原先的xml
                                            var lastfilename=data[0].lastfilename;
                                            if(lastfilename){
                                                var filename = lastfilename + '.xml';
                                                var file_dir='./web/dist/myroute/profiles/'+zuhe_key+'/'+filename;
                                                fs.stat(file_dir,(err,sta)=>{
                                                    if(sta){
                                                        fs.unlinkSync(file_dir);
                                                        resolve();
                                                    }else{
                                                        resolve();
                                                    }
                                                });
                                            }else{
                                                resolve();
                                            }
                                        }else{
                                            resolve();
                                        }
                                    }else{
                                        reject('no');
                                    } 
                                }
                            });
                        });
                    };
                    del_origin_xml()
                    .then(function(){
                        if(save_operation== 'true'){
                            if(transition_change.stations_id){//有不相同的
                                //查看哪些路线使用了这些站点
                                var table_name1 = zuhe_key + "_routes_stations";
                                var sql = "SELECT route_id FROM "+ table_name1+" WHERE station_id IN("
                                for(var i=0; i<transition_change.stations_id.length; i++){
                                    let station_id = transition_change.stations_id[i];
                                    sql += "'"+ station_id+ "'";
                                    if(i!= transition_change.stations_id.length-1){
                                        sql += ",";
                                    }else{
                                        sql += ") GROUP BY route_id";
                                    }
                                }
                                return new Promise((resolve,reject)=>{  //节外生枝处理异步
                                    connection.query(sql,(err,data)=>{
                                        if(err){
                                            console.log(err);
                                            res.status(500).send('database connect error').end();
                                        }else{
                                            resolve({transfer:'ok',routes:data});
                                        }
                                    });
                                });
                            }else{
                                return {transfer:'no'};
                            }
                        }else{
                            return;
                        }
                    })
                    .then(function(data){  //查询合并路线
                        if(save_operation== 'true'){
                            if(data.transfer == 'ok' || transition_change.tran_change_route_id){
                                var table_name = zuhe_key + '_xml_table';
                                var sql = "SELECT ctime FROM "+table_name+" WHERE routes LIKE '%"+transition_change.route_id+"%'";
                                for(var i=0; i<data.length; i++){
                                    let route_id = data[i].route_id;
                                    if(i!= data[i].route_id.length-1){
                                        sql += " OR ";
                                    }
                                    sql += " OR routes LIKE '%"+ route_id+ "%'";
                                }
                                return new Promise((resolve,reject)=>{  //节外生枝处理异步
                                    connection.query(sql, (err,data1)=>{
                                        connection.release();
                                        if(err){
                                            console.log(err);
                                            res.status(500).send('database connect error').end();
                                        }else{
                                            var routes = [];  //存储route_id
                                            if(data.routes){
                                                for(var i=0; i<data.routes.length; i++){
                                                    let route_id= data.routes[i].route_id;
                                                    routes.push(route_id);
                                                }
                                            }
                                            for(var i=0; i<data1.length; i++){
                                                let route_id = data1[i].ctime;
                                                if(routes.indexOf(route_id)==-1){
                                                    routes.push(route_id);
                                                }
                                            }
                                            resolve({routes});
                                        }
                                    })
                                });
                            }else{ //都没改变
                                return {transfer:'no'};
                            }
                        }else{
                            return;
                        }
                    })
                    .then(function(data){
                        var sqlParamsEntity = [];
                        var table_name1=zuhe_key+'_xml_table';
                        var mtime=new Date().getTime();
                        var create_mtime = new Date(mtime);  //将时间戳转为时间对象
                        create_mtime = common_funs.forMatDate(create_mtime,false);
                        var lastfilename = "RouteEdit_"+filename+"_" + create_mtime;
                        var xml_addr='/myroute/profiles/'+zuhe_key+'/' +lastfilename;
                        //更新修改时间和语言数目
                        var sql1;
                        if(save_operation== 'true'){
                            sql1=`UPDATE ${table_name1} SET mtime='${mtime}' WHERE ctime=${xml_id}`;
                        }else{
                            sql1=`UPDATE ${table_name1} SET mtime='${mtime}',lastfilename='${lastfilename}'
                                ,xml_addr='${xml_addr}' WHERE ctime=${xml_id}`;
                        }
                        
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));

                        if(save_operation == 'true'){ //保存
                            //路线翻译更新
                            var table_name2=zuhe_key+'_route_lang';
                            var sql2="REPLACE INTO "+table_name2+"(ID,route_id,lang,transition) VALUES ";
                            var route_id=RouteInfo.ID; //路线id
                            for(var i=0; i<RouteInfo.NameTable.length; i++){
                                let route_lang_id=RouteInfo.NameTable[i].route_lang_id;  //ID序列号
                                let lang_code=RouteInfo.NameTable[i].LangCode;  //语言
                                let transition=RouteInfo.NameTable[i].Name;  //翻译
                                sql2 += "("+route_lang_id+","+route_id+",'"+lang_code+"','"+transition+"')";
                                if(i !=RouteInfo.NameTable.length-1){  //不是最后一个
                                    sql2 += ",";
                                }
                            }
                            sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));

                            //站点翻译更新
                            if(Stop){
                                var table_name3=zuhe_key+'_station_lang';
                                var sql3="REPLACE INTO "+table_name3+"(ID,station_id,lang,transition) VALUES ";
                                for(var i=0; i<Stop.StopInfo.length; i++){
                                    var station_id=Stop.StopInfo[i].ID; //路线id

                                    for(var j=0; j<Stop.StopInfo[i].NameTable.length; j++){
                                        let station_lang_id=Stop.StopInfo[i].NameTable[j].station_lang_id;  //ID序列号
                                        let lang_code=Stop.StopInfo[i].NameTable[j].LangCode;  //语言
                                        let transition=Stop.StopInfo[i].NameTable[j].Name;  //翻译
                                        sql3 += "("+station_lang_id+","+station_id+",'"+lang_code+"','"+transition+"')";
                                        if( (j ==Stop.StopInfo[i].NameTable.length-1) && (i==Stop.StopInfo.length-1)){  //不是最后一个
                                            ;
                                        }else{
                                            sql3 += ",";
                                        }
                                    }
                                }
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql3));
                            }

                            //更新所有翻译变更了的路线
                            if(data.routes){
                                var mtime = new Date().getTime().toString();
                                var table_name3 = zuhe_key+ '_xml_table';
                                var sql3= "UPDATE " + table_name3+" SET mtime="+mtime+ " WHERE ctime IN(";
                                for(var i=0; i<data.routes.length; i++){
                                    let route_id = data.routes[i];
                                    sql3 += "'"+ route_id+ "'";
                                    if(i!= data.routes.length-1){
                                        sql3 += ",";
                                    }else{
                                        sql3 += ")";
                                    }
                                }
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql3));
                            }
                        }

                        event_poll.execTrans(sqlParamsEntity, function(err, info){
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                if(save_operation == 'true'){ //保存
                                    let changed_routes = data.routes? data.routes: [];
                                    res.send({msg:'ok',changed_routes}).end();
                                }else{  //生成xml
                                    var file_dir='./web/dist/myroute/profiles/'+zuhe_key+'/';
                                    change_xml(req,res,xml_id,lastfilename,Stop,RouteInfo,file_dir,zuhe_key);
                                }
                            }
                        });
                    });
                }
            });
        }else{
            res.send({msg:'err'}).end();
        }
    });

    //通过xml_id请求这条数据库信息数据
    server.post('/myroute/get_xml_id',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名

        var xml_id=req.body.xml_id;
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error.').end();
                }else{
                    var table_name=sz+'_'+username+'_xml_table';
                    var sql=`SELECT * FROM ${table_name} WHERE 
                            ctime='${xml_id}'`;
                    connection.query(sql,(err,data)=>{
                        connection.release();
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error.').end();
                        }else{
                            if(data.length==0){
                                res.send({msg:'no'}).end();
                            }else{
                                var data=data[0];
                                sessionCheck.update_database_last_time(req);
                                res.send({msg:'ok',data}).end();
                            }
                        }
                    });
                }
            });
        }else{
            res.send({msg:'err'}).end();
        }
    });

    //通过路线id查找该路线下添加的语言
    server.post('/myroute/get_route_languages',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名

        var xml_id=req.body.xml_id;
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error.').end();
                }else{
                    var table_name=sz+'_'+username+'_route_lang';
                    var sql=`SELECT lang FROM ${table_name} WHERE 
                            route_id='${xml_id}'`;
                    connection.query(sql,(err,data)=>{
                        connection.release();
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error.').end();
                        }else{
                            if(data.length==0){
                                sessionCheck.update_database_last_time(req);
                                res.send({msg:'no'}).end();
                            }else{
                                sessionCheck.update_database_last_time(req);
                                res.send({msg:'ok',data}).end();
                            }
                        }
                    });
                }
            });
        }else{
            res.send({msg:'err'}).end();
        }
    });

    //合并路线
    server.post('/myroute/merge_routes',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var all_routes=req.body.all_routes;  //数组，合并的路线id
        var route_name=req.body.route_name;  //string 路线名
        var new_route_name=req.body.new_route_name;  //string 去掉标点后的路线名
        var languages_arr=req.body.languages_arr;  //数组，语言名
        if(ID && sz && username){
            //数据库增加一条路线
            var xml_id=new Date().getTime();
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name=zuhe_key+'_xml_table';
                    var sql=`SELECT filename from ${table_name} WHERE 
                            new_filename='${new_route_name}'`;
                    connection.query(sql,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            if(data.length>0){
                                connection.release();
                                res.send({msg:'has'}).end();
                            }else{
                                var routes_str="(";
                                for(var i=0; i<all_routes.length; i++){
                                    let route_id=all_routes[i];
                                    routes_str += "'"+route_id+"'";
                                    if(i!=all_routes.length-1){
                                        routes_str += ","
                                    }else{
                                        routes_str += ")";
                                    }
                                }
                                all_routes = all_routes.join(',');
                                //不重复的站点数目
                                var table_name1=zuhe_key+'_routes_stations';
                                sql = `SELECT count(*) as num FROM (SELECT station_id FROM ${table_name1} WHERE 
                                    route_id in ${routes_str} GROUP BY station_id) as t1`;
                                connection.query(sql,(err,data)=>{
                                    connection.release();
                                    if(err){
                                        console.log(err);
                                        res.status(500).send('connect to database error').end();
                                    }else{
                                        var station_num=data[0].num;
                                        //执行多条sql语句
                                        var sqlParamsEntity = [];
                                        var language_num=languages_arr.length;
                                        var languages_arr_str = languages_arr.join(','); //将数组转化为字符串
                                        //插入一条路线数据
                                        var sql1=`INSERT INTO ${table_name}(ctime,filename,new_filename,mtime,description,station_num,language_num,languages,routes)
                                            VALUES('${xml_id}','${route_name}','${new_route_name}','${xml_id}','',${station_num},${language_num},
                                            '${languages_arr_str}','${all_routes}')`;
                                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));

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
                        }
                    });
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //合并路线确定更改,更新数据库以及写xml文件
    server.post('/myroute/merge_routes_change_lang_xml',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;

        var xml_id=req.body.xml_id;  //合并路线的route_id
        var filename=req.body.filename;  //string 合并路线名
        var all_data=req.body.all_data;  //传递的所有数据
        var save_operation=req.body.save_operation; //是否是保存操作
        var transition_change= req.body.transition_change;  //翻译改变的站点以及路线id，object
        transition_change= transition_change? transition_change: {routes_id: '',stations_id: ''};
        if(ID && sz && username){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('database connect error').end();
                }else{
                    function ret_route_data(){
                        return new Promise(function(resolve,reject){
                            var table_name=zuhe_key+'_xml_table';
                            var sql=`SELECT lastfilename FROM ${table_name} WHERE ctime='${xml_id}'`;
                            connection.query(sql,(err,data)=>{
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    if(data.length!=0){
                                        if(save_operation!= 'true'){
                                            //删除原先的xml
                                            var lastfilename=data[0].lastfilename;
                                            if(lastfilename){
                                                var filename = lastfilename + '.xml';
                                                var file_dir='./web/dist/myroute/profiles/'+zuhe_key+'/'+filename;
                                                fs.stat(file_dir,(err,sta)=>{
                                                    if(sta){
                                                        fs.unlinkSync(file_dir);
                                                        resolve();
                                                    }else{
                                                        resolve();
                                                    }
                                                });
                                            }else{
                                                resolve();
                                            }
                                        }else{
                                            resolve();
                                        }
                                    }else{
                                        reject('no');
                                    } 
                                }
                            });
                        });
                    }
                    ret_route_data()
                    .then(function(){
                        if(save_operation== 'true'){
                            if(transition_change.stations_id && transition_change.stations_id.length>0){//有不相同的
                                //查看哪些路线使用了这些站点
                                var table_name1 = zuhe_key + "_routes_stations";
                                var sql = "SELECT route_id FROM "+ table_name1+" WHERE station_id IN("
                                for(var i=0; i<transition_change.stations_id.length; i++){
                                    let station_id = transition_change.stations_id[i];
                                    sql += "'"+ station_id+ "'";
                                    if(i!= transition_change.stations_id.length-1){
                                        sql += ",";
                                    }else{
                                        sql += ") GROUP BY route_id";
                                    }
                                }
                                return new Promise((resolve,reject)=>{  //节外生枝处理异步
                                    connection.query(sql,(err,data)=>{
                                        if(err){
                                            console.log(err);
                                            res.status(500).send('database connect error').end();
                                        }else{
                                            resolve({transfer:'ok',routes:data});
                                        }
                                    });
                                });
                            }else{
                                return {transfer:'no'};
                            }
                        }else{
                            return ;
                        }
                    })
                    .then(function(data){  //查询合并路线
                        if(save_operation== 'true'){
                            if(data.transfer=='no' && (!transition_change.routes_id)){ //都没改变
                                return {transfer:'no'};
                            }else{
                                var table_name = zuhe_key + '_xml_table';
                                var sql = "SELECT ctime FROM "+table_name+ " WHERE ";
                                if(transition_change.routes_id){
                                    for(var i=0; i<transition_change.routes_id.length; i++){ //添加路线中的
                                        let route_id = transition_change.routes_id[i];
                                        if(i!=0 && i!=transition_change.routes_id.length-1){
                                            sql += " OR ";
                                        }
                                        sql += "routes LIKE '%"+ route_id+ "%'";
                                    }
                                }
                                if(data.routes){
                                    for(var i=0; i<data.routes.length; i++){ //添加翻译对应的
                                        let route_id = data.routes[i].route_id;
                                        if(transition_change.routes_id){
                                            if(i!=data.routes[i].length-1){
                                                sql += " OR ";
                                            }
                                        }else{
                                            if(i!=0 && i!=data.routes[i].length-1){
                                                sql += " OR ";
                                            }
                                        }
                                        sql += " routes LIKE '%"+ route_id+ "%'";
                                    }
                                }
                                return new Promise((resolve,reject)=>{  //节外生枝处理异步
                                    connection.query(sql, (err,data1)=>{
                                        connection.release();
                                        if(err){
                                            console.log(err);
                                            res.status(500).send('database connect error').end();
                                        }else{
                                            var routes = [];  //存储route_id
                                            if(data.routes){
                                                for(var i=0; i<data.routes.length; i++){
                                                    let route_id= data.routes[i].route_id;
                                                    routes.push(route_id);
                                                }
                                            }
                                            for(var i=0; i<data1.length; i++){
                                                let route_id = data1[i].ctime;
                                                if(routes.indexOf(route_id)==-1){
                                                    routes.push(route_id);
                                                }
                                            }
                                            resolve({routes});
                                        }
                                    });
                                });
                            }
                        }else{
                            return;
                        }
                    })
                    .then(function(data){
                        var sqlParamsEntity = [];
                        var table_name1=zuhe_key+'_xml_table';
                        var mtime=new Date().getTime();
                        var create_mtime = new Date(mtime);  //将时间戳转为时间对象
                        create_mtime = common_funs.forMatDate(create_mtime,false);
                        var lastfilename = "RouteEdit_"+filename+"_" + create_mtime;
                        var xml_addr='/myroute/profiles/'+zuhe_key+'/' +lastfilename;
                        //更新修改时间和语言数目
                        var sql1;
                        if(save_operation == 'true'){
                            sql1=`UPDATE ${table_name1} SET mtime='${mtime}' WHERE ctime=${xml_id}`;
                        }else{
                            sql1=`UPDATE ${table_name1} SET mtime='${mtime}',
                                lastfilename='${lastfilename}',xml_addr='${xml_addr}' WHERE ctime=${xml_id}`;
                        }
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
        
                        if(save_operation== 'true'){  //保存
                            for(var z=0; z<all_data.length; z++){
                                var RouteInfo=all_data[z].RouteInfo;
                                var Stop=all_data[z].Stop;
                                //路线翻译更新
                                var table_name2=zuhe_key+'_route_lang';
                                var sql2="REPLACE INTO "+table_name2+"(ID,route_id,lang,transition) VALUES ";
                                var route_id=RouteInfo.ID; //路线id
                                for(var i=0; i<RouteInfo.NameTable.length; i++){
                                    let route_lang_id=RouteInfo.NameTable[i].route_lang_id;  //ID序列号
                                    let lang_code=RouteInfo.NameTable[i].LangCode;  //语言
                                    let transition=RouteInfo.NameTable[i].Name;  //翻译
                                    sql2 += "("+route_lang_id+","+route_id+",'"+lang_code+"','"+transition+"')";
                                    if(i !=RouteInfo.NameTable.length-1){  //不是最后一个
                                        sql2 += ",";
                                    }
                                }
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));
                                //站点翻译更新
                                if(Stop){
                                    var table_name3=zuhe_key+'_station_lang';
                                    var sql3="REPLACE INTO "+table_name3+"(ID,station_id,lang,transition) VALUES ";
                                    for(var i=0; i<Stop.StopInfo.length; i++){
                                        var station_id=Stop.StopInfo[i].ID; //路线id
            
                                        for(var j=0; j<Stop.StopInfo[i].NameTable.length; j++){
                                            let station_lang_id=Stop.StopInfo[i].NameTable[j].station_lang_id;  //ID序列号
                                            let lang_code=Stop.StopInfo[i].NameTable[j].LangCode;  //语言
                                            let transition=Stop.StopInfo[i].NameTable[j].Name;  //翻译
                                            sql3 += "("+station_lang_id+","+station_id+",'"+lang_code+"','"+transition+"')";
                                            if( (j ==Stop.StopInfo[i].NameTable.length-1) && (i==Stop.StopInfo.length-1)){  //不是最后一个
                                                ;
                                            }else{
                                                sql3 += ",";
                                            }
                                        }
                                    }
                                    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql3));
                                }

                                //更新所有翻译变更了的路线
                                if(data.routes){
                                    var mtime = new Date().getTime().toString();
                                    var table_name4 = zuhe_key+ '_xml_table';
                                    var sql4= "UPDATE " + table_name4+" SET mtime="+mtime+ " WHERE ctime IN(";
                                    for(var i=0; i<data.routes.length; i++){
                                        let route_id = data.routes[i];
                                        sql4 += "'"+ route_id+ "'";
                                        if(i!= data.routes.length-1){
                                            sql4 += ",";
                                        }else{
                                            sql4 += ")";
                                        }
                                    }
                                    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql4));
                                }
                            }
                        }
        
                        event_poll.execTrans(sqlParamsEntity, function(err, info){
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else{
                                if(save_operation== 'true'){
                                    let changed_routes = data.routes? data.routes: [];
                                    console.log(changed_routes)
                                    res.send({msg:'ok',changed_routes}).end();
                                }else{
                                    var file_dir='./web/dist/myroute/profiles/'+zuhe_key+'/'+lastfilename+'.xml';
                                    var web_addr='/myroute/profiles/'+zuhe_key+'/'+lastfilename+'.xml';  //返回给前端的地址
                                    change_route(req,res,file_dir,all_data,web_addr);
                                }
                                
                            }
                        });
                    },function(msg){
                        if(msg=='no'){
                            res.send({msg:'no'}).end();
                        }
                    }); 

                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //clone路线
    server.post('/myroute/clone_route',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;
        if(ID && sz && username){
            var route_id=req.body.route_id;  //路线的id
            var description=req.body.description;  //路线的描述
            var filename=req.body.filename;  //string 路线名
            var remove_sysm_filename=req.body.remove_sysm_filename;  //路线名的简化
            function select_data(){
                return new Promise(function(resolve,reject){
                    db.getConnection((err,connection)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            var table_name=zuhe_key+'_xml_table';  //表名
                            //先查询有无该路线名
                            var sql=`SELECT filename from ${table_name} WHERE 
                                    new_filename='${remove_sysm_filename}'`;
                            connection.query(sql,(err,data)=>{
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    if(data.length>0){
                                        res.send({msg:'has',filename:data[0].filename}).end();
                                    }else{
                                        sql = `SELECT languages from ${table_name} WHERE ctime='${route_id}'`;
                                        connection.query(sql, (err,data)=>{
                                            if(err){
                                                console.log(err);
                                                res.status(500).send('connect to database error').end();
                                            }else{
                                                var xml_languages = data[0].languages; 
                                                //先查所添加的语言数量
                                                table_name=zuhe_key+'_route_lang';
                                                sql = `SELECT lang from ${table_name}
                                                    WHERE route_id='${route_id}'`;
                                                connection.query(sql,(err,data)=>{
                                                    if(err){
                                                        console.log(err);
                                                        res.status(500).send('connect to database error').end();
                                                    }else{
                                                        var langArrs = data;  //语言数组
                                                        //再查所添加的站点数
                                                        table_name=zuhe_key+'_routes_stations';
                                                        sql = `SELECT station_id,inde from ${table_name}
                                                            WHERE route_id='${route_id}'`;
                                                        connection.query(sql,(err,data)=>{
                                                            connection.release();
                                                            if(err){
                                                                console.log(err);
                                                                res.status(500).send('connect to database error').end();
                                                            }else{
                                                                var stationsArrs = data; //路线下的站点数组
                                                                resolve({langArrs,stationsArrs,xml_languages});
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                });
            };
            select_data()
            .then(function(getData){
                var langArrs = getData.langArrs;  //语言数组
                var stationsArrs = getData.stationsArrs; //路线下的站点数组
                var xml_languages = getData.xml_languages;  //clone languages栏目
                //执行多条sql语句
                var sqlParamsEntity = [];
                var ctime=new Date().getTime().toString();  //路线的id
                var mtime=ctime;
                var new_route_id = Number(ctime);  //新路线的id
                var stations_num = stationsArrs.length;  //站点数量
                var language_num = langArrs.length;  //语言数量
                //路线表中插入路线名
                var table_name=zuhe_key+'_xml_table';  //表名
                var sql1=`INSERT INTO ${table_name} (filename,ctime,new_filename,mtime,description,station_num,language_num,languages,routes)
                        VALUES('${filename}','${ctime}','${remove_sysm_filename}','${mtime}','${description}',${stations_num},
                        ${language_num},'${xml_languages}','${ctime}')`;
                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
                //路线语言中插入英语翻译
                var table_name2=zuhe_key+'_route_lang';
                var sql2="INSERT INTO "+table_name2+ " (ID,route_id,lang,transition) VALUES";
                for(var i=0; i<langArrs.length; i++){
                    let ID = new_route_id + i;
                    let lang = langArrs[i].lang;
                    let transition = "";
                    if(lang == 'en.US'){
                        transition = filename;
                    }
                    sql2 += "('"+ID + "','"+new_route_id+"','"+lang+"','"+transition+"')";
                    if(i !=langArrs.length-1){
                        sql2 += ",";
                    }
                }
                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));
                //插入多条路线对应站点
                var table_name3 = zuhe_key+'_routes_stations';
                var sql3 = "INSERT INTO " +table_name3+ " (ctime,route_id,station_id,inde) VALUES";
                for(var i=0; i<stationsArrs.length; i++){
                    let ctime = new_route_id + i;
                    let station_id = stationsArrs[i].station_id;
                    let inde = stationsArrs[i].inde;
                    sql3 += "('"+ctime + "','"+new_route_id+"','"+station_id+"',"+inde +")";
                    if(i !=stationsArrs.length-1){
                        sql3 += ",";
                    }
                }
                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql3));
                event_poll.execTrans(sqlParamsEntity, (err, info)=>{
                    if(err){
                        //console.log('事务处理失败');
                        res.status(500).send('connect to database error').end();
                    }else{
                        sessionCheck.update_database_last_time(req);
                        res.send({msg:'ok'}).end();
                    }
                });
            
            });    
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //查询单条路线被哪些合并路线所使用
    server.post('/myroute/route_been_used',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;
        if(ID && sz && username){
            var xml_id=req.body.xml_id; //路线的id
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name=zuhe_key+"_xml_table";
                    var sql = `SELECT filename FROM ${table_name} WHERE 
                            routes LIKE '%,%' AND routes LIKE '%${xml_id}%'`;
                    connection.query(sql,(err, data)=>{
                        connection.release();
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            res.send({mag:'ok',routes:data}).end();
                        }
                    });
                }
            });
        }else{  
            res.send({msg:'err'}).end();
        }
    });

    //查看单一路线信息请求
    server.post('/myroute/get_routeInfo', (req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        var zuhe_key=sz+'_'+username;
        var xml_id=req.body.xml_id;  //创建文件的时间戳
        if(ID && sz && username && xml_id){
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    //先查路线翻译表
                    var table_name1=zuhe_key+'_route_lang';
                    var sql1=`SELECT ID,lang,transition FROM ${table_name1}
                        WHERE route_id=${xml_id}`;
                    connection.query(sql1,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            var route_data=data;  //路线翻译数据

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
                                                        res.send({msg:'ok',route_data,stations_data1,stations_data2}).end();
                                                    }
                                                });
                                            }
                                        });
                                    }else{
                                        //console.log('没有站点')
                                        var stations_data1=[];  //该路线下的站点的翻译
                                        var stations_data2=[];  //该路线下的站点的经纬度
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

}

//语言改变,改变xml
function change_xml(req,res,xml_id,filename,Stop,RouteInfo,file_dir,zuhe_key){
    var company_id = Number(req.session['user_id']) *1000000000; //公司id
    var route_data={
        RouteEdit:{
            Stop:{
                StopInfo:[]
            },
            Route:{
                RouteInfo:{
                    '$' : {
                        Number : RouteInfo.Number,
                        ID : Number(RouteInfo.ID.toString().split('').splice(1,9).join(''))-500000000,
                        Common : "",
                        BusLeaveArea : "0",
                        BusStopArea : "0", 
                        RoundTrip : "true"
                    },
                    NameTable:[],
                    StopAttr:[]
                }
            }
        }
    }
    if(!Stop){  //如果没有添加站点
        Stop={
            StopInfo : []
        };
        RouteInfo.StopAttr=[];
    }
    //添加站点数据
    for(let i=0; i<Stop.StopInfo.length; i++){
        let stop_info={
            "$" : {
                Type : "0", 
                ID : Number(Stop.StopInfo[i].ID) -company_id,
                Common : "",
                Lat : Stop.StopInfo[i].Lat,
                Lon : Stop.StopInfo[i].Lon,
                
            },
            NameTable : []
        }
        for(let j =0; j<Stop.StopInfo[i].NameTable.length; j++){
            let name_table={
                '$' : {
                    LangCode : Stop.StopInfo[i].NameTable[j].LangCode, 
                    Name : Stop.StopInfo[i].NameTable[j].Name,
                    Voice : ""
                }
            }
            stop_info.NameTable.push(name_table);
        }
        route_data.RouteEdit.Stop.StopInfo.push(stop_info);
    }
    //添加路线数据
    for(let i=0; i<RouteInfo.NameTable.length; i++){
        let name_table={
            '$' : {
                LangCode : RouteInfo.NameTable[i].LangCode,
                Name : RouteInfo.NameTable[i].Name,
                Voice : ""
            }
        }
        route_data.RouteEdit.Route.RouteInfo.NameTable.push(name_table);
    }
    for(let i=0; i<RouteInfo.StopAttr.length; i++){
        let stop_attr={
            '$' : {
                Stop_ID :Number(RouteInfo.StopAttr[i]) -company_id,
                Type : "0"
            }
        }
        route_data.RouteEdit.Route.RouteInfo.StopAttr.push(stop_attr);
    }
    var xml=builder.buildObject(route_data);
    var file=file_dir+filename+'.xml';
    fs.writeFileSync(file,xml,'utf-8');
    var addr='/myroute/profiles/'+zuhe_key+'/' +filename+'.xml';
    sessionCheck.update_database_last_time(req);
    res.send({msg:'ok',addr});
}

//重写合并后的路线的xml
function change_route(req,res,file_dir,all_data,web_addr){
    var company_id = Number(req.session['user_id']) *1000000000; //公司id
    var route_data={
        RouteEdit:{
            Stop:{
                StopInfo:[]
            },
            Route:{
                RouteInfo:[]
            }
        }
    }
    var language_arr=[]; //集合所有路线语言，最多但不重复
    var added_language_ar=[];  //已添加的语言
    var new_time = Number(new Date().getTime().toString().split('').splice(0,9).join(''));
    //添加路线的语言列表
    for(var z=0; z<all_data.length; z++){
        var route_id=all_data[z].RouteInfo.ID;
        var route_name=all_data[z].RouteInfo.Number;
        var route_name_table=all_data[z].RouteInfo.NameTable;
        var route_stop_arr=all_data[z].RouteInfo.StopAttr;

        new_time +=  parseInt(Math.random()*100);
        var route_info_tmp={
            '$' : {
                Number : route_name,
                ID : new_time,
                Common : "",
                BusLeaveArea : "0",
                BusStopArea : "0", 
                RoundTrip : "true"
            },
            NameTable:[],
            StopAttr:[]
        }
        //添加该条路线的语言
        for(let i=0; i<route_name_table.length; i++){
            let language=route_name_table[i].LangCode;
            let name=route_name_table[i].Name;
            let name_table_tmp={
                "$" : {
                    LangCode : language,
                    Name : name,
                    Voice : "",

                }
            };
            route_info_tmp.NameTable.push(name_table_tmp);
            if(language_arr.indexOf(language)==-1){
                language_arr.push(language);
            }
        }
        //为该条路线添加停靠站点
        for(var i=0; i<route_stop_arr.length; i++){
            let station_id=route_stop_arr[i];
            let station_tmp = {
                "$" : {
                    Stop_ID : Number(station_id) - company_id,
                    Type : ""
                }
            }
            route_info_tmp.StopAttr.push(station_tmp);
        }
        route_data.RouteEdit.Route.RouteInfo.push(route_info_tmp);

    }

    //添加StopInfo站点数据信息
    for(var z=0; z<all_data.length; z++){
        //添加StopInfo站点数据信息
        var station_stop_info=all_data[z].Stop.StopInfo;
        for(var i=0; i<station_stop_info.length; i++){
            let ID=station_stop_info[i].ID;
            ID = Number(ID) - company_id;
            let Lat=station_stop_info[i].Lat;
            let Lon=station_stop_info[i].Lon;
            let station_name_table=station_stop_info[i].NameTable;
            var stop_info={
                "$" : {
                    Type : "0",
                    ID : ID,
                    Common : "",
                    Lat : Lat,
                    Lon : Lon
                },  
                NameTable:[]
            }
            //循环语言
            for(var j=0; j<language_arr.length; j++){
                let language=language_arr[j];  //语言
                var name_table_tmp={
                    '$' : {
                        LangCode : language,
                        Name : "",
                        Voice : ""
                    }
                }
                //循环站点
                for(var k=0; k<station_name_table.length; k++){
                    let Name=station_name_table[k].Name;  //站点名称
                    let LangCode=station_name_table[k].LangCode; //语言
                    if(language==LangCode){
                        name_table_tmp['$'].Name=Name;
                        break;
                    }
                }
                added_language_ar.push(ID);
                stop_info.NameTable.push(name_table_tmp);
                
                if(added_language_ar.indexOf(ID)===-1){  //没有添加过
                    added_language_ar.push(ID);
                    stop_info.NameTable.push(name_table_tmp);
                }else{  //添加过了
                    if(!!name_table_tmp['$'].Name){  //有值则取代
                        //循环该站点的该语言
                        let tmp_route_data=route_data.RouteEdit.Stop.StopInfo;
                        for(var k=0; k<tmp_route_data.length; k++){
                            let stationID=tmp_route_data[k]['$'].ID;
                            if(stationID===ID){
                                for(var m=0; m<tmp_route_data[k].NameTable.length; m++){
                                    let _language=tmp_route_data[k].NameTable[m]['$'].LangCode;
                                    if(language===_language){
                                        tmp_route_data[k].NameTable[m]['$'].Name=name_table_tmp['$'].Name;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            route_data.RouteEdit.Stop.StopInfo.push(stop_info);
        }
    }

    //去掉重复已添加的已添加的站点翻译
    var tmp_StopInfo_norepeat=[];  //存放不重复的站点数组
    var tmp_stop_info=route_data.RouteEdit.Stop.StopInfo;
    for(var i=0; i<tmp_stop_info.length; i++){
        var val=tmp_stop_info[i];
        var ID=tmp_stop_info[i]['$'].ID;
        var IShas=false;  //是否已经有了
        for(var j=0; j<tmp_StopInfo_norepeat.length; j++){
            var stationID=tmp_StopInfo_norepeat[j]['$'].ID;
            if(stationID===ID){
                IShas = true;
                break;
            }
        }
        if(!IShas){  //没有则添加
            tmp_StopInfo_norepeat.push(tmp_stop_info[i]);
        }
    }
    route_data.RouteEdit.Stop.StopInfo=tmp_StopInfo_norepeat;

    var xml=builder.buildObject(route_data);
    fs.writeFileSync(file_dir,xml,'utf-8');
    sessionCheck.update_database_last_time(req);
    res.send({msg:'ok',web_addr});
}

module.exports={
    xmlManager
}