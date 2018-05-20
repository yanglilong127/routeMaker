//公司站点管理页面

import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
//加载样式文件
require('bootstrapcss');  
require('../css/iconfont.css');
require('../css/company_station.css');

require('../js/my_i18next');
window.map;
window.markers = [];  //该条路线所有的标记集合
window.company_markers=[];   //添加的公司所有站点
window.markerClusterer;
window.infoWindow;

import {parseQueryString} from './functions';  //url解析
const operate_map=require('./company_operation_google_map');
import {login_url} from '../configs/setting';  //所有国家，cloud登录地址
import {input_check_fun} from './pagination'; //输入框名字
import {login_check,login_out} from './authmyid';  //验证登录的功能
import {draw_line} from './marker_drag';
import {Company_station} from './company_manager';
require('./company_station_languages_manage');
login_check();
login_out();  //登出按钮操作

var url=window.location.href;
var route_name = decodeURI(parseQueryString(url).route_name);  //路线名
$('.box1 .home span.route_name').text(route_name);
//返回主页的连接诶地址
var home_addr=url.replace('/html/companyStation.html','/index.html');
$('.box1 .home button.go_back').click(function(e){ //返回主页
    e.stopPropagation();
    window.location = home_addr;
});
url=parseQueryString(url);
var company_id=Number(url.uid);  //公司id
//模态框，是否添加标记,初始化模态框
$('#myModal,#edit_company_stations,#myModal_gohome,#myModal_usedfor').modal({
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
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(window.map_input);
    operate_map.place_autocomplete();
    window.clearMarkers_clusterer(window.markers);
    draw_line(); //重新画线
}

window.my_company_stations= new Company_station();
window.my_company_stations.get_company_station()
.then(function(getData){
    //添加公司下所有站点数据
    my_company_stations.add_all_stations(getData);
},function(msg){
    $('#zhezhao').fadeOut(1);
});

//点击搜索按钮
$('#jingweidu_search i.sosuo').click(function(e){
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