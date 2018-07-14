const express=require('express');
const expressSession=require('express-session');
const compression=require('compression');  //开启gzip压缩
const bodyParser=require('body-parser');     //post方式数值
const cookieParser=require('cookie-parser');
const consolidate=require('consolidate');
const ejs= require('ejs');
const session=require('connect-session');
const MysqlStore=require('connect-mysql')(expressSession);
const db=require('./backstage/router/databaseConnection').pool;
const options={
    pool:db,
    cleanup:false
}
const fs=require('fs');
const path=require('path');
//路由
const my_router=require('./backstage/router/index.js');

//创建服务器
const app=express();
const server=require('http').createServer(app);
const io=require('socket.io').listen(server);  //socket

//监听端口号55566,，mysql的链接也要更改
server.listen(55566, (err)=>{
    if(err)
        throw new err;
    else 
        console.log('成功监听55566端口。');
});
app.use(compression());
//获取数据请求  post方式
app.use(bodyParser.urlencoded({
    extended:true,
    maxAge:5*1024*1024
}));

//cookie、session
app.use(cookieParser('fsafgs4324rfrt34edfg5'));//签名
(function(){
    var sessionArr=[];
    for(var i=0;i<100000;i++)
        sessionArr.push('key_'+Math.random().toString().replace('.',''));
    app.use(expressSession({
        secret:'fsafgs4324rfrt34edfg5',
        name:'my_session_id',
        cookie:{maxAge:24*3600*1000},
        resave:false,
        saveUninitialized:true,
        keys:sessionArr,
        store: new MysqlStore(options),
    }));//24小时
})();
//清除过期的session
function sessionCleanup(){
    //console.log('开始清理了.');
    db.getConnection((err,connection)=>{
        if(err){
            console.log(err);
            throw err;
        }else{
            var sql=`DELETE from sessions WHERE expires>0 AND expires<UNIX_TIMESTAMP()`;
            connection.query(sql,(err)=>{
                connection.destroy();
                if(err){
                    console.log(err);
                    throw err;
                }
            }); 
        }
    });
}
setInterval(sessionCleanup, 1800000);

//3.模版
//输出什么东西
app.set('view engine','html');
//模版文件放在哪儿
app.set('views','./web/dist/myroute/html');
//哪种模版引擎
app.engine('html',consolidate.ejs);

//route    post方式
//临时保存提交,跳转路由
my_router.myrouter(app);

//静态文件放置位置，即根目录
app.use(express.static('./web/dist'));


//console.log(io.eio.clientsCount); 在线用户人数
// 检查用户是否已经在线
// io.sockets.sockets 返回所有在线的socket对象集合
var checkOnline = function(sz, username){
    for(var k in io.sockets.sockets){
        if(io.sockets.sockets.hasOwnProperty(k)){
            if(io.sockets.sockets[k] && io.sockets.sockets[k].sz == sz && io.sockets.sockets[k].username==username){
                return true;
            }
        }
    }
    return false;
}

io.on('connection',(socket)=>{
    //用户登录
    socket.on('login',(data)=>{
        var sz=data.sz;  //服务区
        var username=data.username;  //用户名
        if(checkOnline(sz, username)){  //用户在线
            //console.log('用户已在线')
            socket.emit('isExist',true);
            socket.emit('online_num',io.eio.clientsCount);
        }else{
            //console.log('登录成功')
            //socket.id唯一
            socket.sz=sz;
            socket.username=username;
            socket.emit('isExist',false);
            socket.emit('online_num',io.eio.clientsCount);
        }
    });
    

    //用户断开连接
	socket.on('disconnect',()=>{
        //console.log('用户下线')
	});
});