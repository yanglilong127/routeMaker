//检查是否存在session

const fs=require('fs');
const db=require('./databaseConnection').pool;

var mysql_check_session=function(req,res,callback){
    
    var sz=req.session['user_sz'];
    var username=req.session['user_name'];
    if(sz && username){  //session存在
        req.session._garbage=Date.now();  //更新session过期时间
        if(typeof(callback)=='function'){
            callback('ok');
        }
        
    }else{
        if(typeof(callback)=='function'){
            callback('no');
        }
    }          
};

//更新数据库该用户最后操作时间
function update_database_last_time(req){
    var ID=req.session['user_id'];
    var sz=req.session['user_sz'];
    var username=req.session['user_name']; //用户名
    db.getConnection((err,connection)=>{
        if(err){
            console.log(err);
            throw err;
            res.status(500).send('connect to database error').end();
        }else{
            var now_time = parseInt(new Date().getTime()/1000);  //转换为秒
            var sql = `UPDATE user_table SET login_last_time='${now_time}' WHERE 
                username='${username}' and sz='${sz}' and id=${ID}`;
            connection.query(sql, (err)=>{
                connection.release();
                if(err){
                    console.log(err);
                    throw new err;
                }
            });
        }
    });
}


module.exports={
    mysql_check_session,
    update_database_last_time
}