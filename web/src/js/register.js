//注册页面的js

//链接字体图标
require('../css/iconfont.css');
//链接login.css
require('../css/register.css');
require('./my_i18next');

//添加自定义校验
jQuery.validator.addMethod('noChina',function(value,element){
    var inp=/[^\w_]/g;
    return this.optional(element) || !(inp.test(value));
},'Only support number,letter and underline');
jQuery.validator.addMethod('myequal',function(value,element){
    var pwd=$('#myform input[name=password]').val();  //获取输入的密码
    var pwd2=$('#myform input[name=password2]').val();  //获取确认的密码
    var equal=(pwd===pwd2);
    return this.optional(element) || equal;
},'The password entered twice is inconsistent.');
jQuery.validator.addMethod('myphone',function(value,element){
    var inp=/^1[34578]\d{9}$/;
    return this.optional(element) || (inp.test(value));
},'号码输入不合法');

//表单验证
$('#myform').validate({
    debug:true,  //只验证，不提交表单
    rules:{
        user:{
            required:true,
            noChina:true,
            maxlength:12
        },
        password:{
            required:true,
            noChina:true,
        },
        password2:{
            required:true,
            myequal:true
        }
    },
    messages:{
        user:{
            required:'require fields',
            maxlength:'The length cannot exceed 12'
        },
        password:{
            required:'require fields',
            noChina:true,
        },
        password2:{
            required:'require fields'
        }
    },
    submitHandler:function(){   //通过验证后运行的函数
        var username=$('#myform input[name=user]').val().trim();//用户名
        var password=$('#myform input[name=password]').val().trim();//密码
        //ajax请求后台
        $.ajax({
            url:'/myroute/register',
            type:'post',
            data:{
                username,
                password
            },
            success:function(data){
                if(data.msg==='ok'){  //注册成功
                    $('#tooltip').fadeIn(1).text('Registration successd');
                    setTimeout(function(){
                        $('#tooltip').fadeOut(1);
                        window.location='/myroute/html/login.html';
                    },2000);
                }else if(data.msg==='has'){  //用户名已经被注册
                    //错误提示信息显示
                    $('#tooltip').fadeIn(500).text('Username has already been registered');
                    setTimeout(function(){
                        $('#tooltip').fadeOut(500);
                    },4000);
                }else{
                    //错误提示信息显示
                    $('#tooltip').fadeIn(500).text('connection error');
                    setTimeout(function(){
                        $('#tooltip').fadeOut(500);
                    },4000);
                }
            }
        });
    }
});
