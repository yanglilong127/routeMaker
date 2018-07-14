//对公司历史操作记录查询的脚本
const fs=require('fs');
//数据库连接
const db=require('./databaseConnection').pool;
const common_funs=require('../funcs/common');  //一些公共函数
const md5=require('../funcs/md5').md5;
//进行md5密码验证
const result=require('../configs/key_config').md5_data;
const passKey=result.passKey;
const suijiString=result.salt;

var historyOperation=function(server){
    //获取数据
    server.post('/myroute/get_operation_history_data',(req,res)=>{
        var ID=req.session['user_id'];
        var sz=req.session['user_sz'];
        var username=req.session['user_name']; //用户名
        
        if(ID && sz && username){
            var page = req.body.page; //第几页数据
            var nums_limit = req.body.nums_limit; //获取几条数据
            var start_time = req.body.start_time; //起始日期
            var end_time = req.body.end_time; //终止日期
            var operation_order = req.body.operation_order; //操作指令
            var operation_user = req.body.username; //操作用户
            var route_name = req.body.route_name; //路线名

            if(page < 1){
                page = 1;
            }
            var start= (page-1)* nums_limit;  //起始位置
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var table_name = "operation_history";
                    var sql_part="SELECT * FROM "+table_name, 
                        sql_part1="SELECT COUNT(*) as count FROM "+table_name;

                    var tmp_str = " WHERE TO_DAYS(oper_time)>=TO_DAYS('"+start_time+"') "
                                    +"AND TO_DAYS(oper_time)<=TO_DAYS('"+end_time+"')";
                    sql_part += tmp_str;
                    sql_part1 += tmp_str;

                    if(Number(operation_order)!=0){ //不是选的全部
                        operation_val = common_funs.operation_command[operation_order.toString()];
                        let tmp_str = " AND operation='"+ operation_val+ "' ";
                        sql_part += tmp_str;
                        sql_part1 += tmp_str;
                    }
                    if(operation_user){
                        let tmp_str = " AND username LIKE '%"+ operation_user+ "%' ";
                        sql_part += tmp_str;
                        sql_part1 += tmp_str;
                    }
                    if(route_name){
                        let tmp_str = " AND route_name LIKE '%"+ route_name+ "%' ";
                        sql_part += tmp_str;
                        sql_part1 += tmp_str;
                    }
                    sql_part += " ORDER BY oper_time desc LIMIT "+start+","+nums_limit;
                    connection.query(sql_part1,(err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            var count = data[0].count;
                            connection.query(sql_part,(err,data)=>{
                                connection.release();
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    res.send({msg:'ok',data:data,count}).end();
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

    //登录验证
    server.post('/myroute/history_oper_to_login_check',(req,res)=>{
        var username=req.body.username;  //用户名
        var sz=req.body.sz;  //服务区
        var uid=req.body.uid;  //用户名ID
        var salt=req.body.salt;
        var utc=req.body.utc; 
        var unlock=req.body.unlock;  //密码锁
        var myLock=md5(passKey+sz+uid+username+suijiString+utc+salt).toUpperCase();
        if(unlock != myLock){  //验证不通过
            res.send({msg:'noRight'}).end();
        }else{   //验证通过
            db.getConnection((err,connection)=>{
                if(err){
                    console.log(err);
                    res.status(500).send('connect to database error').end();
                }else{
                    var sql=`SELECT * FROM user_table WHERE
                        sz='${sz}' and username='${username}'`;
                    connection.query(sql,(err,data)=>{
                        connection.release();
                        if(err){
                            console.log(err);
                            res.status(500).send('connect to database error').end();
                        }else{
                            if(data.length==0){  //没有此用户，需要创建
                                res.send({msg:'no'}).end();
                            }else{  //用户存在
                                req.session['user_id']=uid; //设置sessionID
                                req.session['user_sz']=sz;
                                req.session['user_name']=username;
                                res.send({msg:'ok'}).end();                                
                            }
                        }
                    });
                }
            })
        }
    });
};

module.exports= {
    historyOperation
}

