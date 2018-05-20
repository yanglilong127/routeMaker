//登录 注册页面的脚本

//链接字体图标
require('../css/iconfont.css');
//链接login.css
require('../css/login.css');
require('../js/my_i18next');

//添加自定义校验
jQuery.validator.addMethod('noChina',function(value,element){
    var inp=/[^\w_]/g;
    return this.optional(element) || !(inp.test(value));
},'Only support number,letter and underline');
//表单验证
$('#myform').validate({
    debug:true, //只验证，不提交表单
    rules:{
        user:{
            required:true,
            noChina:true
        },
        password:{
            required:true,
            noChina:true
        }
    },
    messages:{
        user:{required:'require fields'},
        password:{required:'require fields'}
    },
    submitHandler:function(){ //通过验证后运行的函数
        var username=$('#myform .denglu:eq(0) input[name=user]').val().trim();//用户名
        var password=$('#myform .denglu:eq(1) input[name=password]').val().trim();//密码
        $.ajax({
            url:'/myroute/login',
            type:'post',
            data:{
                username,
                password
            },
            success:function(data){
                if(data.msg==='ok'){  //验证成功
                    sz,uid,uname,salt,utc,unlock
                    var sz= data.sz;  //服务区
                    var uid= data.uid;  //用户名ID
                    var uname= data.uname;  //用户名ID
                    var salt= data.salt;  //用户名ID
                    var utc= data.utc;  //用户名ID
                    var unlock= data.unlock;  //用户名ID
                    var fullname= uname;  //用户名ID

                    window.location='/myroute/index.html?sz='+sz+'&uid='+uid+'&uname='+uname+'&salt='
                                    +salt+'&utc='+utc+'&unlock='+unlock+'&fullname='+fullname;
                                
                }else if(data.msg==='no'){  //不存在此用户
                    $('#tooltip').text('no this username').fadeIn(500);
                    $('#myform .denglu:eq(1) input[name=password]').val('');//密码
                    setTimeout(function(){  //错误信息提示显示4秒
                        $('#tooltip').fadeOut(300);
                    },4000);
                }else{
                    //错误提示信息显示
                    $('#tooltip').text('username or password error').fadeIn(500);
                    //$('#myform .denglu:eq(0) input[name=user]').val('');//用户名
                    $('#myform .denglu:eq(1) input[name=password]').val('');//密码
                    setTimeout(function(){  //错误信息提示显示4秒
                        $('#tooltip').fadeOut(300);
                    },4000);
                }
            }
        });
    }
});