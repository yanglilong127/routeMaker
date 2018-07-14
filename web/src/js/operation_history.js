require('bootstrapcss');  
require('../css/iconfont.css');
require('jqueryuicss');
require('../css/operation_history.css');

import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import {login_url,operation_command} from '../configs/setting.js'; //cloud登录地址
import {parseQueryString,forMatDate} from './functions.js';
require('./my_i18next.js');

//循环操作提示
for(var key in operation_command){
    var option_ele = `<option value="${key}">${operation_command[key]}</option>`;
    $('#oped_oper_sel').append($(option_ele));
}
//点击Home按钮
var homePage= window.location.href.replace('/html/operationHistory.html','/index.html');
$('.box1 .home button.go_back').click(function(e){
    e.stopPropagation();
    window.location = homePage;
});
var result_parmas = parseQueryString(window.location.href);

function login_check(){
    var username=result_parmas.uname;  //用户名
    var sz=result_parmas.sz;  //服务区名称
    var uid=Number(result_parmas.uid);  //帐号ID
    var salt=result_parmas.salt;  //随机字符串
    var utc=result_parmas.utc;  //当前时间戳
    var unlock=result_parmas.unlock;  //验证解锁
    var fullname=result_parmas.fullname; //全名
    if(username && fullname && sz && uid && salt && utc && unlock){
        $.ajax({
            url:'/myroute/history_oper_to_login_check',
            type:'post',
            data:{
                username,sz,uid,utc,salt,unlock
            },
            success:function(res,status){
                if(res.msg == 'noRight'){  //验证不通过
                    alert('you have no right.');
                    window.location=login_url;
                    //跳转登录页面
                }else if(res.msg=='no'){
                    window.location=login_url;
                }else if(res.msg=='ok'){  //通过
                    //通过后去获取xml数据信息
                    $('#navigation .login_status span.username').text(username);
                    $('#zhezhao').fadeOut(1);
                }
            }
        });
    }else{
        window.location.href=login_url;
    }
}
login_check();

//起始结束日期的设置
//nday表示获取前后几天的时间，可正可负
function the_forMatDate(nday){  //中国标准时间对象
    var date = new Date();
    if(nday){
        date = date.getTime() + nday * 24 *3600 *1000;
        date = new Date(date);
    }
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    month = month <10 ? '0'+month: month;
    var dat=date.getDate();
    dat = dat <10 ? '0'+dat: dat;
    date=year+'-'+month+'-'+dat;
    return date;
}
$( "#user_start_date" ).val(the_forMatDate(-6)); //获取前6天日期
$( "#user_stop_date" ).val(the_forMatDate());
$( "#user_start_date" ).datepicker({
    maxDate: "+0D",  //最大筛选一天
    dateFormat:"yy-mm-dd",  //格式化显示时间
    onClose: function(selectDate){
        //console.log(selectDate, typeof selectDate)
        //设置结束日期的最小时间
        $( "#user_stop_date" ).datepicker('option','minDate', selectDate);
    }
});
$( "#user_stop_date" ).datepicker({
    maxDate: "+0D",  //最大筛选一天
    dateFormat:"yy-mm-dd",  //格式化显示时间
    onClose: function(selectDate){
        //console.log(selectDate, typeof selectDate)
        //设置结束日期的最大时间
        $( "#user_start_date" ).datepicker('option','maxDate', selectDate);
    }
});

/**分页码
 * totalPage 表示总页码数
 * currenPage 表示当前页码
 * count  表示显示的个数
 * **/
