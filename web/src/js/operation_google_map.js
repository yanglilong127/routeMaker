var pinyin = require("pinyin");  //将汉字转为拼音
import {input_check_fun} from './pagination'; //输入框名字
import {cal_station_id,parseQueryString} from './functions'; //得到站点id和经纬度
import {fromLatLngToPixel} from './ContextMenu';
import {marker_drag_ev,draw_line} from './marker_drag';
import {search_latlng} from './search_place_name';

var company_id=Number(parseQueryString(window.location.href).uid);  //公司id

var uluru = {lat: 30.936986, lng: 113.914559}; //湖北工程学院地理位置

window.map = new google.maps.Map(document.getElementById('google_map'), {
    zoom: 6,
    center: uluru,
    streetViewControl: true,
    rotateControl: true,
    scaleControl: true
});
if (navigator.geolocation) {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(function(position) {
        // var place =map.getCenter();  //获取位置  http协议下无效
        var lat =parseInt( position.coords.latitude *1000000) /1000000;
        var lng =parseInt( position.coords.longitude *1000000) /1000000;
        // var lat =place.lat()+2;
        // var lng =place.lng()+3;
        uluru.lat =lat;
        uluru.lng =lng;


        window.map.setCenter(uluru);
        new google.maps.Marker({
            map: map,
            position : uluru
        });
    }, function(err) {
        console.log(err);
    }, options);
}

//新的构造器对象
//var map_context_menu=new ContextMenu(map);

//标记聚类
window.markerClusterer = new MarkerClusterer(map, markers, {
    imagePath: '/myroute/libs/images/m'
});

window.infoWindow = new google.maps.InfoWindow;  //窗口提示

//地址搜索控件
window.map_input = /** @type {!HTMLInputElement} */(
    document.getElementById('place_input'));
//地址搜索框点击提交
//地名搜索表单提交
$('#latlng_search').submit(function(e){
    e.preventDefault();  //阻止对表单的提交
    var place_name = $('#latlng_search .latlng_search input.input_addr').val().trim();
    search_latlng(place_name)
    .then(function(latLng){
        var lat_lng = {
            lat :function(){
                return latLng.lat.toFixed(6);
            },
            lng :function(){
                return latLng.lng.toFixed(6);
            }
        }
        map.setCenter(latLng);
        map.setZoom(17);  // Why 17? Because it looks good.
        $('#myModal').modal('show');
        $('#myModal .modal-body input.mark_name').val('');  //清空名称
        //点击模态框的No
        $('#myModal button.cancel').unbind('click');
        $('#myModal button.cancel').bind('click',function(e){
            e.stopPropagation();
            $('#myModal').modal('hide');
        });
        //点击模态框的Yes
        place_name = pinyin(place_name,{
            style:pinyin.STYLE_NORMAL
        }).join('');
        $('#myModal .modal-body input.mark_name').val(place_name);
        $('#myModal button.confirm').unbind('click');
        $('#myModal button.confirm').bind('click',function(e){
            e.stopPropagation();
            var check_input_filename=input_check_fun($('#myModal .modal-body input.mark_name'),1000);
            if(!check_input_filename){  //不满足输入条件
                return;
            }
            $('#myModal').modal('hide');
            var addr_content='<div><strong>' + place_name + '</strong><br>' + place_name+'</div>';
            //新标记
            var ret_data = cal_station_id(company_id,lat_lng,company_markers);
            if(!ret_data){ //如果返回false
                var p_tip=`<p class="add_mark_tip">There is a tag that is too small for this tag.</p>`;
                $('#place_input').after($(p_tip)).siblings('p.add_mark_tip')
                .animate({top:15},1000,function(){
                    setTimeout(function(){
                        $('#google_map_box p.add_mark_tip').remove();
                    },2000);
                });
                return;
            }

            //表示下面开始添加标记
            var station_id = ret_data.station_id;  //站点id
            var marker = new google.maps.Marker({
                map: map,
                addr_content : addr_content,
                station_id:ret_data.station_id,
                origin_station_id : ret_data.station_id,  //初始的station_id
                station_name:place_name,
                draggable:true
            });
            marker.setPosition(ret_data.latLng);
            
            //公司新增站点请求
            window.my_company_stations.add_station_req(marker,place_name,addr_content,ret_data);
            
        });

    },function(msg){
        if(msg =='err'){
            alert("google api service error,plese try again,or this place can't be found.");
        }

    })
});

