//加载主样式文件
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
require('bootstrapcss');  
require('../css/iconfont.css')
require('indexcss')

//import io from 'socket_io';
require('./my_i18next.js');
import {parseQueryString,htmlspecialchars} from './functions';
import {getDataTable} from './pagination';
import {input_check_fun,delete_language,request_delete_language} from './pagination';
import {countries,login_url} from '../configs/setting';  //所有国家
import {merge_routes,route_info_click_confirm} from './merge_route';  //合并路线


const del_data=require('./pagination');  //分页
import {login_check,login_out} from './authmyid';
import {client_socket} from './socket_client';  //验证用户是否登录了
login_check(client_socket,del_data.getDataTable);

var url_json=parseQueryString(window.location.href); //url json数据
login_out();  //登出按钮操作

window.all_routes=[];  //合并路线时，所有添加的路线route_id集合
window.merge_routes_languages=[];  //合并路线时，所选语言的集合
//公司站点管理页面跳转地址
var company_station_url = window.location.href.replace('index.html','html/companyStation.html');
$('.outerbox button.go_company a.go_company').attr('href',company_station_url);    

//点击新建按钮
$('#getData p.info_tip button.new_route').click(function(e){
    e.stopPropagation();
    $('#create_new_profile').fadeIn();
    $('#create_new_profile .my_inp').find('input.xml_name,textarea.xml_description')
    .val('').fadeIn();
});
//监听输入文件名框
$('#create_new_profile .my_inp input.xml_name').get(0).oninput=function(e){
    e.stopPropagation();
    input_check_fun($(this));
}
//点击确定新建按钮
$('#create_new_profile .my_btn button').click(function(e){
    e.stopPropagation();
    var _input=$('#create_new_profile .my_inp input.xml_name');
    var filename=_input.val().trim();  //文件名
    if(!input_check_fun($('#create_new_profile .my_inp input.xml_name')))
        return;
    //去点原文件名标点符号后的文件名,并转为大写
    var remove_sysm_filename=XRegExp.replace(filename, XRegExp('\\p{P}?\\p{S}?\\p{Zs}?','g'), (match)=>{
        return ''
    }).toUpperCase();
    var description=$('#create_new_profile textarea.xml_description').val().trim();
    //请求后台创建...
    $('#zhezhao').fadeIn(1);
    $.ajax({
        url:'/myroute/create_new_profile',
        type:'post',
        data:{
            filename,
            description:htmlspecialchars(description),
            remove_sysm_filename
        },
        success:function(res,status){
            if(res.msg=='err'){
                window.location.reload();  //重载
            }else if(res.msg=='has'){  //表示名称存在
                $('#zhezhao').fadeOut(1);
                var exist_filename=res.filename;
                $('#create_new_profile .my_inp p.err_tip').text('A similar route name exists:'+exist_filename)
                .stop(true).fadeIn();
                setTimeout(function(){
                    $('#create_new_profile .my_inp p.err_tip').fadeOut();
                },3000);
            }else if(res.msg=='ok'){
                //隐藏对话框
                $('#create_new_profile').fadeOut();
                //清空输入框内容
                $('#create_new_profile .my_inp input.xml_name').val('')
                $('#create_new_profile textarea.xml_description').val('');  
                var show_num=$('#getData p.info_tip select.showpage').val();
                getDataTable(1,show_num,true);
            }
        }
    });
});

//使块元素可以拖动
$('#create_new_profile,#show_detail,#merge_route').draggable({
    //containment:'.outerbox1'
});
$('#create_new_profile,#show_detail,#merge_route').find('p.myBg i.route_icon-chuyidong')
.click(function(e){
    e.stopPropagation();
    $(this).parent().parent().fadeOut();
    if($(this).parent().parent().attr('id')=='merge_route'){ //点击合并的关闭按钮
        $('#getData p.info_tip button.merge').removeClass('disabled');
        $('#getDataTable table tbody tr th.click_choose .border_box_check i.choose')
        .removeClass('route_icon-xuanzhong');  //删除选中样式
        window.merge_routes_languages=[];  //合并路线时，所选语言的集合
        window.all_routes=[];  //所有添加的路线route_id集合
        $('#choose_stations_box ul.routes').html('');  //清空路线信息
        $('#merge_route .exist_languages ul.languages li.language').remove();  //清空语言
    }
});


