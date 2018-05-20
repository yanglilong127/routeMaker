//验证登录请求等

const fs=require('fs');
//数据库连接
const db=require('./databaseConnection').pool;
const event_poll=require('./dbHelper');  //事务回滚
//session检查
const sessionCheck=require('./check_session.js');
var delDir=require('../funcs/common');

var some_req_event=function(server){
    //是否登录过验证
    server.post('/myroute/auth_check_login',(req,res)=>{
        sessionCheck.check_session(req,res,auth_check_login);
        function auth_check_login(msg){
            if(msg == 'no' ){ //没有session
                res.send({msg:'no'}).end()
            }else if(msg == 'ok'){
                var ID=req.session['user_id'];
                var sz=req.session['user_sz'];
                var username=req.session['user_name'];
                var zuhe_key=sz+'_'+username;   //组合主键
                db.getConnection((err,connection)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error').end();
                    }else{
                        var sql=`SELECT * from user_table where 
                                id=${ID} and sz='${sz}' and username='${username}'`; 
                        connection.query(sql,(err,data)=>{
                            connection.release();
                            if(err){
                                console.log(err);
                                res.status(500).send('connect to database error').end();
                            }else if(data.length ==0){
                                res.send({msg:'no'}).end();
                            }else{
                                res.send({userDir:zuhe_key}); //返回用户名  
                            }                 
                        });     
                    }
                });
            }
        }
    });

    //没有session登录验证
    server.post('/myroute/to_login_check',(req,res)=>{
        var username=req.body.username;  //用户名
        var sz=req.body.sz;  //服务区
        var uid=req.body.uid;  //用户名ID
        var salt=req.body.salt;
        var utc=req.body.utc; 
        var unlock=req.body.unlock;  //密码锁

        //进行md5密码验证
        const result=require('../configs/key_config').md5_data;
        var passKey=result.passKey;
        var suijiString=result.salt;

        const md5=require('../funcs/md5').md5;
        var myLock=md5(passKey+sz+uid+username+suijiString+utc+salt).toUpperCase();
        if(unlock != myLock){  //验证不通过
            res.send({msg:'noRight'}).end();
        }else{   //验证通过
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var zuhe_key=sz+'_'+username;
                    var table_name1=zuhe_key+'_xml_table';
                    //判断是否创建过了该表
                    var sql=`SELECT COUNT(1) as num FROM information_schema.TABLES WHERE 
                        table_schema='routemaker' AND table_name='${table_name1}'`;
                    connection.query(sql,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            if(data[0].num == 0){  //没有该表，需要创建
                                connection.release();
                                //执行多条sql语句
                                var sqlParamsEntity = [];
                                //插入一条用户数据
                                /* sql=`INSERT INTO user_table (sz,username) values
                                    (${uid},'${sz}','${username}')`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql)); */
                                //为用户创建一个xml路线表
                                
                                var sql1=`CREATE TABLE ${table_name1}(
                                        ctime char(13) primary key,
                                        filename varchar(128) not null,
                                        new_filename varchar(128) not null comment '去掉标点符号后的文件名',
                                        mtime char(13) not null,
                                        description text,station_num int not null default 0,
                                        language_num int not null default 1,
                                        routes longtext comment '多条路线合并,值为路线的id,以逗号分隔',
                                        lastfilename varchar(180) comment '最后的xml文件名'
                                    ) default charset = utf8`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));
                                //为用户创建一个公司站点表
                                var table_name2=zuhe_key+'_stations';
                                var sql2=`CREATE TABLE ${table_name2}(
                                        ctime char(13) not null,
                                        station_id varchar(20) primary key,
                                        stations_name text,
                                        addr_content text,
                                        lng varchar(11) comment '经度',
                                        lat varchar(11) comment '纬度'
                                    ) default charset = utf8`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql2));

                                //为用户创建路线与站点对应表  多对多
                                var table_name3=zuhe_key+'_routes_stations';
                                var sql3=`CREATE TABLE ${table_name3}(
                                        ctime char(13) primary key,
                                        route_id char(13) not null comment '路线id',
                                        station_id varchar(20) not null comment '站点id',
                                        inde int(11) default 0 comment '用于站点排序',
                                        foreign key(route_id) references ${table_name1}(ctime)
                                                ON DELETE CASCADE ON UPDATE CASCADE,
                                        foreign key(station_id) references ${table_name2}(station_id)
                                                ON DELETE CASCADE ON UPDATE CASCADE
                                    ) default charset = utf8`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql3));

                                //路线的翻译
                                var table_name4=zuhe_key+'_route_lang';
                                var sql4=`CREATE TABLE ${table_name4}(
                                        ID char(13) primary key,
                                        route_id char(13) not null,
                                        lang char(5) not null,
                                        transition varchar(128),
                                        foreign key(route_id) references ${table_name1}(ctime)
                                                ON DELETE CASCADE ON UPDATE CASCADE
                                    ) default charset = utf8`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql4));

                                //站点的翻译
                                var table_name5=zuhe_key+'_station_lang';
                                var sql5=`CREATE TABLE ${table_name5}(
                                        ID char(13) primary key,
                                        station_id char(13) not null,
                                        lang char(5) not null,
                                        transition varchar(128),
                                        foreign key(station_id) references ${table_name2}(station_id)
                                                ON DELETE CASCADE ON UPDATE CASCADE
                                    ) default charset = utf8`;
                                sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql5));
                                //执行多sql语句
                                event_poll.execTrans(sqlParamsEntity, (err, info)=>{
                                    if(err){
                                        //console.log('事务处理失败');
                                        res.status(500).send('connect to database error').end();
                                    }else{
                                        //console.log('事务处理成功');
                                        //为用户创建一个文件夹
                                        fs.mkdirSync('./web/dist/myroute/profiles/'+zuhe_key);
                                        req.session['user_id']=uid; //设置sessionID
                                        req.session['user_sz']=sz;
                                        req.session['user_name']=username;
                                        res.send({msg:'ok'}).end();
                                    }
                                });
                            }else{  //该表已经创建
                                connection.release();
                                req.session['user_id']=uid; //设置sessionID
                                req.session['user_sz']=sz;
                                req.session['user_name']=username;
                                res.send({msg:'ok'});
                            }
                        }
                    });
                }
            });
        }
    });

    //删除用户
    server.post('/myroute/delete_user',(req,res)=>{
        var ID=req.body.uid;
        var sz=req.body.sz;
        var username=req.body.username; //用户名

        db.getConnection((err,connection)=>{
            if(err){
                console.log(err),
                res.status(500).send('connect to database error').end();
            }else{
                var sql=`SELECT * FROM user_table WHERE ID=${ID} and sz='${sz}'
                         and username='${username}'`;
                connection.query(sql,(err,data)=>{
                    if(err){
                        console.log(err),
                        res.status(500).send('connect to database error').end();
                    }else if(data.length>0){
                        //执行多条sql语句
                        var sqlParamsEntity = [];

                        //删除用户表中的记录
                        var sql1=`DELETE FROM user_table WHERE 
                            username='${username}' and sz='${sz}' and ID=${ID}`;
                        sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql1));

                        //还要删除 同时删除多张表
                        var zuhe_key=sz+'_'+username;
                        var table_name1=zuhe_key+'_xml_table';  //路线表
                        var table_name2=zuhe_key+'_stations';  //站点表
                        var table_name3=zuhe_key+'_routes_stations';  //路线站点对应表
                        var table_name4=zuhe_key+'_station_lang';  //站点翻译表
                        var table_name5=zuhe_key+'_route_lang';  //路线翻译表
                        
                        sql=`DROP table ${table_name3},${table_name4}
                            ,${table_name5},${table_name1},${table_name2}`;

                        event_poll.execTrans(sqlParamsEntity, function(err, info){
                            if(err){
                                console.log('事务处理失败');
                                res.status(500).send('connect to database error').end();
                            }else{
                                console.log('事务处理成功');
                                if(req.session['user_id']){
                                    delete req.session['user_id'];
                                    delete req.session['user_sz'];
                                    delete req.session['user_name'];
                                }
                                //递归删除文件夹
                                var dirname='./web/dist/myroute/profiles/'+zuhe_key;
                                delDir.del(dirname);
                                res.send({msg:'ok'});
                            }
                        });
                    }else if(data.length==0){
                        res.send({msg:'ok'});
                    }
                });
            }
        });

    });

    //用户退出登录
    server.post('/myroute/user_login_out',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名

        delete req.session['user_id'];
        delete req.session['user_sz'];
        delete req.session['user_name'];
        res.send({msg:'ok'}).end();
    });

}

module.exports={
    some_req_event
}