//刷新聚类标记
window.clearMarkers_clusterer=function(this_markers){
    //清除所有的标记
    if(markerClusterer){  //相当于刷新了标记聚类
        markerClusterer.clearMarkers();
        markerClusterer = new MarkerClusterer(map, this_markers, {
            imagePath: '/myroute/libs/images/m',
            //maxZoom:20,  #最大放大
            //gridSize: size, 
        });
    }
}


//在地图上鼠标右键菜单出现
var marker_station_id;  //标记序列号;  //删除标记的序列号
map.addListener('click',function(e){
    $('#map_menu').fadeOut(1);
});

map.addListener('rightclick',function(e){
    marker_station_id=-1;
    var latLng = e.latLng;  //地理经纬度
    $('#map_menu ul.menu_lists li.add').fadeIn(1);
    $('#map_menu ul.menu_lists li.delete').fadeOut(1);
    map_menu_position(e);  //菜单显示
    menu_click(latLng);
});

//添加标记复用代码
function add_company_mark_repeat(company_id,latLng,company_markers){
    var ret_data = cal_station_id(company_id,latLng,company_markers);
    if(!ret_data){ //如果返回false
        var p_tip=`<p class="add_mark_tip">There is a tag that is too small for this tag.</p>`;
        $('#place_input').after($(p_tip)).siblings('p.add_mark_tip')
        .animate({top:15},1000,function(){
            setTimeout(function(){
                $('#google_map_box p.add_mark_tip').remove();
            },2000);
        });
        return;
    }
    $('#marker_name').fadeIn();  //标记命名显示
    //点击命名确定
    $('#marker_name .my_btn button.confirm').unbind('click');
    $('#marker_name .my_btn button.confirm').bind('click',function(e){
        e.stopPropagation();
        var check_input_filename=input_check_fun($('#marker_name .my_inp input.mark_name'),1000);
        if(!check_input_filename){  //不满足输入条件
            return;
        }
        //满足条件增加标记
        var input_val=$('#marker_name .my_inp input.mark_name').val().trim();
        $('#marker_name').fadeOut().find('input.mark_name').val('');  //标记命名隐藏
        var addr_content='<div><strong>' + input_val + '</strong><br></div>';
        var marker = new google.maps.Marker({
            map:map,
            position:ret_data.latLng,
            addr_content : addr_content,
            station_id:ret_data.station_id,
            origin_station_id : ret_data.station_id,  //初始的station_id
            station_name:input_val,
            draggable:true
        });
        map.setCenter(ret_data.latLng);
        //公司新增站点请求
        window.my_company_stations.add_station_req(marker,input_val,addr_content,ret_data);
    });
}
//地图菜单选项点击事件
function menu_click(latLng){
    //点击菜单选项，添加标记
    $('#map_menu ul li.add').unbind('click');
    $('#map_menu ul li.add').bind('click',function(e){
        e.stopPropagation();
        $('#map_menu').fadeOut(1);
        //添加标记
        add_company_mark_repeat(company_id,latLng,window.company_markers);
    });
    //删除标记
    $('#map_menu ul li.delete').unbind('click');
    $('#map_menu ul li.delete').bind('click',function(e){
        e.stopPropagation();
        $('#map_menu').fadeOut(1);
        if(marker_station_id==-1)
            return;
        $('#myModal_delete').modal('show'); //删除模态框出现
        //点击模态框的确定按钮
        $('#myModal_delete .modal-footer button.confirm').unbind('click');
        $('#myModal_delete .modal-footer button.confirm').bind('click',function(e){
            e.stopPropagation();
            $('#zhezhao').fadeIn(1);
            $('#myModal_delete').modal('hide'); //删除模态框隐藏
            var route_id=parseQueryString(window.location.href).xml_id;

            for(var i=0; i<markers.length; i++){
                if(marker_station_id == markers[i].origin_station_id){
                    var station_id = markers[i].station_id; //站点id
                    $.ajax({
                        url: '/myroute/route_delete_station',
                        type: 'post',
                        async :false,
                        data :{
                            route_id,station_id:marker_station_id
                        },
                        success:function(res){
                            $('#zhezhao').fadeOut(1);
                            if(res.msg=='err' || res.msg=='no'){ //没有这个xml_id或者无session
                                window.location=login_url;
                            }else if(res.msg=='ok'){ 
                                google.maps.event.clearInstanceListeners(markers[i]);//清除该实例的所有监听事件
                                //移除该标记
                                markers[i].setMap(null);
                                markers.splice(i,1);
                                //刷新聚类标记
                                clearMarkers_clusterer(window.markers);
                                //... 左边栏的对应公司站点已选择样式也要删除
                                var $table_body=$('#company_stations tbody tr.company_station');
                                for(var j=0; j<$table_body.length; j++){
                                    var li_station_id=Number($table_body.eq(j).attr('station_id'));
                                    if(marker_station_id==li_station_id){
                                        $table_body.eq(j).removeClass('chosen');  //增加添加过的样式
                                        break;
                                    }
                                }
                                //... 左边栏的对应所选站点也要删除
                                var $choose_stations=$('#chosen_stations ul li.stations_list');
                                for(var j=0; j<$choose_stations.length; j++){
                                    var li_station_id=Number($choose_stations.eq(j).attr('station_id'));
                                    if(li_station_id ==station_id){
                                        $choose_stations.eq(j).remove();
                                        break;
                                    }
                                }
                                draw_line(); //重新画线
                            }
                        },
                        error:function(err){
                            if(err.status==500){
                                alert('server error,please operation later.');
                                window.location.reload();
                            }
                        }
                    });
                    break;
                }
            }
        });
    });
}

