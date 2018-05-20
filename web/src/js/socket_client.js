//客户端连接服务器
import {login_url,server_ip} from '../configs/setting.js'; //cloud登录地址

import io from 'socket.io-client';
function client_socket(sz,username,callback){
    //建立socket连接
    var socket =io.connect(server_ip);
    socket.on('connect',()=>{
        socket.emit('login',{sz:sz,username:username});
    });

    //判断用户是否在线
    socket.on('isExist',(status)=>{
        if(status==true){  //已经在线
            alert('this user is online.');
            window.location=login_url;
        }else{  //不在线
            if(typeof(callback)=='function'){
                callback();
            }
        }
    });
    //callback();
}


module.exports={
    client_socket
}