//监听搜索输入框
$('#getData p.info_tip input.search').get(0).oninput=function(e){
    e.preventDefault();
    var inp_val=$('#getData input.search').val().trim();
    var show_num=$('#getData p.info_tip select.showpage').val(); //显示多少条数据
    if(inp_val){  //有内容
        $('#getData i.fanhui').fadeIn();  //叉叉按钮显示
        if(inp_val.length >= 2){  //输入字符超过1个时进行搜索
            getDataTable(1,show_num,false,inp_val);
        }  
    }else{
        $('#getData i.fanhui').fadeOut();
        getDataTable(1,show_num,false);
    }
};

//更改下拉列表每页显示页数
$('#getData p.info_tip select.showpage').change(function(e){
    e.stopPropagation();
    var show_num=$(this).val();
    getDataTable(1,show_num,false);
});


//点击搜索框里的叉叉按钮
$('#getData p.info_tip i.fanhui').click(function(e){
    e.stopPropagation();
    $(this).fadeOut();  //隐藏自身
    $(this).siblings('input.search').val('');
    var show_num=$('#getData p.info_tip select.showpage').val();
    getDataTable(1,show_num,false);
});
//点击搜索按钮
$('#getData p.info_tip i.route_icon-sousuo').click(function(e){
    e.stopPropagation();
    var filename=$(this).siblings('input.search').val();  //文件名
    var show_num=$('#getData p.info_tip select.showpage').val();
    getDataTable(1,show_num,false,filename);
});

//初始化模态框
$('#myModal').modal({
    show:false
});
$('#route_info,#merge_route_info').modal({
    show:false,
    backdrop:false  //元素用于提供一个可点击的区域，点击此区域就即可关闭模态框。
});

