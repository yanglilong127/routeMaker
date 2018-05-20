//配置数据库的连接

const mysql=require('mysql');
//创建连接池
const pool=mysql.createPool({
    connectionLimit: 400,  //连接池最多可以的连接数
    host:'localhost',
    user:'root',
    password:'123456',
    database:'myroutemaker',
    //queueLimit:8 // 队伍中等待连接的最大数量，0为不限制。默认为0
});

module.exports={
    pool
}