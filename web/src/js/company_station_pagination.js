//routeMaker页面的脚本
//公司站点分页脚本
import {login_url} from '../configs/setting';
import {parseQueryString,htmlspecialchars,htmlspecialchars_decode,cal_station_id} from './functions';
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend'; 
import {search_place} from './search_place_name';  //搜索城市名
import {marker_drag_ev,draw_line} from './marker_drag';
import {filterTable} from './table_filter';  //对表格进行过滤

var url = parseQueryString(window.location.href);
var route_id = url.xml_id;
var company_id=Number(url.uid);  //公司id

/**构造函数
 * 
 * **/
function Company_station(){
    this.new_marker_stationID;  //新增公司站点所在的站点id

    /**获取数据库Company Station数据
     * 
     * city_name 城市名称，主要是用作设置滚动条位置
     * **/
    this.get_company_station= function(city_name){
        var that = this;
        if(!route_id){
            return;
        }
        $('#zhezhao').fadeIn(1);
        return new Promise(function(resolve,reject){
            $.ajax({
                url: '/myroute/get_company_stations',
                type:'post',
                data:{
                    route_id
                },
                success:function(res,status){
                    if(res.msg=='ok'){
                        $('#company_stations tbody').html(''); //清空表格
                        var getData= res.data;
                        var stations_num= res.dataLen;  //公司站点的总数目
                        if(getData.length===0){
                            $('#company_stations tfoot').fadeIn(1);
                            reject('error');
                            return;
                        }else{
                            $('#company_stations tfoot').fadeOut(1);
                        }
                        $('#search_station_numbers').text(stations_num);
                        that.createTable(getData,city_name);  //创建表格
                        if(that.new_marker_stationID){ //如果是新增站点
                            //排序
                            that.sort_company_markers(getData);
                        }
                        resolve(getData);
                        $('#zhezhao').fadeOut(1);
                        
                    }else if(res.msg=='err' || res.msg=='no'){
                        window.location = login_url;  //跳转
                    }
                }.bind(this),
                error:function(err){
                    if(err.status==500){
                        alert('server error,please try again later.');
                    }
                }
            });
        });
    };

    //添加公司下所有站点数据,push(window.company_markers)
    this.add_all_stations= function(company_stationsData){
        for(var i=0; i<company_stationsData.length; i++){
            var addr_content=company_stationsData[i].addr_content;
            var latLng={
                lat:Number(company_stationsData[i].lat),
                lng:Number(company_stationsData[i].lng)
            };
            var marker = new google.maps.Marker({
                //map:map,
                position:latLng,
                addr_content : htmlspecialchars_decode(addr_content),
                station_id:company_stationsData[i].station_id,
                origin_station_id : company_stationsData[i].station_id,  //初始的station_id
                station_name:company_stationsData[i].stations_name
            });
            window.company_markers.push(marker);
        }
    };

    /**分页码
     * totalPage 表示总页码数
     * currenPage 表示当前页码
     * count  表示显示的个数
     * **/
    /* this.split_page = function(totalPage,currentPage=1,count=5){
        var that = this;
        $('#pageShow .Page').pagination({
            totalPage: totalPage,   // 总页数
            currentPage: currentPage,  // 当前页数
            isShow: true,    // 是否显示首尾页
            count: count,        // 显示个数
            homePageText: 'Start',  // 首页文本
            endPageText: 'End',   // 尾页文本
            prevPageText: "<<",// 上一页文本
            nextPageText: ">>",// 下一页文本
            callback: function(current) {  // 回调,current(当前页数)
                //1. 获取当前页数和总页数
                //var info=$("#pageShow .Page").pagination("getPage");// 获取当前页数和总页数
                //$('#currentPage').text(info.current);
                //$('#totalPage').text(info.total); 
                //重新生成表格
                that.get_company_station(that.nums_limit,current);
            }
        });
        var $page=$('#pageShow .Page .ui-pagination-container a');
        //为每个页码添加data-i18n属性
        for(let i=0; i<$page.length; i++){
            var text=$page.eq(i).text();
            $page.eq(i).attr('data-i18n',text);
            var i18n_text=i18next.t(text);
            $page.eq(i).text(i18n_text);
        }
    }; */

    //生成表格数据
    this.createTable= function(getData,init_city_name){
        $('#marked_stations').scrollTop(0);  //置顶
        $('#company_stations tbody').html(''); //清空
        var scroll_index;
        for(var i=0; i<getData.length; i++){
            var latLng={
                lat:Number(getData[i].lat),
                lng:Number(getData[i].lng)
            };
            var station_id= getData[i].station_id;
            var station_name= getData[i].stations_name;
            var city_name= getData[i].city_name;
            var tr=`<tr class='company_station' station_id='${station_id}'>
                        <td class='index' title="${(i+1)>99? (i+1): ''}">${(i+1)>99 ? '99+': (i+1)}</td>
                        <td class="station_city" title="${city_name}">${city_name}</td>
                        <td class="station_name" title="${station_name}">${station_name}</td>
                        <td class="station_addr" title="${latLng.lat},${latLng.lng}">${latLng.lat}/${latLng.lng}</td>
                        <td class="action">
                            <i class="icon route_iconfont route_icon-iconfontadd add"></i>
                            <!--<i class="icon route_iconfont route_icon-shanchu delete"></i>
                            <i class="icon route_iconfont route_icon-bianji1 edit"></i>-->
                        </td>
                    </tr>`;
            $('#company_stations tbody').append($(tr));
            if(init_city_name == city_name){
                scroll_index = i;
            }
            var tr_length= $('#company_stations tbody tr').length;
            //为其添加已添加过的样式
            for(var j=0; j<window.markers.length; j++){
                let _station_id = window.markers[j].origin_station_id;
                if(station_id == _station_id){
                    $('#company_stations tbody tr').eq(tr_length-1).addClass('chosen')
                    .children('td.action').find('i.add,i.delete').fadeOut(1);  //添加和删除操作隐藏
                    break;
                }
            }
        }
        //展开方式
        var expand_style = Number($('.box1 .home .expand_style ul').attr('index'));  
        if(expand_style == 1){ //需要隐藏position
            $('#company_stations thead tr th.postion').fadeOut(1);
            $('#company_stations tbody tr td.station_addr').fadeOut(1);
        }else{
            $('#company_stations thead tr th.postion').fadeIn(1);
            $('#company_stations tbody tr td.station_addr').fadeIn(1);
        }

        if(scroll_index){
            let td_height=$('#company_stations tbody tr').eq(0).height();
            let scroll_h = td_height * scroll_index;
            $('#marked_stations .data_box').scrollTop(scroll_h);
        }
        this.station_operation();
        //表格搜索过滤
        filterTable();
    }.bind(this);

    //当新增公司站点时，需要对compant_markers进行排序
    this.sort_company_markers=function(getData){
        var marker_index;
        var company_markers_len = getData.length;  //公司站点个数
        for(var i=0; i<getData.length; i++){
            let station_id = getData[i].station_id;
            if(station_id == this.new_marker_stationID){
                marker_index = i;
                break;
            }
        };
        var marker = window.company_markers.splice(company_markers_len-1,1)[0];
        window.company_markers.splice(marker_index,0,marker);
        //触发点击该增加按钮,使之新增加的站点直接加到该路线中
        var $table_tr= $('#company_stations tbody tr');
        for(var i =0; i<$table_tr.length; i++){
            let station_id = $table_tr.eq(i).attr('station_id');
            if(this.new_marker_stationID == station_id){
                $table_tr.eq(i).find('td.action i.add').trigger('click');
                break;
            }
        }
    }

    //表格里的操作按钮
    this.station_operation= function(){
        var that= this;

        //点击Operation的+号按钮
        $('#company_stations tbody tr.company_station td.action i.add').unbind('click');
        $('#company_stations tbody tr.company_station td.action i.add').bind('click',function(e){
            e.stopPropagation();
            var $that= $(this);
            var origin_station_id=Number($(this).parent().parent().attr('station_id'));//原始的station_id
            var city_name = $(this).parent().siblings('td.station_city').text();  //城市名
            city_name = city_name.split(',').length>1 ? city_name.split(',')[1]: city_name;
            var station_id;  
            for(var i=0; i<window.company_markers.length; i++){
                var li_station_id=company_markers[i].origin_station_id;
                if(origin_station_id==li_station_id){
                    station_id = company_markers[i].station_id;
                    break;
                }
            }
            var isAdded= $(this).parent().parent().hasClass('chosen');  //是否已添加过了
            if(isAdded){
                //查找是否已经添加该站点
                var $choose_stations=$('#chosen_stations ul li.stations_list');
                for(var i=0; i<$choose_stations.length; i++){
                    var li_station_id=Number($choose_stations.eq(i).attr('station_id'));
                    if(li_station_id ==station_id){
                        $('#marked_stations p.err_tip').stop(true).fadeIn(1);
                        setTimeout(function(){
                            $('#marked_stations p.err_tip').stop(true).fadeOut(1);
                        },1500);
                        return;
                    }
                }
            }else{
                if(!($('#zhezhao').css('display')== 'block')){ //如果是隐藏的
                    $('#zhezhao').fadeIn(1);
                }
                var station_ctime=new Date().getTime().toString(); //路线新增站点时间
                var station_name=$(this).parent().siblings('td.station_name').text();
                $.ajax({
                    url: '/myroute/route_add_station',
                    type:'post',
                    data:{
                        route_id,
                        station_id:origin_station_id,
                        station_ctime
                    },
                    success:function(res){
                        $('#zhezhao').fadeOut(1);
                        if(res.msg=='err' || res.msg=='no'){
                            window.location=login_url;
                        }else if(res.msg=='ok'){ //没有这个xml_id
                            $that.parent().parent().addClass('chosen');  //添加背景选中颜色
                            $that.parent().find('i.add').fadeOut(1);  //添加和删除操作隐藏
                            var station_index =$('#chosen_stations ul li.stations_list').length+1; //站点序号
                            if(station_index >999){
                                station_index = 999 + '+';
                            }
                            var chosen_station=`<li class="stations_list" station_id='${origin_station_id}' ctime='${station_ctime}'>
                                                    <i class="icon route_iconfont route_icon-paixu"></i>
                                                    <span class="station_num">${station_index}&middot;</span>
                                                    <span class="station_name">${station_name}</span>
                                                    <span class="station_city">${city_name}</span>
                                                    <i class="icon route_iconfont route_icon-shanchu delete"></i>
                                                </li>`;
                            $('#chosen_stations ul').append(chosen_station);
                            for(var i=0; i<window.company_markers.length; i++){
                                var li_station_id=Number(company_markers[i].station_id);
                                if(station_id==li_station_id){
                                    let latLng=company_markers[i].position;
                                    let addr_content=company_markers[i].addr_content;
                                    let station_name=company_markers[i].station_name;
                                    company_markers[i].setMap(null);
                                    let marker = new google.maps.Marker({
                                        map:map,
                                        position:latLng,
                                        addr_content : addr_content,
                                        station_id:origin_station_id,
                                        origin_station_id:origin_station_id,
                                        station_name:station_name,
                                        draggable : true
                                    });
                                    map.setCenter(latLng);  //设置中心点
                                    marker_drag_ev(marker);  //使标记可拖拽
                                    window.markers.push(marker);
                                    window.marker_click(marker);
                                    break;
                                }
                            }
                            
                            draw_line(); //画折线
                            click_station_delete()  //点击选中的删除小图标
                            sortable_chosen_station(route_id);
                        }
                    },
                    error:function(err){
                        if(err.status==500){
                            alert('server error,please operation later.');
                            window.location.reload();
                        }
                    }
                });
            }
        });
    }

    //获取该路线下已添加过的站点
    this.get_route_stations= function(callback){
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url : '/myroute/get_route_stations',  //获取该路线下添加的站点
            type:'post',
            async: false,
            data:{
                xml_id: route_id
            },
            success:function(res){
                $('#zhezhao').fadeOut(1);
                if(res.msg == 'err'){
                    window.location=login_url;
                }else if(res.msg =='ok'){
                    var stations_data=res.data;  //已添加站点数据
                    for(var i=0; i<stations_data.length; i++){
                        let ctime=stations_data[i].ctime;//已选站点的添加时间
                        let station_id=stations_data[i].station_id;
                        let lat=Number(stations_data[i].lat);
                        let lng=Number(stations_data[i].lng);
                        let latLng={
                            lat,
                            lng
                        }
                        let station_name=htmlspecialchars_decode(stations_data[i].stations_name);
                        let addr_content=htmlspecialchars_decode(stations_data[i].addr_content);
                        let city_name=htmlspecialchars_decode(stations_data[i].city_name);
                        city_name = city_name.split(',').length>1 ? city_name.split(',')[1]: city_name;

                        let marker = new google.maps.Marker({
                            //map : map,
                            position : latLng,
                            addr_content : addr_content,
                            station_id : station_id,
                            origin_station_id : station_id,  //初始的station_id
                            station_name : station_name,
                            draggable : true
                        });
                        marker.setMap(map);
                        marker_drag_ev(marker);  //使标记可拖拽
                        window.markers.push(marker);  //添加marker
                        //console.log(markers);
                        window.marker_click(marker);  //标记点点击事件
                        
                        var station_index =i+1; //站点序号
                        if(station_index >999){
                            station_index = 999 + '+';
                        }
                        var chosen_station=`<li class="stations_list" station_id='${station_id}' ctime='${ctime}'>
                                                <i class="icon route_iconfont route_icon-paixu"></i>
                                                <span class="station_num">${station_index}.</span>
                                                <span class="station_name" title='${station_name}'>${station_name}</span>
                                                <span class="station_city" title='${city_name}'>${city_name}</span>
                                                <i class="icon route_iconfont route_icon-shanchu delete"></i>
                                            </li>`;
                        $('#chosen_stations ul').append(chosen_station);
                        var $table_body=$('#company_stations tbody tr.company_station');
                        for(var j=0; j<$table_body.length; j++){
                            var li_station_id=Number($table_body.eq(j).attr('station_id'));
                            if(station_id==li_station_id){
                                $table_body.eq(j).addClass('chosen');  //增加添加过的样式
                                break;
                            }
                        }

                    }
                    draw_line();
                    click_station_delete();
                }
            },
            error:function(err){
                if(err.status==500){
                    alert('server error,please try later.');
                }
            }
        });
    }

    //向后台请求新增公司站点
    this.add_station_req= function(marker,station_name,addr_content,ret_data,city_name){
        $('#zhezhao').fadeIn(1);   
        var that = this;
        $.ajax({
            url:'/myroute/add_station',
            type:'post',
            data:{
                xml_id: route_id,
                ctime:new Date().getTime(),
                station_id:ret_data.station_id,
                stations_name:htmlspecialchars(station_name),
                addr_content:htmlspecialchars(addr_content),
                latLng:ret_data.latLng,
                city_name:htmlspecialchars(city_name)
            },
            success:function(res){
                //$('#zhezhao').fadeOut(1);
                if(res.msg=='err'){
                    window.location.reload();
                }else if(res.msg=='has'){
                    //站点名存在提示信息
                    $('#zhezhao').fadeOut(1);
                    var modify_tip= i18next.t('Station_name_exists');
                    var $err_tip=$('#marker_name .my_inp p.err_tip,#myModal .modal-body p.err_tip');
                    $err_tip.text(modify_tip).stop(true).fadeIn(100);
                    setTimeout(function(){
                        $err_tip.stop(true).slideUp();
                    },2000);
                }else if(res.msg=='ok'){
                    $('#place_input').val('');//清空地名输入框
                    $('#jingweidu_search input.search_place').val('');  //清空经纬度输入框
                    $('#myModal').fadeOut(1).modal('hide');
                    $('#marker_name').fadeOut(1).find('input.mark_name').val('');  //标记命名隐藏
                    company_markers.push(marker);
                    marker.setMap(map);
                    marker_drag_ev(marker,true); //使标记可拖拽
                    //重新生成表格
                    that.get_company_station(city_name); //重新生成表格
                    that.new_marker_stationID= ret_data.station_id;
                }
            },
            error:(err)=>{
                if(err.status==500){
                    alert('server error,please operation later.');
                }  
            }
        });
    }
}