//语言选择函数
language_event();
function language_event(){
    //语言选择框可以拖动
    $('#language_lists_box').draggable({
        "containment":'.outerbox1'
    });
    //点击语言选择的叉叉
    $('#language_lists_box p.title_info i').click(function(e){
        e.stopPropagation();
        $('#language_lists_box').fadeOut(); //隐藏
    });
    //语言列表
    for(var key in countries){
        var $li='<li class="language">'
                + '<span class="this_country">'+key+'</span>'
                + '<i class="icon route_iconfont route_icon-you"></i>'
                + '<ul class="country">';
        for(var key1 in countries[key]){
            $li +='<li class="country_text" callname="'+countries[key][key1]+'"><span>'
                    +key1+'</span><i class="icon route_iconfont"></i></li>'
        }
        $li += '</ul></li>';
        $('#language_lists_box ul.choose_my_language').append($li); //一次性选择多国语言
    }

    //点击列表语言
    $('#language_lists_box ul.choose_my_language li.language ul li.country_text').click(function(e){
        e.stopPropagation();
        var jianchen=$(this).attr('callname');  //语言代码简称
        if(jianchen =='en.US')  //这个点击无效
            return;
        var $chosen_i=$(this).find('i.icon');
        //$chosen_i.toggleClass('route_icon-xuanzhong'); //添加选中样式
        //Route info 添加语言
        var xml_id=$('#route_info').attr('xml_id');
        var $stations_tb=$('#language_table tbody tr');
        var stations=[];
        for(var i=1; i<$stations_tb.length; i++){
            var station_id=$stations_tb.eq(i).attr('id');
            stations.push(station_id);
        }
        if(!$chosen_i.hasClass('route_icon-xuanzhong')){  //添加语言
            $chosen_i.addClass('route_icon-xuanzhong'); //添加选中样式
            var language_len=$('#choose_language .language_box ul.chosen li.language').length;
            $.ajax({
                url : '/myroute/add/language',
                type:'post',
                data:{
                    xml_id,
                    jianchen,
                    stations,
                    xml_id,
                    language_num:language_len+1 //语言数目
                },
                success:function(res){
                    if(res.msg=='ok'){
                        var route_lang_id=res.route_lang_id; //该路线的对应语言id
                        var stations_data=res.stations_data;  //站点的ID和station_id数组
                        //console.log(stations_data)
                        var li=`<li class="language">
                                    <span>${jianchen}</span>
                                    <i class="icon route_iconfont route_icon-shanchu"></i>
                                </li>`;
                        var $language_ul=$('#choose_language .language_box ul.chosen');
                        $language_ul.find('.clear').before($(li));
                        delete_language();  //使点击删除图标有效
                        //表格中头部语言添加一列
                        $('#language_table thead tr').append($(`<th route_lang_id=${route_lang_id}>${jianchen}</th>`));
                        var cols_len= $('#language_table thead tr th').length;
                        var $table_row=$('#language_table tbody tr'); //表格的行数
                        for(var i=0; i<$table_row.length; i++){
                            var th;  //列内容
                            if(i==0){
                                th=`<th>
                                        <input type="text" class="form-control" value=''  origin_val=''>
                                    </th>`;
                            }else{
                                var head_id=$table_row.eq(i).attr('id');
                                var station_lang_id;
                                var sta_transition='';
                                for(var j=0; j<stations_data.length; j++){
                                    let ret_station_id=stations_data[j].station_id;
                                    let ID=stations_data[j].ID;
                                    let transition=stations_data[j].transition;
                                    if(ret_station_id === head_id){
                                        station_lang_id = ID;
                                        sta_transition = transition;
                                        break;
                                    }
                                }
                                th=`<th station_lang_id='${station_lang_id}'>
                                        <input type="text" class="form-control" value="${sta_transition}"  origin_val='${sta_transition}'>
                                    </th>`;
                            }
                            $('#language_table tbody tr').eq(i).append($(th));
                        }
                        //改变语言的数目
                        language_len=$('#choose_language .language_box ul.chosen li.language').length;
                        var $route_table=$('#getDataTable table tbody tr');
                        for(var i=0; i<$route_table.length; i++){
                            var route_id=$route_table.eq(i).attr('xml_id');
                            if(route_id ==xml_id){
                                var $language_list_ele = $route_table.eq(i).find('th.language_num span.language_list');
                                let languages_list=$language_list_ele.text();
                                languages_list = languages_list+ ','+ jianchen;
                                $language_list_ele.text(languages_list);
                                languages_list= languages_list.split(',').join(' ');
                                $language_list_ele.attr('data-original-title',languages_list);
                                break;
                            }
                        }
                        //触发点击确定
                        $('#route_info .modal-footer button.confirm').trigger('click');
                    }else if(res.msg=='err'){
                        window.location=login_url;
                    }
                }
            });
        }else{    //删除语言
            request_delete_language(jianchen);
        }   
    });
}

//点击路线模态框Language按钮
$('#choose_language p.button_choose button.language').click(function(e){
    e.stopPropagation();
    $('#language_lists_box').fadeIn();
});

//处理点击路线详情Comfirm按钮事件
route_info_click_confirm();

//点击合并按钮merge
$('#getData p.info_tip button.merge').click(function(e){
    e.stopPropagation();
    if(all_routes.length < 2){  //至少选择一条以上的路线
        var tip= i18next.t('Merge_route_err'); //提示信息
        $('#save_success p.save_tip').text(tip);
        $('#save_success').stop(true).fadeIn(1);
        setTimeout(function(){
            $('#save_success').stop(true).fadeOut(1);
        },2000);
        return
    }
    if($(this).hasClass('disabled')){  //点击无效
        return;
    }
    $(this).addClass('disabled');
    $('#merge_route').fadeIn()  //合并窗口显示
    .find('.routeFile input.filename').val(''); 

    merge_routes(url_json);
});

//警告提示框
$('.waring_info button.close').click(function(e){
    e.stopPropagation();
    $(this).parent().slideUp();
});
