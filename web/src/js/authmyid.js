//验证通过才能登录到主页面，验证

import {parseQueryString} from './functions.js';
import {login_url} from '../configs/setting.js'; //cloud登录地址


var url=window.location.href;  //连接
var result_parmas=parseQueryString(url);
var username=result_parmas.uname;  //用户名
var sz=result_parmas.sz;  //服务区名称
var uid=Number(result_parmas.uid);  //帐号ID
var salt=result_parmas.salt;  //随机字符串
var utc=result_parmas.utc;  //当前时间戳
var unlock=result_parmas.unlock;  //验证解锁

//http://localhost:55566/myroute/index.html?sz=TPDQATEST&uid=1&uname=funtoro&salt=yHW79G&utc=1509929143&unlock=C119D7EE5E8BC391A7F6DF997E8D541F&fullname=funtoro&auth=http://210.65.11.102/tpdqatest/ums/authmyid.php
//http://localhost:55566/myroute/index.html?sz=TPDQATEST&uid=100&uname=funtoro&salt=yHW79G&utc=1509929143&unlock=DF55B0D3D9ABCF13D4D231B1038FCEDB&fullname=funtoro&auth=http://210.65.11.102/tpdqatest/ums/authmyid.php
//http://localhost:55566/myroute/index.html?sz=KSTEST&uid=1&uname=admin&salt=DluWwJ&utc=1508294733&unlock=34015270C773A8A99544D19A96C27582&fullname=admin&auth=http://210.65.11.102/tpdqatest/ums/authmyid.php
//xml主页登录验证
var login_check=function(callback1,callback2){
    var fullname=result_parmas.fullname; //全名
    if(username && fullname && sz && uid && salt && utc && unlock){
        $.ajax({
            url:'/myroute/to_login_check',
            type:'post',
            data:{
                username,sz,uid,utc,salt,unlock
            },
            success:function(res,status){
                if(res.msg == 'noRight'){  //验证不通过
                    alert('you have no right.');
                    window.location.href=login_url;
                    //跳转登录页面
                }else if(res.msg=='ok'){  //通过
                    //通过后去获取xml数据信息
                    //del_data.getDataTable();
                    $('#navigation .login_status span.username').text(username);

                    //验证用户是否登录
                    if(typeof(callback1)=='function'){
                        callback1(sz,username,callback2);
                    }
                }
            }
        });
    }else{
        window.location.href=login_url;
    }
}


//点击登出操作
var login_out=function(){
    //点击登出按钮
    $('#navigation .login_status ul li.login_out').click(function(e){
        e.stopPropagation();
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url:'/myroute/user_login_out',
            type:'post',
            data:{},
            success:function(res){
                //window.location=login_url;
                window.location=login_url;
            }
        });
    });
}


module.exports={
    login_check,
    login_out
}