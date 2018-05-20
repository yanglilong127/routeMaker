import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
//加载样式文件
require('bootstrapcss');  
require('../css/iconfont.css');
require('../css/routemaker.css');

require('../js/my_i18next');
window.map;
window.markers = [];  //该条路线所有的标记集合
window.company_markers=[];   //添加的公司所有站点
window.markerClusterer;
window.infoWindow;

import {parseQueryString} from './functions';  //url解析
const operate_map=require('./operation_google_map');
import {login_url} from '../configs/setting.js'; //cloud登录地址
import {input_check_fun} from './pagination'; //输入框名字
import {login_check,login_out} from './authmyid';  //验证登录的功能
import {draw_line} from './marker_drag';
import {Company_station} from './company_station_pagination';
login_check();

login_out();  //登出按钮操作

var url=window.location.href;
//返回主页的连接地址
var home_addr=url.replace('/html/routeMaker.html','/index.html').split('&xml_id=')[0];
$('.box1 .home a.go_back').attr('href',home_addr);
url=parseQueryString(url);
var company_id=Number(url.uid);  //公司id
var xml_id=url.xml_id;  //xml+id值
//模态框，是否添加标记,初始化模态框
$('#myModal,#myModal_show_cityName').modal({
    show:false
});
//模态框标记名输入框检测
$('#myModal .modal-body input.mark_name').get(0).oninput=function(e){
    e.stopPropagation();
    input_check_fun($(this),1000);
};

//使标记命名框可以拖动
$('#marker_name').draggable();
$('#marker_name p.myBg i').click(function(e){
    e.stopPropagation();
    $('#marker_name').fadeOut();  //隐藏
});
$('#marker_name .my_inp input.mark_name').get(0).oninput=function(e){
    e.stopPropagation();
    input_check_fun($(this),1000);
};

//使站点列表可以排序
$('#chosen_stations ul.stations_lists').sortable({
    stop:function(ui){  //排序完释放鼠标后执行的函数
        draw_line();  //画线
        var save_val=i18next.t('UnSaved');
        $('.home span.save_tip').removeClass('saved')
        .attr('data-i18n','UnSaved')
        .text(save_val);
    }
});

function map_reset(){  //地图重新画
    var place =map.getCenter()  //获取位置
    var zoom =map.getZoom()  //获取位置
    window.map=new google.maps.Map(document.getElementById('google_map'), {
        zoom: zoom,
        center: place,
        streetViewControl: true,
        rotateControl: true,
        scaleControl: true
    });
    //地址搜索控件
    window.clearMarkers_clusterer(window.markers);
    draw_line(); //重新画线
}
//点击<向左伸进按钮
$('#container .contain_left_top p i.shensuo').click(function(e){
    e.stopPropagation();
    var _this=$(this);
    if($(this).hasClass('route_icon-zuo')){  //隐藏
        $('#container .contain_left').stop(true).animate({width:'0%'},1500)
        .siblings('#google_map_box').stop(true).animate({width:'100%'},1500,function(){
            _this.removeClass('route_icon-zuo').addClass('route_icon-you zhankai');

            map_reset();
        });
    }else{
        $('#google_map_box').stop(true).animate({width:'70%'},1500)
        .siblings('.contain_left').stop(true).animate({width:'30%'},1500,function(){
            _this.removeClass('route_icon-you zhankai').addClass('route_icon-zuo');

            map_reset();
        });
    }
});


window.my_company_stations= new Company_station();
window.my_company_stations.get_company_station()
.then(function(){
    window.my_company_stations.get_route_stations();
},function(msg){
    console.log(msg);
});

//表格搜索输入框输入内容
$('#marked_stations .search_data input.filter').get(0).oninput=function(e){
    e.preventDefault();
    var inp_val=$(this).val().trim();
    if(inp_val){  //有内容
        $('#marked_stations .search_data i.clear_text').fadeIn(1);
    }else{
        $('#marked_stations .search_data i.clear_text').fadeOut(1);
        var curPage=Number($('#pageShow .info_show span.currPage').text());
        window.my_company_stations.get_company_station();
    }
};
//点击表格输入框叉叉
$('#marked_stations .search_data i.clear_text').click(function(e){
    e.stopPropagation();
    $('#marked_stations .search_data input.filter').val('');
    $('#marked_stations .search_data i.clear_text').fadeOut(1);
    window.my_company_stations.get_company_station();
});
//点击表格中的搜索图标按钮
$('#marked_stations .search_data i.serach').click(function(e){
    e.stopPropagation();
    var inp_val=$('#marked_stations .search_data input.filter').val().trim();
    if(inp_val){
        window.my_company_stations.get_company_station(my_company_stations.nums_limit,1, inp_val);
    }
});