//地图菜单选项出现的位置
var map_menu_position=function(e){
    //菜单位置显示
    var top=e.pixel.y;  //顶部距离
    var left=e.pixel.x; //左边距离

    var map_width=$('#google_map').width();   //地图宽度
    var map_height=$('#google_map').height();
    var menu_width=$('#map_menu').width();   //菜单宽度
    var menu_height=$('#map_menu').height();

    if(top > map_height-menu_height){
        top = map_height-menu_height;
    }
    if(left > map_width-menu_width){
        left = map_width-menu_width;
    }
    $('#map_menu').css({top:top,left:left}).fadeIn(1);
    //添加标记
}

//标记的点击和右击事件
window.marker_click=function(marker){
    var map_width=$('#google_map').width();   //地图宽度
    var menu_width=$('#map_menu').width();   //菜单宽度

    marker.addListener('click',function(e){
        var addr_cont=this.addr_content; //地址
        infoWindow.setContent(addr_cont);
        infoWindow.open(map, marker);
    });
    marker.addListener('rightclick',function(e){
        //var position=map_context_menu.getProjection().fromLatLngToDivPixel(e.latLng);
        var position=fromLatLngToPixel(e.latLng,map);
        e.pixel={};
        e.pixel.x=Math.round(position.x);
        e.pixel.y=Math.round(position.y);
        map_menu_position(e); //菜单出现的位置
        $('#map_menu ul.menu_lists li.add').fadeOut(1);
        $('#map_menu ul.menu_lists li.delete').fadeIn(1);
        marker_station_id=this.origin_station_id;
        var latLng=e.latLng;
        menu_click(latLng);
    });
    //刷新聚类标记
    clearMarkers_clusterer(window.markers);
}


module.exports={
    add_company_mark_repeat
}
