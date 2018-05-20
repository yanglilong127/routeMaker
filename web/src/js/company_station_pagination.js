//公司站点分页脚本
import {login_url} from '../configs/setting';
import {parseQueryString} from './functions'; 
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend'; 
import {search_place} from './search_place_name';  //搜索城市名
import {marker_drag_ev,draw_line} from './marker_drag';

var url = parseQueryString(window.location.href);
var route_id = url.xml_id;

/**构造函数
 * nums_limit  每页限制多少数量
 * **/
function Company_station(nums_limit=5){
    this.nums_limit = nums_limit;

    /**获取数据库Company Station数据
     * nums_limit  每页限制多少数量
     * page 从第几页
     * station_name 站点名称
     * **/
    this.get_company_station= function(nums_limit=5,page=1,station_name=''){
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
                    route_id,
                    page:page,
                    nums_limit:nums_limit,
                    station_name:station_name
                },
                success:function(res,status){
                    if(res.msg=='ok'){
                        $('#zhezhao').fadeOut(1);
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
                        var page_num=Math.ceil(stations_num/nums_limit);  //页数
                        $('#pageShow .info_show span.total').text(stations_num);
                        $('#pageShow .info_show span.totalPages').text(page_num);
                        $('#pageShow .info_show span.currPage').text(page);
                        that.createTable(getData);  //创建表格
                        that.split_page(page_num,page);
                        resolve();
                        
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

    //获取公司下所有站点
    this.get_all_stations= function(){
        $('#zhezhao').fadeIn(1);
        $.ajax({   //获取所有的公司占站点
            url: '/myroute/get_company_stations',
            type:'post',
            data:{
                route_id,
                nums_limit:''
            },
            success:function(res){
                $('#zhezhao').fadeOut(1);
                if(res.msg=='ok'){
                    var getData= res.data;
                    for(var i=0; i<getData.length; i++){
                        var addr_content=getData[i].addr_content;
                        var latLng={
                            lat:Number(getData[i].lat),
                            lng:Number(getData[i].lng)
                        };
                        var marker = new google.maps.Marker({
                            //map:map,
                            position:latLng,
                            addr_content : addr_content,
                            station_id:getData[i].station_id,
                            origin_station_id : getData[i].station_id,  //初始的station_id
                            station_name:getData[i].stations_name
                        });
                        window.company_markers.push(marker);
                    }
                }else if(res.msg=='err' || res.msg=='no'){
                    window.location = login_url;  //跳转
                }
            },
            error:function(err){
                if(err.status==500){
                    alert('server error,please try again later.');
                }
            }
        });
    }
    this.get_all_stations();  //获取公司下所有站点

    /**分页码
     * totalPage 表示总页码数
     * currenPage 表示当前页码
     * count  表示显示的个数
     * **/
    this.split_page = function(totalPage,currentPage=1,count=5){
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
    };

    //生成表格数据
    this.createTable= function(getData){
        for(var i=0; i<getData.length; i++){
            var latLng={
                lat:Number(getData[i].lat),
                lng:Number(getData[i].lng)
            };
            var station_id= getData[i].station_id;
            var station_name= getData[i].stations_name;
            var City=  i18next.t('City');
            var tr=`<tr class='company_station' station_id='${station_id}'>
                        <th>${i+1}</th>
                        <td class="station_city">
                            <button class="btn btn-xs btn-primary station_city" data-i18n="${City}">${City}</button>
                        </td>
                        <td class="station_name" title="${station_name}">${station_name}</td>
                        <td class="station_addr">${latLng.lat}/${latLng.lng}</td>
                        <td class="action">
                            <i class="icon route_iconfont route_icon-iconfontadd add"></i>/
                            <i class="icon route_iconfont route_icon-shanchu delete"></i>
                        </td>
                    </tr>`;
            $('#company_stations tbody').append($(tr));
            var tr_length= $('#company_stations tbody tr').length;
            //为其添加已添加过的样式
            for(var j=0; j<window.markers.length; j++){
                let _station_id = window.markers[j].origin_station_id;
                if(station_id == _station_id){
                    $('#company_stations tbody tr').eq(tr_length-1).addClass('chosen');
                    break;
                }
            }
        }
        this.station_operation();
    }.bind(this);

    //表格里的操作按钮
    this.station_operation= function(){
        var that= this;
        //点击City按钮
        $('#company_stations tbody tr.company_station td.station_city button.station_city').unbind('click');
        $('#company_stations tbody tr.company_station td.station_city button.station_city').bind('click',function(e){
            e.stopPropagation();
            //搜索所在城市地名
            var language=$('#navigation .language_setting a span.language').attr('shortname');  //语言
            var latLng= {};
            var this_latLng= $(this).parent().siblings('td.station_addr').text().split('\/');
            latLng.lat= this_latLng[0];  //纬度
            latLng.lng= this_latLng[1];  //经度
            search_place(latLng,language)
            .then(function(detail_addr){
                $('#myModal_show_cityName').modal('show')
                .find('.modal-body').text(detail_addr);
            },function(msg){
                if(msg=='err'){
                    alert('google map api service error.please try again later.');
                }
            });
        });

        //点击Operation的+号按钮
        $('#company_stations tbody tr.company_station td.action i.add').unbind('click');
        $('#company_stations tbody tr.company_station td.action i.add').bind('click',function(e){
            e.stopPropagation();
            var $that= $(this);
            var origin_station_id=Number($(this).parent().parent().attr('station_id'));//原始的station_id
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
                $('#zhezhao').fadeIn(1);
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
                            $that.parent().parent().addClass('chosen');
                            var station_index =$('#chosen_stations ul li.stations_list').length+1; //站点序号
                            if(station_index >999){
                                station_index = 999 + '+';
                            }
                            var city_val = i18next.t('City');
                            var chosen_station=`<li class="stations_list" station_id='${origin_station_id}' ctime='${station_ctime}'>
                                                    <i class="icon route_iconfont route_icon-paixu"></i>
                                                    <span class="station_num">${station_index}.</span>
                                                    <span class="station_name">${station_name}</span>
                                                    <button class="btn btn-sm btn-primary station_city" data-i18n="City">${city_val}</button>
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

        //点击Operation的删除图标按钮
        $('#company_stations tbody tr.company_station td.action i.delete').unbind('click');
        $('#company_stations tbody tr.company_station td.action i.delete').bind('click',function(e){
            e.stopPropagation();
            $('#myModal_delete').modal('show');  //模态框显示
            var _this=$(this);
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
                            url:'/myroute/delete_station',
                            type:'post',
                            data:{station_id,route_id},
                            async:false,
                            success:function(res){
                                if(res.msg=='err' || res.msg=='no'){
                                    window.location.reload();
                                }else if(res.msg=='ok'){
                                    window.company_markers[i].setMap(null);
                                    window.company_markers.splice(i,1);  //数组里标记也要移除
                                    //重新生成表格
                                    var curPage= Number($('#pageShow span.currPage').text()); //当前页码
                                    var table_num=$('#company_stations tbody tr').length;  //当前表格中的条数
                                    if(table_num == 1){ //如果表格条数只有一条
                                        curPage --;
                                    }
                                    that.get_company_station(that.nums_limit, curPage);
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
                draw_line(); //画折线
                $('#zhezhao').fadeOut(1);
            });
        });
    }

    //获取该路线下已添加过的站点
    this.get_route_stations= function(){
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url : '/myroute/get_route_stations',  //获取该路线下添加的站点
            type:'post',
            data:{
                xml_id: route_id
            },
            success:function(res){
                $('#zhezhao').fadeOut(1);
                //console.log(res);
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
                        let station_name=stations_data[i].stations_name;
                        let addr_content=stations_data[i].addr_content;

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
                        var city_val = i18next.t('City');
                        var chosen_station=`<li class="stations_list" station_id='${station_id}' ctime='${ctime}'>
                                                <i class="icon route_iconfont route_icon-paixu"></i>
                                                <span class="station_num">${station_index}.</span>
                                                <span class="station_name">${station_name}</span>
                                                <button class="btn btn-sm btn-primary station_city" data-i18n="City">${city_val}</button>
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
    this.add_station_req= function(marker,station_name,addr_content,ret_data){
        var that = this;
        $.ajax({
            url:'/myroute/add_station',
            type:'post',
            data:{
                xml_id: route_id,
                ctime:new Date().getTime(),
                station_id:ret_data.station_id,
                stations_name:station_name,
                addr_content:addr_content,
                latLng:ret_data.latLng
            },
            success:function(res){
                if(res.msg=='err'){
                    window.location.reload();
                }else if(res.msg=='ok'){
                    company_markers.push(marker);
                    marker_drag_ev(marker,true); //使标记可拖拽
                    //重新生成表格
                    that.get_company_station(); //回到第一页
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
    //点击查看城市按钮
    $('#chosen_stations ul li.stations_list button.station_city').unbind('click');
    $('#chosen_stations ul li.stations_list button.station_city').bind('click',function(e){
        e.stopPropagation();
        var station_id=$(this).parent().attr('station_id');
        var latLng={};  //经纬度
        for(var i=0; i<window.markers.length; i++){
            var _station_id=window.markers[i].station_id;
            if(station_id== _station_id){
                var the_latLng=window.markers[i].position;
                latLng ={
                    lat : Number(the_latLng.lat()).toFixed(6),
                    lng : Number(the_latLng.lng()).toFixed(6),
                }
                break;
            }
        }
        //搜索所在城市地名
        var language=$('#navigation .language_setting a span.language').attr('shortname');  //语言
        search_place(latLng,language)
        .then(function(detail_addr){
            //console.log(detail_addr)
            $('#myModal_show_cityName').modal('show')
            .find('.modal-body').text(detail_addr);
        },function(msg){
            if(msg=='err'){
                alert('google map api service error.')
            }
        });
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
    
    if(send_data.stations.length <2){  //一个以上才需要排序
        return;
    }
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

module.exports= {
    Company_station
}