function split_page(totalPage,currentPage=1,count=5){
    $('#my_pagination').pagination({
        totalPage: totalPage,   // 总页数
        currentPage: currentPage,  // 当前页数
	    isShow: false,    // 是否显示首尾页
		count: count,        // 显示个数
		//homePageText: 'Start',  // 首页文本
		//endPageText: 'End',   // 尾页文本
		prevPageText: "prevPage",// 上一页文本
		nextPageText: "nextPage",// 下一页文本
        callback: function(current) {  // 回调,current(当前页数)
			//1. 获取当前页数和总页数
            //var info=$("#pageShow .Page").pagination("getPage");// 获取当前页数和总页数
			//$('#currentPage').text(info.current);
            //$('#totalPage').text(info.total); 
            //更改当前页码显示
            //$('#pageShow .info_show span.currPage').text(current);
            //改变数据
            getData(current);
		}
    });
    var $page=$('#my_pagination .ui-pagination-container a');
    //为每个页码添加data-i18n属性
    for(let i=0; i<$page.length; i++){
        var text=$page.eq(i).text();
        $page.eq(i).attr('data-i18n',text);
        var i18n_text=i18next.t(text);
        $page.eq(i).text(i18n_text);
    }
}

//生成表格数据
function create_list(data){
    $('#user_operation_grid tbody').html('');  //清空表格
    if(data.length==0){
        $('#user_operation_grid tfoot').fadeIn(1);
    }else{
        $('#user_operation_grid tfoot').fadeOut(1);
    }
    for(var i=0; i<data.length; i++){
        var oper_time = forMatDate(new Date(data[i].oper_time));  //时间格式转换
        var record_detail = data[i].detail; //记录细节
        let detail_str ="";
        if(record_detail.indexOf('<li>')!=-1){ //是记录的翻译
            record_detail = record_detail.split('<li>');
            detail_str = "<td>"+record_detail[0]+"<ul class='transition my_diy_scrollbar'>";
            for(var j=1; j<record_detail.length; j++){
                detail_str += "<li>"+record_detail[j]+ "</li>";
            }
            detail_str += "</ul></td>";
        }else{
            detail_str= `<td class="description">${data[i].detail}</td>`;
        }
        var li_list=`<tr>
                        <td class="route_name">${data[i].route_name? data[i].route_name: ''}</td>
                        <td class="operation">${data[i].operation}</td>
                        ${detail_str}
                        <td class="time">${oper_time}</td>
                        <td class="user">${data[i].username}</td>
                        <td class="ip">${data[i].IP}</td>
                    </tr>`;
        $('#user_operation_grid tbody').append($(li_list));
        //为其添加提示工具
        //$('[data-toggle="tooltip"]').tooltip();
    }
}

//点击Apply按钮
$('#user_apply_btn').click(function(e){
    e.stopPropagation();
    getData();  //获取数据
});

//向后台请求数据
function getData(page=1,nums_limit=10){
    if($('#zhezhao').css('display')!='block'){
        $('#zhezhao').fadeIn(1);
    }

    $('#input_filter input.inp_filter').val('');
    $('#input_filter i.delete_icon').fadeOut(1);
    $('#filter_data_num').fadeOut(1); //显示数据隐藏
    $('#data_page_infor').fadeIn(1); //分页信息出现
    var start_time =$('#user_start_date').val().trim(); //起始日期
    var end_time =$('#user_stop_date').val().trim();  //结束日期
    var route_name= $('#route_filter').val().trim();  //路线名称
    var username= $('#user_filter').val().trim();  //用户
    var operation_order= Number($('#oped_oper_sel').val());  //操作指令

    $.ajax({
        url: '/myroute/get_operation_history_data',
        type:'post',
        data:{
            page:page,
            nums_limit:nums_limit,
            start_time,
            end_time,
            operation_order,
            username,
            route_name
        },
        success:function(res,status){
            if(res.msg=='ok'){
                $('#zhezhao').fadeOut(1);
                var dataLen=res.count;  //总条数
                var data=res.data;  //返回的数据

                var page_num=Math.ceil(dataLen/nums_limit);  //页数
                create_list(data);  //创建表格
                //分页
                split_page(page_num, page);

                var fromNum = dataLen>0? nums_limit * (page -1) + 1 : 0;  //起始条数
                var toNum;  //终止条数
                if(page < page_num){
                    toNum = fromNum + nums_limit -1;
                }else{
                    toNum = dataLen;
                }
                $('#user_operation_grid_info span.from_num').text(fromNum);
                $('#user_operation_grid_info span.to_num').text(toNum);
                $('#user_operation_grid_info span.total').text(dataLen);
                
            }else if(res.msg=='no' || res.msg=='err'){
                window.location= login_url;
            }
        }
    });
}

