
require('bootstrapcss');  
require('../css/routedrive.css');
import Speech from 'speak-tts';  //文字转语音
import {parseQueryString} from './functions';  //url解析
import {fromLatLngToPixel,fromPixelToLatLng} from './ContextMenu';
import {login_url} from '../configs/setting.js'; //登录地址

var history_url =  document.referrer;  //跳转过来的url地址
$('#home').click(function(e){
    e.stopPropagation();
    window.location= history_url;
});
var xml_id= parseQueryString(window.location.href).route_id;
var uluru = {lat: 30.936986, lng: 113.914559}; //湖北工程学院地理位置

window.map = new google.maps.Map(document.getElementById('google_map'), {
    zoom: 6,
    center: uluru,
    streetViewControl: true,
    rotateControl: true,
    scaleControl: true
});

window.stations_data;  //站点经纬度数据
window.stations_transition;  //站点翻译数据
window.markers=[];
window.transition_arra=[]; //韩语翻译顺序需数组

var taxi_marker; //出租车标记

var speak_text;  //需要播报的中文
Speech.setLanguage('zh-CN');
Speech.setVoice('zh-CN');
Speech.init({
    onVoicesLoaded:(data)=>{
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url :'/myroute/get_routeInfo',
            type:'post',
            data:{xml_id},
            success:function(res){
                $('#zhezhao').fadeOut(1);
                if(res.msg=='ok'){
                    var route_data=res.route_data;
                    window.stations_transition=res.stations_data1;
                    window.stations_data=res.stations_data2;
                    route_data.forEach(function(ele,index){
                        if(ele.lang=='zh.CN'){
                            speak_text='该路线为:'+ ele.transition;
                        }
                    });
                    Speech.speak({
                        text: speak_text,
                        onError: (e) => {console.log('sorry an error occurred.', e)}, // optionnal error callback
                        //onEnd: () => {console.log('your text has successfully been spoken.')} // optionnal onEnd callback
                    });
                    window.stations_data.forEach(function(ele,index){
                        var marker = new google.maps.Marker({
                            map: map,
                            station_id:ele.station_id,
                            position:{
                                lat: Number(ele.lat),
                                lng: Number(ele.lng)
                            }
                        });
                        window.markers.push(marker);
                    });
                    
                    draw_line();
                    sort_transiton();

                    var position={
                        lat : function(){
                            return window.stations_data[0].lat;
                        },
                        lng : function(){
                            return window.stations_data[0].lng;
                        }
                    }
                    var car_start_position=fromLatLngToPixel(position,map);
                    $('#car').css({left:car_start_position.x-30, top:car_start_position.y-30});

                    setTimeout(function(){  //播放第一个站点
                        Speech.speak({
                            text: '起点为:' +window.transition_arra[0],
                            onError: (e) => {console.log('sorry an error occurred.', e)}, // optionnal error callback
                            onEnd: () => {
                                //开始运动,  todo
                                var start_index=1;  //开始的序列号
                                car_animate();
                                function car_animate(){
                                    if(start_index< window.stations_data.length){
                                        var position={
                                            lat : function(){
                                                return window.stations_data[start_index].lat;
                                            },
                                            lng : function(){
                                                return window.stations_data[start_index].lng;
                                            }
                                        }
                                        var car_end_position=fromLatLngToPixel(position,map);
                                        $('#car').animate({left:car_end_position.x-30, top:car_end_position.y-30},6000,function(){
                                            if(start_index < window.stations_data.length-1){
                                                var spaek_txt = '到达站点:' +window.transition_arra[start_index];
                                            }else{
                                                var spaek_txt = '到达终点站:' +window.transition_arra[start_index];
                                            }
                                            
                                            Speech.speak({
                                                text: spaek_txt,
                                                onError: (e) => {console.log('sorry an error occurred.', e)}, // optionnal error callback
                                                onEnd: () => {
                                                    //draw_line(start_index);
                                                    start_index++;
                                                    car_animate();
                                                }
                                            });
                                        });
                                    }
                                }
                            }
                        });
                    },4000);
                }else if(res.msg=='err'){
                    window.location = login_url;
                }
            }
        });
    }
});



//将韩语按照顺序存储起来
function sort_transiton(){
    window.stations_data.forEach(function(ele,index){
        var station_id= ele.station_id;

        for(var i=0; i<window.stations_transition.length; i++){
            var _statation_id = window.stations_transition[i].station_id; 
            var lang = window.stations_transition[i].lang; 
            var transition = window.stations_transition[i].transition; 
            if((station_id == _statation_id) && (lang=='zh.CN') ){
                window.transition_arra.push(transition);
                break;
            }
        }
    });
};

var bounds=new google.maps.LatLngBounds();  //缩放对象
var flightPath =new google.maps.Polyline({ //多线段
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
});;  

//所有标记设置最佳视野，并画折线
function draw_line(start=0){
    //画折线
    let Path=[]; //路线
    for(var i=0; i<window.markers.length; i++){
        var lat=parseInt(markers[i].position.lat()*1000000)/1000000;
        var lng=parseInt(markers[i].position.lng()*1000000)/1000000;
        var latlng={
            lat : lat,
            lng : lng
        }
        Path.push(latlng)
    }
    flightPath.setPath(Path);
    flightPath.setMap(null);
    flightPath.setMap(map);

    //设置最佳缩放级别
    for (var i=start; i<window.markers.length; i++) {  
        bounds.extend (window.markers[i].getPosition()); 
        //更改标记图标
        var marker_num = i+1;  //标记的数字序号
        if(marker_num > 99){
            marker_num = '99+';
        }else{
            marker_num = marker_num.toString();
        }
        window.markers[i].setLabel(marker_num);
        if(i ===window.markers.length-1){
            window.markers[i].setIcon({
                url:'/myroute/libs/images/station_stop.png'
            });
        }else if(i===0){
            window.markers[i].setIcon({
                url:'/myroute/libs/images/station_start.png'
            });
        }else{
            window.markers[i].setIcon(null);
        }
    }  
    window.map.fitBounds (bounds);
}





