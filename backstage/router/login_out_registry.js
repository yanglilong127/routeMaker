//处理登录注册

//数据库连接
const db=require('./databaseConnection').pool;
const my_md5= require('../funcs/md5');
const result=require('../configs/key_config').md5_data;
var passKey=result.passKey;
var suijiString=result.salt;
var sz='TPDQATEST';  //服务区

var login_registry=function(server){

    //登录
    server.post('/myroute/login',(req,res)=>{
        var username= req.body.username; //用户名
        var password= req.body.password;  //密码
        
        password = my_md5.md5(my_md5.MD5_SUFFIX+password).toUpperCase();

        db.getConnection((err,connection)=>{
            if(err){
                console.log(err);
                res.status(500).send('connect to database error').end();
            }else{
                var sql= `SELECT * FROM user_table WHERE username='${username}'`;
                connection.query(sql,(err,data)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error').end();
                    }else{
                        if(data.length==0){
                            connection.release();
                            res.send({msg:'no'}).end();
                        }else if(password !=data[0].password){
                            connection.release();
                            res.send({msg:'err'}).end();
                        }else{
                            connection.release();
                            var uid= data[0].id;  //用户名ID
                            var salt='yHW79G';
                            var utc=parseInt(new Date().getTime()/1000); 

                            var unlock=my_md5.md5(passKey+sz+uid+username+suijiString+utc+salt).toUpperCase();
                            res.send({msg:'ok',sz,uid,uname:username,salt,utc,unlock}).end();
                        }
                    }
                });
            }
        });
    });

    //注册
    server.post('/myroute/register',(req,res)=>{
        var username= req.body.username; //用户名
        var password= req.body.password;  //密码
        
        password = my_md5.md5(my_md5.MD5_SUFFIX+password).toUpperCase();

        db.getConnection((err,connection)=>{
            if(err){
                console.log(err);
                res.status(500).send('connect to database error').end();
            }else{
                var sql= `SELECT * FROM user_table WHERE username='${username}'`;
                connection.query(sql,(err,data)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send('connect to database error').end();
                    }else{
                        if(data.length==0){
                            
                            sql=`INSERT INTO user_table (sz,username,password,auth_url) VALUES
                                ('${sz}','${username}','${password}',' ')`;
                            connection.query(sql,(err)=>{
                                connection.release();
                                if(err){
                                    console.log(err);
                                    res.status(500).send('connect to database error').end();
                                }else{
                                    res.send({msg:'ok'}).end();
                                }
                            });
                        }else{
                            connection.release();
                            res.send({msg:'has'}).end();
                        }
                    }
                });
            }
        });
    });

}

module.exports={
    login_registry
}