//搜索框中输入搜索内容
filterTable();
function filterTable() {
    //监听输入内容
    $('#input_filter input.inp_filter').get(0).oninput=function(e){
        e.preventDefault();
        var inp_val=$(this).val().trim().toLowerCase();
        if(inp_val){  //有内容
            $('#input_filter i.delete_icon').fadeIn(1);
            $('#filter_data_num').fadeIn(1); //显示数据出现
            $('#data_page_infor').fadeOut(1); //分页信息隐藏
            var $tbody_tr= $('#user_operation_grid tbody tr');
            for(var i=0; i<$tbody_tr.length; i++){
                if($tbody_tr.eq(i).text().toLowerCase().indexOf(inp_val)!= -1){ //如果搜索到了
                    $tbody_tr.eq(i).fadeIn(1).addClass('isShow');  //显示
                    var $tbody_tr_td=$tbody_tr.eq(i).children('td');
                    for(var j=0; j<$tbody_tr_td.length; j++){
                        var td_text=$tbody_tr_td.eq(j).text().trim().toLowerCase();
                        if(td_text.indexOf(inp_val)!= -1 ){
                            $tbody_tr_td.eq(j).addClass('filter');
                        }else{
                            $tbody_tr_td.eq(j).removeClass('filter');
                        }
                    }
                }else{
                    $tbody_tr.eq(i).fadeOut(1).removeClass('isShow');  //隐藏
                }
            }
            //获取搜索到的结果条数
            var showNum = $('#user_operation_grid tbody tr.isShow').length;
            $('#filter_data_num span.nums').text(showNum); //显示数据隐藏
            if(showNum === 0){  //表格没有数据时显示没有搜到结果
                $('#user_operation_grid tfoot').fadeIn(1);
            }else{
                $('#user_operation_grid tfoot').fadeOut(1);
            }
        }else{
            $('#input_filter i.delete_icon').fadeIn(1);
            $('#filter_data_num').fadeOut(1); //显示数据隐藏
            $('#data_page_infor').fadeIn(1); //分页信息出现
            $('#user_operation_grid tbody tr').fadeIn(1)
            .find('td').removeClass('filter');
        }
    };
    //点击表格输入框叉叉
    $('#input_filter i.delete_icon').unbind('click');
    $('#input_filter i.delete_icon').bind('click',function(e){
        e.stopPropagation();
        $('#input_filter input.inp_filter').val('');
        $('#input_filter i.delete_icon').fadeOut(1);
        $('#filter_data_num').fadeOut(1); //显示数据隐藏
        $('#data_page_infor').fadeIn(1); //分页信息出现
        $('#user_operation_grid tbody tr').fadeIn(1)
        .find('td').removeClass('filter');
        //数据原本条数
        var showNum = $('#user_operation_grid tbody tr').length;
        if(showNum == 0){  //表格没有数据时显示没有搜到结果
            $('#user_operation_grid tfoot').fadeIn(1);
        }else{
            $('#user_operation_grid tfoot').fadeOut(1);
        }
    });
};

//点击登出按钮
$('#navigation .login_status ul li.login_out').click(function(e){
    e.stopPropagation();
    var logout_path = result_parmas.apihead + user_api_logout_suffix;
    let uid = result_parmas.uid;
    $('#zhezhao').fadeIn(1);
    $.ajax({
        url:  '/myroute/proxy_logout',
        type:'get',
        data:{
            logout_path,
            uid:uid
        },
        success:function(res){
            setTimeout(function(){
                $('#zhezhao').fadeOut(1);
                window.location=logout_path;
            },1000)
        }
    });
});