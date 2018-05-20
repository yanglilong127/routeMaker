//company_station页面的脚本
//公司站点分页脚本
import {login_url} from '../configs/setting';
import {parseQueryString,htmlspecialchars,htmlspecialchars_decode,cal_station_id} from './functions';
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend'; 
import {search_place} from './search_place_name';  //搜索城市名
import {filterTable,Used_stations_filter} from './table_filter';  //对表格进行过滤

var url = parseQueryString(window.location.href);
var company_id=Number(url.uid);  //公司id

/**构造函数
 * 
 * **/
function Company_station(){
    this.new_marker_stationID;  //新增公司站点所在的站点id

    /**获取数据库Company Station数据
     * 
     * city_name 城市名称，主要是用作设置滚动条位置
     * deleteOpera 删除操作，用于删除后提示
     * **/
    this.get_company_station= function(city_name, deleteOpera=false){
        var that = this;
        $('#zhezhao').fadeIn(1);
        return new Promise(function(resolve,reject){
            $.ajax({
                url: '/myroute/get_company_stations_manage',
                type:'post',
                data:{},
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
                        that.createTable(getData,city_name,deleteOpera);  //创建表格
                        if(that.new_marker_stationID){ //如果是新增站点
                            //排序
                            that.sort_company_markers(getData);
                        }
                        resolve(getData);
                        //$('#zhezhao').fadeOut(1);不必添加，添加完后后触发点击事件的
                        
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
                station_name:company_stationsData[i].stations_name,
                draggable:true
            });
            window.company_markers.push(marker);
            marker_drag_ev(marker); //使标记可拖拽
        };
        //get_well_view();
    };

    //生成表格数据
    /**参数1 为获取的站点数据
     * 参数2 为添加站点时的名称，用于判断滚动高度
     * 参数3 是否为删除后的操作 bool型**/
    this.createTable= function(getData,init_city_name,deleteOpera){
        $('#zhezhao').fadeIn(1);
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
                        <td class='index' title="${(i+1)>999? (i+1): ''}">${(i+1)>999? '999+': (i+1)}</td>
                        <td class="station_city" title="${city_name}">${city_name}</td>
                        <td class="station_name" title="${station_name}">${station_name}</td>
                        <td class="station_addr" title="${latLng.lat},${latLng.lng}">${latLng.lat}/${latLng.lng}</td>
                        <td class="action">
                            <i class="icon route_iconfont route_icon-shanchu delete"></i>
                            <i class="icon route_iconfont route_icon-bianji1 edit"></i>
                        </td>
                    </tr>`;
            $('#company_stations tbody').append($(tr));
            if(this.new_marker_stationID == station_id){
                scroll_index = i;
            }
            var tr_length= $('#company_stations tbody tr').length;
            //为其添加已添加过的样式
            for(var j=0; j<window.markers.length; j++){
                let _station_id = window.markers[j].origin_station_id;
                if(station_id == _station_id){
                    $('#company_stations tbody tr').eq(tr_length-1).addClass('chosen')
                    .children('td.action').find('i.delete').fadeOut(1);  //添加和删除操作隐藏
                    break;
                }
            }
        }
        if(scroll_index){
            let td_height=$('#company_stations tbody tr').eq(0).height();
            let scroll_h = td_height * scroll_index;
            $('#marked_stations .data_box').scrollTop(scroll_h);
        }
        var index_xuanzhong = scroll_index ? scroll_index: 0;
        $('#company_stations tbody tr').eq(index_xuanzhong).addClass('chosen')
        .siblings().removeClass('chosen');
        var time0 = setInterval(function(){
            if(window.company_markers[index_xuanzhong]){
                map.setZoom(17);
                map.setCenter(window.company_markers[index_xuanzhong].getPosition());
                clearInterval(time0);
                //点击该条数据
                $('#company_stations tbody tr.company_station').eq(index_xuanzhong).trigger('click',deleteOpera);
            }
        },1000);
        

        this.station_operation();
        //表格搜索过滤
        filterTable();
    }.bind(this);

    //当新增公司站点时，需要对company_markers进行排序
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
    }

    //表格里的操作按钮
    this.station_operation= function(){
        var that= this;

        //点击Operation的删除图标按钮
        $('#company_stations tbody tr.company_station td.action i.delete').unbind('click');
        $('#company_stations tbody tr.company_station td.action i.delete').bind('click',function(e){
            e.stopPropagation();
            var station_id = $(this).parent().parent().attr('station_id'); //station_id
            var _this=$(this);
            var chosen_marker_index = Number($(this).parent().siblings('td.index').text());  //系列号
            $('#company_stations tbody tr.company_station').eq(chosen_marker_index-1).trigger('click');
            $.ajax({
                url:'/myroute/company_manage_used_for',
                type:'post',
                data:{
                    station_id: station_id,
                },
                success:function(res){
                    if(res.msg=='err'){
                        window.location.reload();
                    }else if(res.msg=='ok'){
                        var used_data = res.used_data;
                        var dataLen = used_data.length; //数据条数
                        $('#myModal_delete').modal('show');  //模态框显示
                        if(dataLen){
                            var used_tip = i18next.t('station_id_used');
                            $('#myModal_delete .modal-body').text(used_tip);  //模态框显示
                        }else{
                            $('#myModal_delete .modal-body').text('', true);  //模态框显示
                        };

                    }
                },
                error:(err)=>{
                    if(err.status==500){
                        alert('server error,please operation later.');
                    }  
                }
            });
            //点击模态框的确定按钮
            $('#myModal_delete .modal-footer button.confirm').unbind('click');
            $('#myModal_delete .modal-footer button.confirm').bind('click',function(e){
                e.stopPropagation();
                $('#myModal_delete').modal('hide');
                var markers_len=window.company_markers.length;  //标记的个数
                var station_id=Number(_this.parent().parent().attr('station_id'));
                var now_station_id; //现在的id
                $('#zhezhao').fadeIn(1);
                for(var i=0; i<markers_len; i++){  //删除公司里的
                    if(station_id == Number(window.company_markers[i].origin_station_id)){
                        //请求删除公司站点
                        $.ajax({
                            url:'/myroute/company_delete_station',
                            type:'post',
                            data:{station_id},
                            async:false,
                            success:function(res){
                                $('#zhezhao').fadeOut(1);
                                if(res.msg=='err' || res.msg=='no'){
                                    window.location.reload();
                                }else if(res.msg=='ok'){
                                    //删除成功提示
                                    /* var text_tip = i18next.t('Delete_success');
                                    $('#save_success').fadeIn(1).find('p.save_tip').text(text_tip);
                                    setTimeout(function(){
                                        $('#save_success').fadeOut(1);
                                    },2000); */
                                    window.company_markers[i].setMap(null);
                                    window.company_markers.splice(i,1);  //数组里标记也要移除
                                    //重新生成表格
                                    /* var curPage= Number($('#pageShow span.currPage').text()); //当前页码
                                    var table_num=$('#company_stations tbody tr').length;  //当前表格中的条数
                                    if(table_num == 1){ //如果表格条数只有一条
                                        curPage --;
                                    }
                                    that.get_company_station(that.nums_limit, curPage, true); //重新获取数据 */
                                    that.get_company_station('', true); //重新获取数据
                                }
                            },
                            error:function(err){
                                if(err.status==500){
                                    alert('server error,please operation later.');
                                }
                            }
                        });
                        break;
                    }
                }
                //从markers中删除 
                var $chosen_stations=$('#chosen_stations ul li.stations_list');
                for(var i=0; i<window.markers.length; i++){
                    var li_station_id=Number(window.markers[i].origin_station_id);
                    if(station_id==li_station_id){
                        window.markers.splice(i,1);
                        clearMarkers_clusterer(window.markers);
                        //删除已添加的Chosen Station
                        $chosen_stations.eq(i).remove();  //删除左边的
                        break;
                    }
                }
                $('#zhezhao').fadeOut(1);
            });
        });

        //点击Operation的编辑按钮
        $('#company_stations tbody tr.company_station td.action i.edit').unbind('click');
        $('#company_stations tbody tr.company_station td.action i.edit').bind('click',function(e){
            e.stopPropagation();
            var $this = $(this);
            var station_id = $(this).parent().parent().attr('station_id'); //station_id
            var lat_lng = $(this).parent().siblings('td.station_addr').attr('title');  //经纬度
            var station_name = $(this).parent().siblings('td.station_name').text();  //站点名
            var chosen_marker_index = Number($(this).parent().siblings('td.index').text());  //系列号
            $('#company_stations tbody tr.company_station').eq(chosen_marker_index-1).trigger('click');
            $('#edit_company_stations').modal('show')  //站点编辑框显示
            .find('.modal-body input.station_name').val(station_name)
            .siblings('input.lat_lng').val(lat_lng);
            //公司的marker序号
            var company_index= Number($this.parent().siblings('td.index').text()) -1;
            var marker_position=window.company_markers[company_index].getPosition();
            //将地图中心移到此处
            window.map.setCenter(marker_position);
            //模态框点击确定按钮
            $('#edit_company_stations .modal-footer button.confirm').unbind('click');
            $('#edit_company_stations .modal-footer button.confirm').bind('click',function(e){
                e.stopPropagation();
                var $input_latlng=$('#edit_company_stations .modal-body input.lat_lng');  //输入经纬度
                var $input_name=$('#edit_company_stations .modal-body input.station_name');  //输入站点名称框
                var new_station_name=$input_name.val().trim();
                var new_latlng=$input_latlng.val().trim();
                if(!new_station_name){ //如果为空
                    $input_name.focus();
                    return;
                }
                if(!new_latlng){ //如果为空
                    $input_latlng.focus();
                    return;
                }
                //返回 输入框的经纬度
                var ret_latlng = cheek_input_latlng($('#edit_company_stations .modal-body'));
                if(ret_latlng){
                    if((new_latlng!=lat_lng) || (new_station_name!=station_name)){
                        var ret_data= cal_station_id(company_id,ret_latlng,window.company_markers,station_id);
                        if(!ret_data){ //如果返回false
                            var p_tip=`<p class="add_mark_tip">There is a marker that is too small distance for this marker.</p>`;
                            $('#edit_company_stations .modal-body')
                            .append($(p_tip)).find('p.add_mark_tip')
                            .fadeIn(1,function(){
                                setTimeout(function(){
                                    $('#edit_company_stations .modal-body p.add_mark_tip').remove();
                                },2000);
                            });
                            return;
                        }
                        $('#zhezhao').fadeIn(1);
                        //更改数据
                        $.ajax({
                            url:'/myroute/company_change_station_info',
                            type:'post',
                            data:{
                                origin_station_id:station_id,
                                station_id: ret_data.station_id,
                                latLng:ret_data.latLng,
                                station_name: htmlspecialchars(new_station_name)
                            },
                            success:function(res){
                                $('#zhezhao').fadeOut(1)
                                if(res.msg=='err'){
                                    window.location.reload();
                                }else if(res.msg=='has'){
                                    //站点名存在提示信息
                                    var modify_tip= i18next.t('Station_name_exists');
                                    var $err_tip=$('#edit_company_stations .modal-body p.err_tip');
                                    $err_tip.text(modify_tip).stop(true).fadeIn(100);
                                    setTimeout(function(){
                                        $err_tip.stop(true).slideUp();
                                    },2000);
                                }else if(res.msg=='ok'){
                                    //修该成功提示信息
                                    var modify_tip= i18next.t('Modify_success');
                                    var $err_tip=$('#edit_company_stations .modal-body p.err_tip');
                                    $err_tip.html(modify_tip).stop(true).fadeIn(100);
                                    setTimeout(function(){
                                        $err_tip.stop(true).fadeOut();
                                        $('#edit_company_stations').modal('hide');
                                    },2000);
                                    
                                    //更新所有更改过的名称和position地址
                                    //Company station更新
                                    $this.parent().siblings('td.station_name')
                                    .text(new_station_name).attr('title',new_station_name)
                                    .siblings('td.station_addr')
                                    .text(ret_data.latLng.lat+'\/'+ret_data.latLng.lng)
                                    .attr('title',ret_data.latLng.lat+','+ret_data.latLng.lng)
                                    .parent().attr('station_id',ret_data.station_id);
                                    //修改其坐标和站点名
                                    var this_marker = window.company_markers[company_index];
                                    this_marker.station_id = ret_data.station_id;
                                    this_marker.origin_station_id = ret_data.station_id;
                                    this_marker.station_name = new_station_name;
                                    var new_position = {
                                        lat : ret_data.latLng.lat,
                                        lng : ret_data.latLng.lng
                                    };
                                    this_marker.posiotion = new_position;

                                    //更改Chosen station
                                    var isChosen = $this.parent().parent().hasClass('chosen');  //是否添加进路线
                                    if(!isChosen){  //没有选中则返回
                                        return;
                                    }
                                    var $chosen_stations=$('#chosen_stations ul li.stations_list');
                                    var this_chosenMarker = window.company_markers[chosen_marker_index-1];
                                    this_chosenMarker.station_id = ret_data.station_id;
                                    this_chosenMarker.origin_station_id = ret_data.station_id;
                                    this_chosenMarker.station_name = new_station_name;
                                    this_chosenMarker.setPosition(new_position);
                                    window.map.setCenter(new_position);
                                }
                            },
                            error:(err)=>{
                                if(err.status==500){
                                    alert('server error,please operation later.');
                                }  
                            }
                        });
                    }else{
                        $('#edit_company_stations').modal('hide'); //隐藏模态框
                    }
                }else{
                    var err_tip=i18next.t('search_place');  //错误的提示语翻译
                    var $err_tip=$('#edit_company_stations .modal-body p.err_tip');
                    $err_tip.html(err_tip).stop(true).fadeIn(100);
                    setTimeout(function(){
                        $err_tip.stop(true).fadeOut();
                    },5000);
                }
            });
        });

        //点击查看使用情况按钮
        /* $('#company_stations tbody tr.company_station td.use_situation i.detail').unbind('click');
        $('#company_stations tbody tr.company_station td.use_situation i.detail').bind('click',function(e){
            e.stopPropagation();
            var $this = $(this);
            var station_id = $(this).parent().parent().attr('station_id'); //station_id
            $('#myModal_usedfor').modal('show');
            $('#zhezhao').fadeIn(1);
            $.ajax({
                url:'/myroute/company_manage_used_for',
                type:'post',
                data:{
                    station_id: station_id,
                },
                success:function(res){
                    $('#zhezhao').fadeOut(1);
                    if(res.msg=='err'){
                        window.location.reload();
                    }else if(res.msg=='ok'){
                        var used_data = res.used_data;
                        var dataLen = used_data.length; //数据条数
                        $('#myModal_usedfor .modal-body .nums span.numbers').text(dataLen);
                        if(dataLen){
                            $('#stations_used_table tfoot').fadeOut(1);
                        }else{
                            $('#stations_used_table tfoot').fadeIn(1);
                        };
                        //显示数据
                        $('#stations_used_table tbody').html('');//清空
                        for(var i=0; i<dataLen; i++){
                            var tr = `<tr>
                                        <td>${i+1}</td>
                                        <td>${used_data[i].filename}</td>
                                    </tr>
                                    `;
                            $('#stations_used_table tbody').append($(tr));
                        }
                    }
                },
                error:(err)=>{
                    if(err.status==500){
                        alert('server error,please operation later.');
                    }  
                }
            });
        }); */

        //点击该站点这一列,使之位于地图中心点
        $('#company_stations tbody tr.company_station').unbind('click');
        //deleteOpera是否是删除操作后自动触发的
        $('#company_stations tbody tr.company_station').bind('click',function(e,deleteOpera){
            e.stopPropagation();
            $(this).addClass('chosen').siblings().removeClass('chosen');
            window.map.setZoom(17);
            var station_id = $(this).attr('station_id');
            for(var i=0; i<window.company_markers.length; i++){
                let _station_id = window.company_markers[i].station_id;
                if(station_id == _station_id){
                    var position = window.company_markers[i].getPosition();
                    window.map.setCenter(position);
                    window.company_markers[i].setMap(window.map);
                    //break;
                }else{
                    window.company_markers[i].setMap(null);
                }
            }
            //获取该站点被路线使用的情况
            $('#company_used_stations tbody').html(''); //清空
            if(!($('#zhezhao').css('display')== 'block')){ //如果是隐藏的
                $('#zhezhao').fadeIn(1);
            }
            $.ajax({
                url:'/myroute/company_manage_used_for',
                type:'post',
                data:{
                    station_id: station_id,
                },
                success:function(res){
                    $('#zhezhao').fadeOut(1);
                    if(res.msg=='err'){
                        window.location.reload();
                    }else if(res.msg=='ok'){
                        var used_data = res.used_data;
                        var dataLen = used_data.length; //数据条数
                        $('#search_route_numbers').text(dataLen);
                        if(dataLen){
                            $('#company_used_stations tfoot').fadeOut(1);
                        }else{
                            $('#company_used_stations tfoot').fadeIn(1);
                        };
                        //显示数据
                        $('#stations_used_table tbody').html('');//清空
                        var url = window.location.href.replace('companyStation.html','routeMaker.html');
                        for(var i=0; i<dataLen; i++){
                            var jump_url = url + '&xml_id='+used_data[i].ctime+'&route_name='+used_data[i].filename;
                            var tr = `<tr>
                                        <td title='${i+1}'>${(i+1)>99? '99+': (i+1)}</td>
                                        <td class='route_name' title='${used_data[i].filename}'>${used_data[i].filename}</td>
                                        <td class='edit'><a href='${jump_url}'>
                                            <i class="icon route_iconfont route_icon-bianji edit"></i>
                                        </a></td>
                                    </tr>
                                    `;
                            $('#company_used_stations tbody').append($(tr));
                        }
                        //生成表格之后可以搜索filter
                        Used_stations_filter();
                        //console.log('删除',deleteOpera)
                        if(deleteOpera){
                            //删除成功提示
                            var text_tip = i18next.t('Delete_success');
                            $('#save_success').fadeIn(1).find('p.save_tip').text(text_tip);
                            setTimeout(function(){
                                $('#save_success').fadeOut(1);
                            },2000);
                        }
                    }
                },
                error:(err)=>{
                    if(err.status==500){
                        alert('server error,please operation later.');
                    }  
                }
            });
        });
    }

    //向后台请求新增公司站点
    this.add_station_req= function(marker,station_name,addr_content,ret_data,city_name){
        $('#zhezhao').fadeIn(1);   
        var that = this;
        $.ajax({
            url:'/myroute/company_add_station',
            type:'post',
            data:{
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
                    //marker.setMap(map);
                    marker_drag_ev(marker); //使标记可拖拽
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

//使标记在合理的可是区域内
var bounds=new google.maps.LatLngBounds();  //缩放对象
function get_well_view(){
    for (var i=0; i<window.company_markers.length; i++) {  
        bounds.extend (window.company_markers[i].getPosition()); 
    }
    window.map.fitBounds (bounds);
    window.clearMarkers_clusterer(window.company_markers); //标记聚合
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

function marker_drag_ev(marker){ 
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
        $('#marked_stations').scrollTop(scroll_h);
        //添加正在拖拽的背景颜色样式
        $('#company_stations tbody tr').eq(compang_station_index).addClass('draggable');
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
            //更新Company station
            for(var i=0; i<window.company_markers.length; i++){
                let _station_id=window.company_markers[i].station_id;
                if(station_id == _station_id){
                    window.company_markers[i].station_id = ret_data.station_id;
                    window.company_markers[i].setPosition(ret_data.latLng);
                    break;
                }
            }
            //修改公司站点的station_id、经纬度
            $.ajax({
                url : '/myroute/company_manage_drag_station',
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
        }
    });
}

module.exports= {
    Company_station
}