//点击经纬度搜索按钮
$('#jingweidu_search i.sosuo').click(function(e){
    e.stopPropagation();
    $('#place_search_form').submit();//表单提交
});
//经纬度搜索表单提交
$('#place_search_form').submit(function(e){
    e.preventDefault();  //阻止对表单的提交
    var input_val=$('#jingweidu_search input.search_place').val().trim();
    if(!input_val){  //非空，为空即返回
        return;
    }

    var err_tip=i18next.t('search_place');  //错误的提示语翻译
    var $err_tip=$('#jingweidu_search p.err_tip');
    input_val=input_val.split(',');  //分成数组
    if(input_val.length !=2 ){
        $err_tip.html(err_tip).stop(true).fadeIn(100);
        setTimeout(function(){
            $err_tip.stop(true).fadeOut();
        },5000);
        return;
    }else{
        var latitude=input_val[0].trim();  //纬度
        var longitude=input_val[1].trim();  //经度
        if(isNaN(latitude) || (latitude=='') || isNaN(longitude) || (longitude=='') ){  //只要其中有一个不是数值
            $err_tip.html(err_tip).stop(true).fadeIn(100);
            setTimeout(function(){
                $err_tip.stop(true).fadeOut();
            },5000);
            return;
        }else{  //都是数值类型
            latitude=Number(latitude);
            longitude=Number(longitude);
            //判断值的范围
            if(latitude>90 || latitude<-90 || longitude>180 || longitude<-180){
                $err_tip.html(err_tip).stop(true).fadeIn(100);
                setTimeout(function(){
                    $err_tip.stop(true).fadeOut();
                },5000);
                return;
            }
            
            latitude = parseInt(latitude*1000000)/1000000;  //只取前六位
            longitude = parseInt(longitude*1000000)/1000000;  //只取前六位
        }
    }
    //输入符合要求才能执行下面代码
    var latLng={
        lat : function(){
            return latitude;
        },
        lng : function(){
            return longitude;
        }
    };
    operate_map.add_company_mark_repeat(company_id,latLng,window.company_markers);
   
});
//点击地名搜索
$('#latlng_search .latlng_search i.sosuo').click(function(e){
    e.stopPropagation();
    $('#latlng_search').submit();//表单提交
});

var Is_auto_save=false;  //是否是自动保存
//点击保存按钮
$('#container .contain_left_top .confirm_box button.confirm').click(function(e){
    e.stopPropagation();
    var send_data=[];  //发送的数据
    var $choose_station=$('#chosen_stations ul.stations_lists li.stations_list');
    if($choose_station.length==0){
        return;
    }
    for(var i=0; i<$choose_station.length; i++){
        var station_id=Number($choose_station.eq(i).attr('station_id'));
        var station_ctime=Number($choose_station.eq(i).attr('ctime'));
        for(var j=0; j<window.markers.length; j++){
            let origin_station_id=window.markers[j].origin_station_id;
            let _station_id = window.markers[j].station_id;
            let latLng=window.markers[j].position;
            if(station_id== _station_id){
                let data_tmp={
                    origin_station_id,
                    station_id,
                    ctime:station_ctime,
                    latLng : {
                        lat: latLng.lat().toFixed(6),
                        lng: latLng.lng().toFixed(6) 
                    }
                }
                send_data.push(data_tmp);
                break;
            }
        }
    };
    //更新数据，保存
    $('#zhezhao').fadeIn(1);
    $.ajax({
        url : '/myroute/save_update_data',
        type:'post',
        data:{
            xml_id,
            send_data
        },
        success:function(res){
            $('#zhezhao').fadeOut(1);
            if(res.msg=='err' || res.msg=='no'){
                window.location=login_url;
            }else if(res.msg=='ok'){
                var save_val=i18next.t('Saved');
                $('.home span.save_tip').addClass('saved')
                .attr('data-i18n','Saved')
                .text(save_val);
                //保存后，使源station_id与origin_station_id一致
                var $table_tr=$('#company_stations tbody tr');
                for(var i=0; i<window.markers.length; i++){
                    window.markers[i].origin_station_id = window.markers[i].station_id;
                }
                for(var i=0; i<window.company_markers.length; i++){
                    let origin_station_id = window.company_markers[i].origin_station_id;
                    let station_id = window.company_markers[i].station_id;
                    for(var j=0; j<$table_tr.length; j++){
                        let _station_id = $table_tr.eq(j).attr('station_id');
                        if(origin_station_id == _station_id){
                            $table_tr.eq(j).attr('station_id',station_id);
                            break;
                        }
                        
                    }
                    window.company_markers[i].origin_station_id = station_id;
                };
                //保存成功提示信息
                var tip;
                if(Is_auto_save){  //自动保存
                    tip= i18next.t('Auto_save_success'); //提示信息
                }else{
                    tip= i18next.t('Save_success'); //提示信息
                }
                $('#save_success p.save_tip').text(tip);
                $('#save_success').stop(true).fadeIn(1);
                setTimeout(function(){
                    $('#save_success').stop(true).fadeOut(1);
                },2500);
                Is_auto_save = false;
            }
        },
        error:function(err){
            if(err.status==500){
                alert('server error,please operation later.');
                window.location.reload();
            }
        }
    });
});
//设置每10分钟自动保存
setInterval(function(){
    Is_auto_save = true;
    $('#container .contain_left_top .confirm_box button.confirm').trigger('click');
},600*1000);