//点击Chosen Station 每个站点的删除图标、查看城市名按钮
function click_station_delete(){
    //点击被选中的站点的删除按钮
    $('#chosen_stations ul li.stations_list i.delete').unbind('click');
    $('#chosen_stations ul li.stations_list i.delete').bind('click',function(e){
        e.stopPropagation();
        var station_id=Number($(this).parent().attr('station_id'));
        var origin_station_id;
        for(var i=0; i<window.markers.length; i++){
            let _origin_station_id = markers[i].origin_station_id;
            let _station_id = markers[i].station_id;
            if(station_id == _station_id){
                origin_station_id = _origin_station_id;
                break;
            }
        }
        var _this=$(this);
        $('#myModal_delete').modal('show'); //删除模态框出现
        //点击模态框的确定按钮
        $('#myModal_delete .modal-footer button.confirm').unbind('click');
        $('#myModal_delete .modal-footer button.confirm').bind('click',function(e){
            e.stopPropagation();
            $('#zhezhao').fadeIn(1);
            $('#myModal_delete').modal('hide'); //删除模态框隐藏
            var route_id=parseQueryString(window.location.href).xml_id;
            $.ajax({
                url: '/myroute/route_delete_station',
                type: 'post',
                data :{
                    route_id,station_id:origin_station_id
                },
                success:function(res){
                    $('#zhezhao').fadeOut(1);
                    if(res.msg=='err' || res.msg=='no'){ //没有这个xml_id或者无session
                        window.location=login_url;
                    }else if(res.msg=='ok'){ 
                        //从markers中删除
                        for(var i=0; i<window.markers.length; i++){
                            var li_station_id=Number(window.markers[i].station_id);
                            if(station_id==li_station_id){
                                google.maps.event.clearInstanceListeners(markers[i]);//清除该实例的所有监听事件
                                window.markers.splice(i,1);
                                clearMarkers_clusterer(window.markers);
                                break;
                            }
                        }
                        //删除公司选中站点的样式
                        var $table_body=$('#company_stations tbody tr.company_station');
                        for(var j=0; j<$table_body.length; j++){
                            var li_station_id=Number($table_body.eq(j).attr('station_id'));
                            if(origin_station_id==li_station_id){
                                $table_body.eq(j).removeClass('chosen');  //增加添加过的样式
                                $table_body.eq(j).find('td.action i').fadeIn(1);  //增加添加过的样式
                                break;
                            }
                        }
                        _this.parent().remove();
                        draw_line(); //画折线
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
    });

    //点击该站点这一列,使之位于地图中心点
    $('#chosen_stations ul li.stations_list').unbind('click');
    $('#chosen_stations ul li.stations_list').bind('click',function(e){
        e.stopPropagation();
        window.map.setZoom(17);
        var station_id = $(this).attr('station_id');
        for(var i=0; i<window.markers.length; i++){
            let _station_id = window.markers[i].station_id;
            if(station_id == _station_id){
                var position = window.markers[i].getPosition();
                window.map.setCenter(position);
                break;
            }
        }
    });
}

//对Chosen Stations数据库排序
function sortable_chosen_station(xml_id){
    //按照Choosen Station顺序排列
    var send_data={  //发送的数据
        route_id : xml_id,
        stations: []
    }
    var $choose_station=$('#chosen_stations ul.stations_lists li.stations_list');
    /* for(var i=0; i<$choose_station.length; i++){
        var station_id=Number($choose_station.eq(i).attr('station_id'));
        var station_ctime=Number($choose_station.eq(i).attr('ctime'));
        for(var j=0; j<window.markers.length; j++){
            let origin_station_id=window.markers[j].origin_station_id;
            let _station_id = window.markers[j].station_id;
            if(station_id== _station_id){
                station_id = origin_station_id;
                break;
            }
        }
        let temp_obj={
            station_id,
            ctime:station_ctime
        }
        send_data.stations.push(temp_obj);
    }; */
    for(var i=0; i<window.markers.length; i++){
        let origin_station_id=window.markers[i].origin_station_id;
        let station_ctime= Number($choose_station.eq(i).attr('ctime'));
        
        let temp_obj={
            station_id: origin_station_id,
            ctime:station_ctime
        }
        send_data.stations.push(temp_obj);
    }
    
    /* if(send_data.stations.length <2){  //一个以上才需要排序
        return;
    } */
    $('#zhezhao').fadeIn(1);
    //请求更新排序
    $.ajax({
        url: '/myroute/sortable_station',
        type : 'post',
        data:{
            send_data
        },
        success:function(res){
            $('#zhezhao').fadeOut(1);
            if(res.msg=='err' || res.msg=='no' ){
                window.location=login_url;
            }else if(res.msg=='ok'){
                draw_line(); 
            }
        },
        error:function(err){
            if(err.status==500){
                alert('server error,please try later.');
                window.location.reload();
            }
        }
    });
}


//对输入的经纬数据进行检测
function cheek_input_latlng(element){
    var input_val=element.find('input.lat_lng').val().trim();
    var err_tip=i18next.t('search_place');  //错误的提示语翻译
    var $err_tip=element.find('p.err_tip');
    input_val=input_val.split(',');  //分成数组
    if(input_val.length !=2 ){
        return false;
    }else{
        var latitude=input_val[0].trim();  //纬度
        var longitude=input_val[1].trim();  //经度
        if(isNaN(latitude) || (latitude=='') || isNaN(longitude) || (longitude=='') ){  //只要其中有一个不是数值
            return false;
        }else{  //都是数值类型
            latitude=Number(latitude);
            longitude=Number(longitude);
            //判断值的范围
            if(latitude>90 || latitude<-90 || longitude>180 || longitude<-180){
                return false;
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
    return latLng;
}

module.exports= {
    Company_station,
    click_station_delete
}