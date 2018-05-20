//标记拖拽的功能
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import {parseQueryString,cal_station_id} from './functions';
import {login_url} from '../configs/setting.js'; //cloud登录地址

var url_json=parseQueryString(window.location.href);
var company_id=Number(url_json.uid);  //公司id

/**
 * new_company_drag 是否是新增的公司站点拖拽
 * **/
function marker_drag_ev(marker,new_company_drag=false){
    
    var init_latLng;  //拖拽之前初始的经纬度
    var compang_station_index;  //表示在拖动的是第几个
    marker.addListener('dragstart',function(e){
        init_latLng = e.latLng; //将最开始的经纬度位置赋值
        var station_id = this.origin_station_id;
        for(var i=0; i<window.company_markers.length; i++){
            var _origin_station_id = window.company_markers[i].origin_station_id;
            if(station_id == _origin_station_id){
                compang_station_index = i;
                break;
            }
        };
        //滚动条高度
        let td_height=$('#company_stations tbody tr').eq(0).height();
        let scroll_h = td_height * compang_station_index;
        $('#marked_stations .data_box').scrollTop(scroll_h);
        //添加正在拖拽的背景颜色样式
        $('#company_stations tbody tr').eq(compang_station_index).addClass('draggable')
        .siblings().removeClass('draggable');
    });

    marker.addListener('dragend',function(e){
        //清除正在拖拽的背景颜色样式
        $('#company_stations tbody tr').eq(compang_station_index).removeClass('draggable');
        var station_id = this.station_id;  //站点id
        //console.log('初始',station_id)
        var ret_data = cal_station_id(company_id,e.latLng,window.company_markers,station_id);
        if(!ret_data){ //如果返回false
            var p_tip=`<p class="add_mark_tip">There is a tag that is too small for this tag.</p>`;
            $('#place_input').after($(p_tip)).siblings('p.add_mark_tip')
            .animate({top:15},1000,function(){
                setTimeout(function(){
                    $('#google_map_box p.add_mark_tip').remove();
                },2000);
            });
            this.setPosition(init_latLng);   //重新回到之前的位置
        }else{  //可以放下
            this.setPosition(ret_data.latLng);
            this.station_id = ret_data.station_id;
            //console.log('落下',ret_data.latLng)
            //更新markers和company_markers
            //chosen markers
            var $choose_station=$('#chosen_stations ul.stations_lists li.stations_list');
            for(var i=0; i<$choose_station.length; i++){
                let the_chosen_station=$choose_station.eq(i).attr('station_id');
                if(station_id == the_chosen_station){
                    $choose_station.eq(i).attr('station_id',ret_data.station_id);
                    break;
                }
            }
            for(var i=0; i<window.markers.length; i++){
                let _station_id=window.markers[i].station_id;
                if(station_id == _station_id){
                    window.markers[i].station_id = ret_data.station_id;
                    window.markers[i].setPosition(ret_data.latLng);
                    break;
                }
            }
            //更新Company station
            for(var i=0; i<window.company_markers.length; i++){
                let _station_id=window.company_markers[i].station_id;
                if(station_id == _station_id){
                    window.company_markers[i].station_id = ret_data.station_id;
                    window.company_markers[i].setPosition(ret_data.latLng);
                    break;
                }
            }
            draw_line(false);
            //修改公司站点的station_id、经纬度
            if(new_company_drag){ //新增公司的站点，改变其station_id
                $.ajax({
                    url : '/myroute/company_drag_station',
                    type: 'post',
                    data :{
                        origin_station_id :station_id,
                        station_id:ret_data.station_id,
                        latLng : ret_data.latLng
                    },
                    success:function(res){
                        if(res.msg==='err'){
                            window.location.reload();
                        }else if(res.msg==='no'){
                            window.location=login_url;
                        }else if(res.msg=='ok'){
                            var $table_tr=$('#company_stations tbody tr');
                            for(var i=0; i<$table_tr.length; i++){
                                let _station_id=$table_tr.eq(i).attr('station_id');
                                if(station_id == _station_id){
                                    $table_tr.eq(i).attr('station_id',ret_data.station_id);
                                    $table_tr.eq(i).find('td.station_addr')
                                    .text(ret_data.latLng.lat +'\/'+ret_data.latLng.lng)
                                    .attr('title', ret_data.latLng.lat +','+ret_data.latLng.lng);
                                    break;
                                }
                            }
                            for(var i=0; i<window.company_markers.length; i++){
                                let _station_id=window.company_markers[i].station_id;
                                if(ret_data.station_id == _station_id){
                                    window.company_markers[i].origin_station_id = ret_data.station_id;
                                    break;
                                }
                            }
                        }
                    }
                });
            }else{
                var save_val=i18next.t('UnSaved');
                $('.home span.save_tip').removeClass('saved')
                .attr('data-i18n','UnSaved')
                .text(save_val);
            }
        }
    });

    //点击该marker
    marker.addListener('click',function(e){
        var station_id = this.origin_station_id;
        for(var i=0; i<window.company_markers.length; i++){
            var _origin_station_id = window.company_markers[i].origin_station_id;
            if(station_id == _origin_station_id){
                //滚动条高度
                let td_height=$('#company_stations tbody tr').eq(0).height();
                let scroll_h = td_height * i;
                $('#marked_stations .data_box').scrollTop(scroll_h);
                //添加正在拖拽的背景颜色样式
                $('#company_stations tbody tr').eq(i).addClass('draggable')
                .siblings().removeClass('draggable');
                break;
            }
        };
    })

}

var bounds=new google.maps.LatLngBounds();  //缩放对象
var flightPath =new google.maps.Polyline({ //多线段
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
});;  

//所有标记设置最佳视野，并画折线
//参数是否允许缩放
function draw_line(expand=true){
    //按照Choosen Station顺序排列
    var $choose_station=$('#chosen_stations ul.stations_lists li.stations_list');
    for(var i=0; i<$choose_station.length; i++){
        var station_id=Number($choose_station.eq(i).attr('station_id'));
        var station_index =i+1; //站点序号
        if(station_index >999){
            station_index = 999 + '+';
        }
        $choose_station.eq(i).find('span.station_num').text(station_index);
        for(var j=0; j<window.markers.length; j++){
            let li_station_id=Number(window.markers[j].station_id);
            if(li_station_id==station_id){
                let marker=window.markers[j];
                window.markers.splice(j,1);  //删除本身自己的这个
                window.markers.splice(i,0,marker);
                break;
            }
        }
    };
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

    /* if(window.markers.length < 2){ //一个以上标记才缩放
        return;
    } */
    //设置最佳缩放级别
    for (var i=0; i<window.markers.length; i++) {  
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
            window.markers[i].setIcon({
                url:'/myroute/libs/images/middle_station.png'
            });
        }
    }  
    if(expand){
        window.map.fitBounds (bounds);
    }
}


module.exports={
    marker_drag_ev,
    draw_line
}