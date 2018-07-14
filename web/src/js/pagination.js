//分页使用
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import {byte2,htmlspecialchars} from './functions';  //字节转换
import {server_ip,login_url} from '../configs/setting';
import {forMatDate,parseQueryString} from './functions';  //时间格式转换

/**获取数据库xml数据
 * page 从第几页
 * nums_limit  每页限制多少数量
 * first_load  是否是第一次请求，第一次请求会返回磁盘信息
 * filename xml文件名
 * **/
var getDataTable=function(page=1,nums_limit=10,first_load=true,filename=''){
    $('#zhezhao').fadeIn(1);
    $.ajax({
        url: '/myroute/get_xml_data',
        type:'post',
        data:{
            page:page,
            nums_limit:nums_limit,
            first_load:first_load,
            filename
        },
        success:function(res,status){
            if(res.msg=='ok'){
                $('#zhezhao').fadeOut(1);
                var dataLen=res.dataLen;  //总条数
                var data=res.ret_data;  //返回的数据
                var dataSize=res.dataSize;  //用户已用空间
                var disk_space=res.disk_space;  //总磁盘空间

                var page_num=Math.ceil(dataLen/nums_limit);  //页数
                //初始化显示部分
                init_show(dataSize,disk_space,dataLen,page,first_load);
                create_list(data);
                //分页
                split_page(page_num,page);
                
            }else if(res.msg=='err'){
                if(first_load){
                    window.location.reload();  //重载
                }else{
                    window.location.reload();  //重载
                }
            }
        }
    });
};

/**分页码
 * totalPage 表示总页码数
 * currenPage 表示当前页码
 * count  表示显示的个数
 * **/
var split_page=function(totalPage,currentPage=1,count=5){
    $('#pageShow .Page').pagination({
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
            var show_num=$('#getData p.info_tip select.showpage').val();
            getDataTable(current,show_num);
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
}

//生成表格数据
var create_list=function(data){
    var url=window.location.href.replace('index.html','html/routeMaker.html');
    $('#getDataTable table tbody').html('');  //清空表格
    for(var i=0; i<data.length; i++){
        var ctime=forMatDate(new Date(Number(data[i].ctime)));
        var mtime=forMatDate(new Date(Number(data[i].mtime)));
        var xml_addr = data[i].xml_addr;  //xml的下载地址
        //编辑页面跳转地址
        var edit_url=url+'&xml_id='+data[i].ctime+ '&route_name='+data[i].filename;
        var xuanzhong='';
        if(window.all_routes.indexOf(data[i].ctime)!=-1){
            xuanzhong='route_icon-xuanzhong';
        }
        var added_languages=data[i].languages;  //该路线添加的语言
        var added_languages_arrs= added_languages.split(','); //将其转为数组
        added_languages_arrs = added_languages_arrs.join(' ');
        var routes=data[i].routes.split(',');
        var border_box='',edit='',clone='',route_drive='';
        var merge_class='';  //合并路线的背景颜色
        if(routes[1]){  //是合并的
            merge_class = 'merge';
            edit= `<a class='edit'>
                        <span class='num'>${data[i].station_num}</span>
                    </a>`;
        }else{
            border_box=`<div class="border_box_check">
                            <!--<i class="icon route_iconfont route_icon-xuanzhong"></i>-->
                            <i class="icon route_iconfont choose ${xuanzhong}"></i>
                        </div>`;
            edit= `<a class='edit jump' href='${edit_url}'>
                        <span class='num'>${data[i].station_num}</span>
                        <span class='edit'>+</span>
                    </a>`;
            clone = `<i class="icon route_iconfont route_icon-clone clone"></i>`;
            route_drive=`<i class="icon route_iconfont route_icon-zidongjiashi sim_drive"></i>`;
        }
        var action_xiazai;
        if(xml_addr){  //如果下载地址有
            xml_addr += '.xml';
            var download_filename = xml_addr.split('\/')[xml_addr.split('\/').length-1];
            var time1 = download_filename.slice(download_filename.lastIndexOf('_')+1,download_filename.lastIndexOf('.'));
            var time2 = forMatDate(new Date(Number(data[i].mtime)),false);
            if(time1 == time2){
                action_xiazai = `<a class='xiazai' href='${xml_addr}' download='${download_filename}'>
                        <i class="icon route_iconfont route_icon-comiisxiazai download"></i>
                        <span class='need_update'>*</span>
                    </a>`;
            }else{
                action_xiazai = `<a class='xiazai' href='${xml_addr}' download='${download_filename}'>
                        <i class="icon route_iconfont route_icon-comiisxiazai download"></i>
                        <span class='need_update fadein'>*</span>
                    </a>`;
            } 
            
        }else{
            action_xiazai = `<a class='xiazai'>
                        <i class="icon route_iconfont route_icon-comiisxiazai noclick download"></i>
                        <span class='need_update'>*</span>
                    </a>`;
        }
        var li_list=`<tr xml_id='${data[i].ctime}' class='${merge_class}'>
                        <th class='index'>${i+1}</th>
                        <th class='click_choose'>
                            ${border_box}
                        </th>
                        <th class='filename'>
                            <span>${data[i].filename}</span>
                            <button class="btn btn-primary btn-xs rename">
                                <i class="icon route_iconfont route_icon-ziti"></i>
                            </button>
                        </th>
                        <th class='description'>
                            <span class='text'>${data[i].description}</span>
                            <button class="btn btn-primary btn-xs detail">
                                <i class="icon route_iconfont route_icon-xiangqing"></i>
                            </button>
                        </th>
                        <th class='station_num'>
                            ${edit}
                        </th>
                        <th class='language_num'>
                            <span class='language_list' data-toggle="tooltip" data-placement="top"
                                 title="${added_languages_arrs}">${added_languages}</span>
                            <span class='info'>+</span>
                        </th>
                        <th class='ctime'>${ctime}</th>
                        <th class='mtime'>${mtime}</th>
                        <th class='action'>
                            ${clone}
                            ${route_drive}
                            ${action_xiazai}
                            <i class="icon route_iconfont route_icon-shanchu delete"></i>
                        </th>
                    </tr>`;
        $('#getDataTable table tbody').append($(li_list));
        //为其添加提示工具
        $('[data-toggle="tooltip"]').tooltip();
        delt_event();  //处理表格点击事件
    }
}

//磁盘信息数据更改，页码更改
/**
 * used_space传过来的数据单位是字节 用户已用空间
 * total_space传过来的数据单位是MB，  用户分配的空间大小
 * **/
var init_show=function(used_space,total_space,total_num,page,first_load){
    if(first_load){
        var rate=parseInt(used_space*10/total_space)/10;  //比例
        $('#heading_contain .heading_cipan .progress-bar').css({width:rate+'%'}); 
        var used_space=byte2(used_space);
        var total_space=byte2(total_space*1024*1024);
        $('#heading_contain .heading_cipan .number_info span.number1').text(used_space);
        $('#heading_contain .heading_cipan .number_info span.number2').text(total_space);
    }
    var show_num = Number($('#getData .showpage').val()); //每页显示的数量
    var page_num=Math.ceil(total_num/show_num);  //页数

    var fromNum = total_num>0? show_num * (page -1) + 1 : 0;  //起始条数
    var toNum;  //终止条数
    if(page < page_num){
        toNum = fromNum + show_num -1;
    }else{
        toNum = total_num;
    }
    $('#pageShow .info_show span.from_num').text(fromNum);
    $('#pageShow .info_show span.to_num').text(toNum);
    $('#pageShow .info_show span.total').text(total_num);
    if(total_num>0){
        $('#getDataTable table tfoot').fadeOut(1);  //隐藏表格脚步
    }else{
        $('#getDataTable table tfoot').fadeIn(1);  //隐藏表格脚步
    }
}

//处理表格的点击事件
var delt_event=function(){
    //处理路线下拉
    function deal_language_route(){
        //点击路线的下拉按钮
        $('#choose_stations_box ul.routes li.route_box .top_ i.xiala').unbind('click');
        $('#choose_stations_box ul.routes li.route_box .top_ i.xiala').bind('click',function(e){
            e.stopPropagation();
            $(this).toggleClass('route_icon-shang1');  //切换上拉图标样式

            if($(this).hasClass('route_icon-shang1')){
                $(this).parent().siblings('ul.languages').stop(true).slideUp();
            }else{
                $(this).parent().siblings('ul.languages').stop(true).slideDown();
            }
        });
    }

    //点击选中按钮
    $('#getDataTable table tbody tr th.click_choose').unbind('click');
    $('#getDataTable table tbody tr th.click_choose').bind('click',function(e){
        e.stopPropagation();
        if(!$(this).html().trim()){ //如果该元素内没有内容，即不可点击，返回
            return;
        }
        
        var _this=$(this);
        var xml_id=$(this).parent().attr('xml_id').trim();  //路线id
        var $xuanzhong=$(this).find('.border_box_check i.choose');
        if($xuanzhong.hasClass('route_icon-xuanzhong')){  //取消
            $xuanzhong.removeClass('route_icon-xuanzhong');
            all_routes.splice(all_routes.indexOf(xml_id),1);
            let $route_li=$('#choose_stations_box ul.routes li.route_box');
            for(var i=0; i<$route_li.length; i++){
                var the_route_id=$route_li.eq(i).attr('route_id').trim();
                if(the_route_id==xml_id){
                    $route_li.eq(i).remove();
                    break;
                }
            }
        }else{   //添加
            //限制其点击太快
            if($(this).hasClass('time_chosen')){ //点击快过快
                return;
            }else{
                $(this).addClass('time_chosen');
                setTimeout(function(){
                    _this.removeClass('time_chosen');
                },500);
            }
            if(all_routes.indexOf(xml_id)!=-1){ //存在
                return;
            }
            $.ajax({
                url:'/myroute/get_xml_id',
                type:'post',
                data:{xml_id},
                success:function(res){
                    if(res.msg=='ok'){
                        var station_num=res.data.station_num; //站点数
                        var this_routes=res.data.routes;  //该路线的站点集合
                        var route_name=res.data.filename;  //路线名
                        this_routes=this_routes.split(','); //转为数组
                        _this.siblings('.station_num').find('a.edit span.num').text(station_num); //改变站点数，防止不一致
                        if(station_num > 0){  //有站点
                            $xuanzhong.addClass('route_icon-xuanzhong');
                            for(var i=0; i<this_routes.length; i++){
                                let _route_id=this_routes[i];
                                if(all_routes.indexOf(_route_id)==-1 ){//不存在
                                    all_routes.push(_route_id);
                                }
                            }
                            $.ajax({
                                url: '/myroute/get_route_languages',
                                type:'post',
                                data:{xml_id},
                                success:function(res){
                                    if(res.msg=='ok'){
                                        var data=res.data;
                                        var $route_box=`<li class="route_box" route_id=${xml_id}>
                                                            <div class="top_">
                                                                <span class="route_name">${route_name}</span>
                                                                <i class="icon route_iconfont route_icon-icon-test xiala"></i>
                                                            </div>
                                                            <ul class="languages"></ul>
                                                        </li>`;
                                        $('#choose_stations_box .routes').append($($route_box));
                                        let $languages_li="";
                                        for(var i=0; i<data.length; i++){
                                            let language=data[i].lang;
                                            $languages_li += "<li class='languages'>"+language+"</li>";
                                            if(merge_routes_languages.indexOf(language)==-1){
                                                merge_routes_languages.push(language);
                                            }
                                        }
                                        $('#choose_stations_box .routes li.route_box:last')
                                        .find('ul.languages').append($($languages_li));

                                        //处理路线下拉
                                        deal_language_route();
                                        

                                    }else if(res.msg=='err' || res.msg=='no'){
                                        window.location.reload();
                                    }
                                },
                                error:function(err){
                                    if(err.status==500){
                                        alert('server error,please try again later.');
                                    }
                                }
                            });
                        }else{
                            var tip= i18next.t('Station_num_err'); //提示信息
                            $('#save_success p.save_tip').text(tip);
                            $('#save_success').stop(true).fadeIn(1);
                            setTimeout(function(){
                                $('#save_success').stop(true).fadeOut(1);
                            },2000);
                        }
                    }else if(res.msg=='err'){
                        alert('Expiration of login information,login again.');
                        window.location=login_url;
                    }else if(res.msg=='no'){
                        window.location.reload();
                    }
                },
                error:function(err){
                    if(err.status==500){
                        alert('server error,please try again later.');
                    }
                }
            });
        }
    });
    
    //点击查看详情按钮
    $('#getDataTable table tbody tr th.description button.detail').unbind('click');
    $('#getDataTable table tbody tr th.description button.detail').bind('click',function(e){
        e.stopPropagation();
        $('#show_detail').fadeIn();
        $('#show_detail .my_inp input.xml_name').fadeOut(1).val('');
        var description_detail=i18next.t('Description_detail');
        $('#show_detail p.myBg span').text(description_detail).attr('data-i18n','Description_detail');  //更改标题
        var _this=$(this);
        var description=$(this).siblings('span.text').text();  //详情文本
        var $description_ele = $('#show_detail .my_inp textarea.xml_description');
        $description_ele.fadeIn(1).val(description).css({'height':'0'}).height($description_ele.get(0).scrollHeight);
        var xml_id=$(this).parent().parent().attr('xml_id');  //xml对应的id
        var route_name=$(this).parent().siblings('th.filename').find('span').text();
        //点击确定按钮提交更改
        $('#show_detail .my_btn button.confirm').unbind('click');
        $('#show_detail .my_btn button.confirm').bind('click',function(e){
            e.stopPropagation();
            var change_description=$('#show_detail textarea.xml_description').val().trim();  //更改后的详情文本

            if(description == change_description){
                $('#show_detail').fadeOut();
            }else{
                $('#zhezhao').fadeIn(1);
                $.ajax({
                    url:'/myroute/change_xml_description',
                    type:'post',
                    data:{
                        description:htmlspecialchars(change_description),
                        xml_id,
                        route_name
                    },
                    success:function(res,status){
                        if(res.msg=='err'){
                            window.location.reload();
                        }else if(res.msg='ok'){
                            //成功
                            $('#zhezhao').fadeOut(1);
                            $('#show_detail').fadeOut();
                            _this.siblings('span.text').text(change_description); //变为更改后的内容
                        }
                    }
                })
            }
        });
    });

    //点击rename重命名按钮
    $('#getDataTable table tbody tr th.filename button.rename').unbind('click');
    $('#getDataTable table tbody tr th.filename button.rename').bind('click',function(e){
        e.stopPropagation();
        var _this=$(this);
        $('#show_detail').fadeIn();
        var rename_filename=i18next.t('Rename_filename');
        $('#show_detail p.myBg span').text(rename_filename).attr('data-i18n','Rename_filename');  //更改文件名
        $('#show_detail .my_inp textarea.xml_description').fadeOut(1).val('');
        var filename=$(this).siblings('span').text();  //文件名
        $('#show_detail .my_inp input.xml_name').fadeIn(1).val(filename);
        var xml_id=$(this).parent().parent().attr('xml_id');  //xml对应的id
        //监听输入文件名框
        $('#show_detail .my_inp input.xml_name').get(0).oninput=function(e){
            e.stopPropagation();
            input_check_fun($(this));
        }
        //点击确认按钮
        $('#show_detail .my_btn button.confirm').unbind('click');
        $('#show_detail .my_btn button.confirm').bind('click',function(e){
            e.stopPropagation();
            var $input_xml=$('#show_detail .my_inp input.xml_name');
            if(!input_check_fun($input_xml))
                return;
            var new_filename=$input_xml.val().trim();
            //去点原文件名标点符号后的文件名,并转为大写
            var remove_sysm_filename=XRegExp.replace(new_filename, XRegExp('\\p{P}?\\p{S}?\\p{Zs}?','g'), (match)=>{
                return ''
            }).toUpperCase();
            //console.log(remove_sysm_filename)
            if(new_filename !=filename){  //新文件名和原文件名不相等
                $('#zhezhao').fadeIn(1);
                $.ajax({
                    url:'/myroute/change_xml_filename',
                    type:'post',
                    data:{
                        filename:filename,
                        new_filename:new_filename,
                        remove_sysm_filename,
                        xml_id
                    },
                    success:function(res,status){
                        if(res.msg=='err'){
                            window.location.reload();
                        }else if(res.msg=='has'){  //表示名称存在
                            $('#zhezhao').fadeOut(1);
                            var exist_filename=res.filename;
                            var tip_text = i18next.t('Routename_exist') +exist_filename;
                            $('#show_detail .my_inp p.err_tip').text(tip_text)
                            .stop(true).fadeIn();
                            setTimeout(function(){
                                $('#show_detail .my_inp p.err_tip').fadeOut();
                            },3000);
                        }else if(res.msg='ok'){
                            //成功
                            $('#zhezhao').fadeOut(1);
                            $('#show_detail').fadeOut();
                            _this.siblings('span').text(new_filename); //变为更改后的内容
                            //更改跳转连接的url
                            var $a_ele = _this.parent().siblings('th.station_num').find('a.edit');
                            var jump_url=$a_ele.attr('href').split('&route_name=')[0];
                            jump_url += '&route_name='+new_filename;
                            $a_ele.attr('href',jump_url);
                            //提示语需要更新
                            var changed_routes = [];
                            for(var i=0; i<res.changed_routes.length; i++){
                                let route_id= res.changed_routes[i].ctime;
                                changed_routes.push(route_id);
                            };
                            var $main_table_tr = $('#getDataTable table tbody tr');
                            for(var i=0; i<$main_table_tr.length; i++){
                                let route_id = $main_table_tr.eq(i).attr('xml_id');
                                if(changed_routes.indexOf(route_id)!=-1){
                                    $main_table_tr.eq(i).find('th.action a.xiazai span.need_update').addClass('fadein');
                                }
                            }
                        }
                    }
                });
            }else{ //相等
                var tip_text = i18next.t('NoChange');
                $('#show_detail .my_inp p.err_tip').text(tip_text)
                .stop(true).fadeIn();
                setTimeout(function(){
                    $('#show_detail .my_inp p.err_tip').fadeOut();
                },3000);
            }
        });
    });

    //点击删除按钮
    $('#getDataTable table tbody tr th.action i.delete').unbind('click');
    $('#getDataTable table tbody tr th.action i.delete').bind('click',function(e){
        e.stopPropagation();
        var xml_id=Number($(this).parent().parent().attr('xml_id'));
        var filename=$(this).parent().siblings('th.filename').find('span').text();
        //console.log(xml_id)
        //查询该路线被用于哪些合并路线中
        if(!$(this).parent().parent().hasClass('merge')){ //如果不是合并路线
            $.ajax({
                url:'/myroute/route_been_used',
                type:'post',
                data:{xml_id},
                success:function(res){
                    if(res.msg=='err'){
                        window.location.reload();
                    }else if(res.msg='ok'){
                        $('#zhezhao').fadeOut(1);
                        var routes = res.routes; //路线名称数组
                        var filenames = '';
                        for(var i=0; i<routes.length; i++){
                            filenames += routes[i].filename;
                            if(i!= routes.length-1){
                                filenames += ',';
                            }
                        };
                        if(routes.length>0){
                            var mal_tip = i18next.t('Used_routes')+ filenames;
                            $('#myModal').modal('show').find('.modal-body').fadeIn(1).html(mal_tip);
                        }else{
                            $('#myModal').modal('show').find('.modal-body').fadeOut(1);
                        }
                    }
                }
            });
        }else{
            $('#myModal').modal('show').find('.modal-body').fadeOut(1);
        }
        //点击模态框的确认
        $('#myModal .modal-footer button.confirm').unbind('click');
        $('#myModal .modal-footer button.confirm').bind('click',function(e){
            e.stopPropagation();
            $('#myModal').modal('hide');
            $('#zhezhao').fadeIn(1);
            $.ajax({
                url:'/myroute/delete_xml',
                type:'post',
                data:{
                    xml_id,filename
                },
                success:function(res,status){
                    if(res.msg=='err'){
                        window.location.reload();
                    }else if(res.msg='ok'){
                        $('#zhezhao').fadeOut(1);
                        var show_num=Number($('#getData p.info_tip select.showpage').val());
                        var cur_page=Math.ceil(Number($('#pageShow .info_show span.from_num').text())/show_num);
                        var xml_len=$('#getDataTable table tbody tr').length;  //目前存在的是否为最后一个
                        if(xml_len ==1){
                            getDataTable(cur_page-1,show_num);
                        }else{
                            getDataTable(cur_page,show_num);
                        }  
                    }
                }
            });
        });
    });

    //点击查看路线信息,变更为点击语言栏目
    $('#getDataTable table tbody tr th.language_num span.info').unbind('click');
    $('#getDataTable table tbody tr th.language_num span.info').bind('click',function(e){
        e.stopPropagation();
        var $this = $(this).parent(); //使之赋值给它的父标签
        var xml_id=Number($this.parent().attr('xml_id')); //路线id
        var $this = $this;
        //判断该路线是否是合并的路线
        var isMergeRoute=$this.siblings('th.click_choose').html().trim();
        //警告框显示
        var waring_info= i18next.t('modify_transition_tip');
        $('.route_info.merge_route .modal-body .waring_info').fadeIn(1)
        .find('p.tip_info').text(waring_info);
        if(isMergeRoute){  //单一路线
            //先清空表格内容
            $('#language_table thead tr th:gt(0)').remove();
            $('#language_table tbody tr:gt(0)').remove()
            $('#language_table tbody tr:eq(0) th:gt(0)').remove();
            //清空已选择的语言
            $('#choose_language .language_box ul li.language').remove();
            $('#language_lists_box .languages_left li.country_text i.icon').removeClass('route_icon-xuanzhong');
            var filename=$this.siblings('th.filename').find('span').text();  //文件名
            var index=$this.siblings('th.index').text();
            $('#route_info').modal('show').attr({
                'xml_id':xml_id,'filename':filename,'index':index
            });
            $('body').css({'padding':'0px'});
            $('#route_info .modal-footer button.download').addClass('disabled')
            .removeClass('btn-primary').find('a').attr({'download':null,href:null}).css({color:'red'});
            $('#zhezhao').fadeIn(1);  //遮罩显示
            //请求数据
            $.ajax({
                url: '/myroute/get_routeInfo',
                type:'post',
                data:{xml_id},
                success:function(res){
                    $('#zhezhao').fadeOut(1);  //遮罩隐藏
                    if(res.msg=='ok'){
                        var route_datas=res.route_data;  //路线语言及翻译数据
                        var station_data1=res.stations_data1;  //站点语言及翻译数据
                        var station_data2=res.stations_data2;  //站点经纬度
                        //console.log(route_datas,station_data1,station_data2);
                        //先添加前两行的内容,语言
                        for(var i=0; i<route_datas.length; i++){
                            let ID=route_datas[i].ID;  //语言
                            let language=route_datas[i].lang;  //语言
                            let name=route_datas[i].transition;  //翻译
                            let head_th = `<th route_lang_id=${ID}>${language}</th>`;  
                            let body_th;  
                            if(language=='en.US'){
                                body_th=`<th>${name}</th>`;
                            }else{
                                body_th=`<th>
                                            <input type="text" class="form-control" value='${name}' origin_val='${name}'>
                                        </th>`;
                            }
                            $('#language_table thead tr').append($(head_th));
                            $('#language_table tbody tr:eq(0)').append($(body_th));
                            //添加语言列表
                            var li;
                            if(language=='en.US'){
                                li=`<li class="language">
                                        <span route_id=${ID}>${language}</span>
                                    </li>`;
                            }else{
                                li=`<li class="language">
                                        <span route_id=${ID}>${language}</span>
                                        <i class="icon route_iconfont route_icon-shanchu"></i>
                                    </li>`;
                            }
                            var $language_ul=$('#choose_language .language_box ul.chosen');
                            $language_ul.find('.clear').before($(li));
                            var $language_chosen=$('#language_lists_box li.country_text');
                            //为已存在的语言添加选择图标
                            for(var j=0; j<$language_chosen.length; j++){
                                let callname=$language_chosen.eq(j).attr('callname');
                                if(language== callname){
                                    $language_chosen.eq(j).find('i.icon').addClass('route_icon-xuanzhong');
                                }
                            }
                            delete_language();  //删除语言
                        }
                        //再添加站点
                        for(var i=0; i<station_data2.length; i++){ //循环站点列
                            var station_id=station_data2[i].station_id;  //站点id
                            var station_name=station_data2[i].stations_name;  //站点名称
                            var station_lat=station_data2[i].lat;
                            var station_lon=station_data2[i].lng;
                        
                            //先添加列的站点
                            var Station_mul_lang=i18next.t('Station'); //Station对应多语言的文字
                            var tbody=`<tr id='${station_id}' lat='${station_lat}' lon='${station_lon}'><th>
                                    ${Station_mul_lang} ${i+1}</th></tr>`;
                            $('#language_table tbody').append($(tbody));
                            
                            //再添加body翻译语言
                            for(var j=0; j<route_datas.length; j++){  
                                var language_code=route_datas[j].lang;
                                for(var k=0; k<station_data1.length; k++){  //循环语言行
                                    let _ID=station_data1[k].ID;
                                    let _station=station_data1[k].station_id;
                                    let _lang=station_data1[k].lang;
                                    let _transition=station_data1[k].transition;
                                    
                                    if(language_code==_lang && station_id==_station){
                                        var th;
                                        if(language_code == 'en.US'){
                                            th=`<th station_lang_id=${_ID}>${_transition}</th>`;
                                        }else{
                                            // origin_val值为原先的翻译
                                            th=`<th station_lang_id=${_ID}>
                                                    <input type="text" class="form-control" value='${_transition}' origin_val='${_transition}'>
                                                </th>`;
                                        }
                                        $('#language_table tbody tr:last').append($(th));
                                        break;
                                    }
                                }
                            }
                        }
                        //触发点击确定事件
                        $('#route_info').addClass('click_comfirm');
                        $('#route_info .modal-footer button.confirm').trigger('click',{operation_by_myself:false,save_operation:true});
                        setTimeout(function(){
                            $('#route_info').removeClass('click_comfirm');
                        },1000);
                    }else if(res.msg=='err'){
                        window.location=login_url;
                    }
                }
            });
        }else{  //合并的路线
            $('#zhezhao').fadeIn(1);  //遮罩显示
            $('#merge_route_info .modal-footer button.download').addClass('disabled')
            .removeClass('btn-primary')
            .find('a').attr({'download':null,href:null}).css({color:'red'});
            var filename=$this.siblings('th.filename').find('span').text();  //文件名
            var index=$this.siblings('th.index').text();
            $('#merge_route_info').modal('show').attr({
                'xml_id':xml_id,'filename':filename,'index':index
            });
            //更改路线名
            $('#merge_route_info .modal-header span.route_name').text(filename);
            $('body').css({'padding':'0px'});
            $('#merge_route_info .modal-body .body_table').html('');  //清空表格

            $.ajax({
                url:'/myroute/get_merge_route_info',
                type:'post',
                data:{
                    route_id:xml_id
                },
                success:function(res){
                    $('#zhezhao').fadeOut(1);  //遮罩隐藏
                    if(res.msg=='ok'){
                        var result=res.result;  //返回的结果
                        var stations_num = res.stations_num;  //取出重复站点后的站点数
                        var Language_transi=i18next.t('Language'); //翻译
                        var Route_name_transi=i18next.t('Route_name'); //翻译
                        var Station_transi=i18next.t('Station'); //翻译
                        //console.log(result,stations_num)
                        //更新站点数目
                        $this.siblings('th.station_num').text(stations_num);
                        //查看是否有空数据，即其每条路线的组成是否都存在
                        for(var m=0; m<result.length; m++){
                            var route_datas=result[m].route_data;  //路线语言及翻译数据
                            if(route_datas.length==0){  //如果有数据为空
                                $('#merge_route_info').modal('hide');
                                var tip_info= i18next.t('Merge_route_damage'); //提示信息
                                $('#save_success p.save_tip').text(tip_info);
                                $('#save_success').stop(true).fadeIn(1);
                                setTimeout(function(){
                                    $('#save_success').stop(true).fadeOut(1);
                                },3000);
                                return;
                            }
                        }
                        //循环添加多个表
                        for(var m=0; m<result.length; m++){
                            var route_datas=result[m].route_data;  //路线语言及翻译数据
                            var station_data1=result[m].stations_data1;  //站点语言及翻译数据
                            var station_data2=result[m].stations_data2;  //站点经纬度

                            let the_route_id=route_datas[0].route_id; //路线的route_id
                            let route_filename;
                            for(var i=0; i<route_datas.length; i++){
                                let lang=route_datas[i].lang;
                                if(lang=='en.US'){
                                    route_filename=route_datas[i].transition;
                                    break;
                                }
                            }
                            var table=`<table class="table table-bordered table-hover route_table" 
                                        route_id=${the_route_id} filename=${route_filename}>
                                        <thead>
                                            <tr>
                                                <th data-i18n='Language'>${Language_transi}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th data-i18n='Route_name'>${Route_name_transi}</th>
                                            </tr>
                                        </tbody>
                                    </table>`;
                            var $table_box=$('#merge_route_info .modal-body .body_table');
                            $table_box.append($(table));
                    
                             //先添加前两行的内容,语言
                            for(var i=0; i<route_datas.length; i++){
                                let ID=route_datas[i].ID;  //语言
                                let language=route_datas[i].lang;  //语言
                                let name=route_datas[i].transition;  //翻译
                                let head_th = `<th route_lang_id=${ID}>${language}</th>`;  
                                let body_th;  
                                if(language=='en.US'){
                                    body_th=`<th>${name}</th>`;
                                }else{
                                    // origin_val值为原先的翻译
                                    body_th=`<th>
                                                <input type="text" class="form-control" value='${name}' origin_val='${name}'>
                                            </th>`;
                                }
                                $table_box.find('table').eq(m).find('thead tr').append($(head_th));
                                $table_box.find('table').eq(m).find('tbody tr:eq(0)').append($(body_th));
                            }
                            //再添加站点
                            for(var i=0; i<station_data2.length; i++){ //循环站点列
                                var station_id=station_data2[i].station_id;  //站点id
                                var station_name=station_data2[i].stations_name;  //站点名称
                                var station_lat=station_data2[i].lat;
                                var station_lon=station_data2[i].lng;
                            
                                //先添加列的站点
                                var Station_mul_lang=i18next.t('Station'); //Station对应多语言的文字
                                var tbody=`<tr id='${station_id}' lat='${station_lat}' lon='${station_lon}'><th>
                                        ${Station_mul_lang} ${i+1}</th></tr>`;
                                $table_box.find('table').eq(m).find('tbody').append($(tbody));
                                
                                //再添加body翻译语言
                                for(var j=0; j<route_datas.length; j++){  
                                    var language_code=route_datas[j].lang;
                                    for(var k=0; k<station_data1.length; k++){  //循环语言行
                                        let _ID=station_data1[k].ID;
                                        let _station=station_data1[k].station_id;
                                        let _lang=station_data1[k].lang;
                                        let _transition=station_data1[k].transition;
                                        
                                        if(language_code==_lang && station_id==_station){
                                            var th;
                                            if(language_code == 'en.US'){
                                                th=`<th station_lang_id=${_ID}>${_transition}</th>`;
                                            }else{
                                                th=`<th station_lang_id=${_ID}>
                                                        <input type="text" class="form-control" value='${_transition}' origin_val='${_transition}'>
                                                    </th>`;
                                            }
                                            $table_box.find('table').eq(m).find('tbody tr:last').append($(th));
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        //处理每个相同站点输入事件
                        all_stations_input();
                        //触发点击确定事件
                        $('#merge_route_info').addClass('click_comfirm');
                        setTimeout(function(){
                            $('#merge_route_info').removeClass('click_comfirm');
                        },1000);
                        $('#merge_route_info .modal-footer button.confirm').trigger('click',{operation_by_myself:false,save_operation:true});
                        
                    }else if(res.msg=='no'){
                        alert('this route is not exists.');
                        window.location.reload();
                    }else if(res.msg=='err'){
                        alert('Expiration of login information,login again.')
                        window.location=login_url;
                    }
                },
                error:function(err){
                    if(err.status==500){
                        alert('server error,please try again later.');
                    }
                }
            });
        }
    });

    //点击Clone克隆按钮
    $('#getDataTable table tbody tr th.action i.clone').unbind('click');
    $('#getDataTable table tbody tr th.action i.clone').bind('click',function(e){
        e.stopPropagation();
        var station_num= Number($(this).parent().siblings('th.station_num').find('span.num').text());
        if(station_num ==0){
            var tip= i18next.t('Station_num_err'); //提示信息
            $('#save_success p.save_tip').text(tip);
            $('#save_success').stop(true).fadeIn(1);
            setTimeout(function(){
                $('#save_success').stop(true).fadeOut(1);
            },2000);
            return;
        };
        
        var _this=$(this).parent();
        $('#show_detail').fadeIn();
        var clone_route=i18next.t('Clone');
        $('#show_detail p.myBg span').text(clone_route).attr('data-i18n','Clone');  //更改文件名
        $('#show_detail .my_inp textarea.xml_description').fadeIn(1).val('')
        .siblings('input.xml_name').fadeIn(1).val('');
        var xml_id=_this.parent().attr('xml_id');  //xml对应的id
        //监听输入文件名框
        $('#show_detail .my_inp input.xml_name').get(0).oninput=function(e){
            e.stopPropagation();
            input_check_fun($(this));
        }
        //点击确认按钮
        $('#show_detail .my_btn button.confirm').unbind('click');
        $('#show_detail .my_btn button.confirm').bind('click',function(e){
            e.stopPropagation();
            var $input_xml=$('#show_detail .my_inp input.xml_name');
            var filename=$input_xml.val().trim();  //文件名
            if(!input_check_fun($input_xml))
                return;
            //去点原文件名标点符号后的文件名,并转为大写
            var remove_sysm_filename=XRegExp.replace(filename, XRegExp('\\p{P}?\\p{S}?\\p{Zs}?','g'), (match)=>{
                return ''
            }).toUpperCase();
            var description=$('#show_detail textarea.xml_description').val().trim(); 
            //请求后台克隆
            $('#zhezhao').fadeIn(1);
            $.ajax({
                url:'/myroute/clone_route',
                type:'post',
                data:{
                    route_id:xml_id,
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
                        $('#show_detail .my_inp p.err_tip').text('A similar route name exists:'+exist_filename)
                        .stop(true).fadeIn();
                        setTimeout(function(){
                            $('#show_detail .my_inp p.err_tip').fadeOut();
                        },3000);
                    }else if(res.msg=='ok'){
                        //隐藏对话框
                        $('#show_detail').fadeOut();
                        //清空输入框内容
                        $('#show_detail .my_inp input.xml_name').val('')
                        $('#show_detail textarea.xml_description').val('');  
                        var show_num=$('#getData p.info_tip select.showpage').val();
                        getDataTable(1,show_num,true);
                    }
                }
            });
        });
    });

    //点击模拟驾驶车的按钮
    $('#getDataTable table tbody tr th.action i.sim_drive').unbind('click');
    $('#getDataTable table tbody tr th.action i.sim_drive').bind('click',function(e){
        e.stopPropagation();
        var $this = $(this).parent();
        var xml_id=Number($this.parent().attr('xml_id')); //路线id
        var station_num=Number($this.siblings('th.station_num').find('a.edit span.num').text()); //站点个数
        var language_num=$this.siblings('th.language_num').find('span.language_list').text(); //语言个数
        language_num = language_num.split(',').length;
        if(station_num <2 || language_num <2){
            var err_tip= i18next.t('Simulated_drive_err');
            $('#save_success p.save_tip').text(err_tip);
            $('#save_success').fadeIn(1);
            setTimeout(function(){
                $('#save_success').fadeOut(1);
            },2500);
            return;
        }
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url :'/myroute/get_routeInfo',
            type:'post',
            data:{xml_id},
            success:function(res){
                $('#zhezhao').fadeOut(1);
                if(res.msg=='ok'){
                    var route_data=res.route_data;
                    var stations_data1=res.stations_data1;
                    var stations_data2=res.stations_data2;

                    var hasCN=route_data.some(function(ele,index){  //是否有中文zn.CN
                        if(ele.lang=='zh.CN'){
                            return true;
                        }else{
                            return false;
                        }
                    });
                    if(!hasCN){
                        var err_tip= i18next.t('Simulated_CN');
                        $('#save_success p.save_tip').text(err_tip);
                        $('#save_success').fadeIn(1);
                        setTimeout(function(){
                            $('#save_success').fadeOut(1);
                        },2500);
                        return;
                    }
                    var transition_over=stations_data1.every(function(ele,index){  //所有翻译是否完全
                        if(!(ele.transition)){ //为空
                            return false;
                        }else{
                            return true
                        }
                    });
                    if(!transition_over){
                        var err_tip= i18next.t('Simulated_CN');
                        $('#save_success p.save_tip').text(err_tip);
                        $('#save_success').fadeIn(1);
                        setTimeout(function(){
                            $('#save_success').fadeOut(1);
                        },2500);
                        return;
                    }
                    //通过检验
                    var jump_url= window.location.origin+'/myroute/html/routeDrive.html?route_id='+xml_id;
                    window.location= jump_url;
                }
            }
        });
    });
}

//点击所选中的语言列表删除图标
function delete_language(){
    var $language_ul=$('#choose_language .language_box ul.chosen');
    //点击删除单个语言图标
    $language_ul.find('li.language i').unbind('click');
    $language_ul.find('li.language i').bind('click',function(e){
        e.stopPropagation();
        let jianchen=$(this).siblings('span').text();
        request_delete_language(jianchen);
    });
}

//向后台请求删除语言
function request_delete_language(jianchen){
    var xml_id=$('#route_info').attr('xml_id');
    var $stations_tb=$('#language_table tbody tr');
    var stations=[]; //所有站点
    for(var i=1; i<$stations_tb.length; i++){
        var station_id=$stations_tb.eq(i).attr('id');
        stations.push(station_id);
    }
    var languages_arr = []; //所有语言简称
    var $languages_choosen=$('#choose_language .language_box li.language');
    for(var i=0; i<$languages_choosen.length; i++){
        let language= $languages_choosen.eq(i).find('span').text();
        if(language!= jianchen){
            languages_arr.push(language);
        }
    };
    $('#myModal').modal('show').find('.modal-body').fadeOut(1);
    $('#myModal .modal-footer button.confirm').unbind('click');
    $('#myModal .modal-footer button.confirm').bind('click',function(e){
        //$chosen_i.removeClass('route_icon-xuanzhong'); //删除选中样式
        var route_name=$('#language_table tbody tr:eq(0) th:eq(1)').text(); //路线名称
        $('#myModal').modal('hide');  //隐藏模态框
        var language_len=$('#choose_language .language_box ul.chosen li.language').length;
        $.ajax({
            url : '/myroute/delete/language',
            type:'post',
            data:{
                xml_id,
                jianchen,
                stations,
                route_name,
                language_num:language_len-1, //语言数目
                languages_arr:languages_arr.join(',')
            },
            success:function(res){
                if(res.msg=='ok'){
                    var $language_chosen=$('#choose_language .language_box ul.chosen li.language');
                    for(var i=0; i<$language_chosen.length; i++){
                        if(jianchen== $language_chosen.eq(i).find('span').text()){
                            $language_chosen.eq(i).remove();  //删除列出的语言
                            break;
                        }
                    }
                    let $language_li=$('#language_lists_box ul.choose_my_language li.language ul li.country_text');
                    for(var i=0; i<$language_li.length; i++){
                        let callname=$language_li.eq(i).attr('callname');
                        if(callname ==jianchen ){
                            $language_li.eq(i).find('i.icon').removeClass('route_icon-xuanzhong');//删除选中样式
                        }
                    }
                    //删除表格中对应语言的列
                    var $table_head_cols=$('#language_table thead tr th'); //表格头部的列数
                    var $table_body_rows=$('#language_table tbody tr'); //表格的行数
                    for(var i=1; i<$table_head_cols.length; i++){
                        var language=$table_head_cols.eq(i).text().trim();
                        if(language ==jianchen){
                            $table_head_cols.eq(i).remove();
                            for(var j=0; j<$table_body_rows.length; j++){
                                $table_body_rows.eq(j).find('th').eq(i).remove();
                            }
                            break;
                        }
                    }
                    //改变语言的数目
                    language_len=$('#choose_language .language_box ul.chosen li.language').length;
                    var $route_table=$('#getDataTable table tbody tr');
                    for(var i=0; i<$route_table.length; i++){
                        var route_id=$route_table.eq(i).attr('xml_id');
                        if(route_id ==xml_id){
                            var $language_list_ele = $route_table.eq(i).find('th.language_num span.language_list');
                            $language_list_ele.text(languages_arr.join(','));
                            languages_arr= languages_arr.join(' ');
                            $language_list_ele.attr('data-original-title',languages_arr);
                            break;
                        }
                    }
                    //触发点击Language 的Confirm按钮
                    $('#route_info .modal-footer button.confirm').trigger('click');

                }else if(res.msg=='err'){
                    window.location=login_url;
                }
            }
        });
    });
}

//匹配规则
function isInputRule(c) {
    //var re = /[^u4e00-u9fa5]/; //匹配中文正则
    var re1= /[#?&=\\]/g;  //匹配英文和数字下划线横杠以及点  
    if (!re1.exec(c)) {    
        return true;  //满足要求
    }else{
        return false;  //不满足要求
    }
}

//处理每个站点input的输入，使相同id的站点输入同步
function all_stations_input(){
    var $table=$('#merge_route_info .modal-body .body_table table');
    for(var i=0; i<$table.length; i++){  //循环表
        var row_num=$table.eq(i).find('tbody tr').length;  //行数
        var col_num=$table.eq(i).find('thead tr th').length;  //列数
        
        for(var j=1; j<row_num; j++){  //行
            for(var k=1; k<col_num; k++){  //列
                //站点的ID
                var language = $table.eq(i).find('thead tr th').eq(k).text();
                if(language == 'en.US'){
                    continue;
                }
                var $cell=$table.eq(i).find('tbody tr').eq(j).find('th').eq(k);
                let station_id=$cell.attr('station_lang_id').trim();
                $cell.find('input').get(0).oninput=function(e){
                    e.preventDefault();
                    var input_val=$(this).val().trim();
                    //同步输入
                    for(var m=0; m<$table.length; m++){
                        if(i==m){  //同一个表格
                            break;
                        }else{
                             //非同一个表格
                            var _row_num=$table.eq(m).find('tbody tr').length;  //行数
                            var _col_num=$table.eq(m).find('thead tr th').length;  //列数
                            for(var n=1; n<_row_num; n++){  //行
                                for(var p=1; p<_col_num; p++){  //列
                                    //站点的ID
                                    let $cell_=$table.eq(m).find('tbody tr').eq(n).find('th').eq(p);
                                    let _station_id=$cell_.attr('station_lang_id').trim();
                                    if(station_id==_station_id){
                                        $cell_.find('input').val(input_val);
                                        break;
                                    }
                                }
                            }
                        }
                       
                    }
                }
            }
        }
    }
}
//文件名输入框
function input_check_fun(_self, limit_filename_len=128){
    var input_check=false;  //输入框是否符合要求
    var file_val=$(_self).val().trim();//输入的文本
    var filename_len=file_val.length;  //文件名长度
    if(file_val){  //有输入内容
        var timer;
        if(isInputRule(file_val)){
            if(filename_len >= limit_filename_len){
                input_check=false; //不符合要求
                clearTimeout(timer);
                $(_self).parent().find('p.err_tip').text('Length less than '+limit_filename_len).stop(true).fadeIn();
                timer = setTimeout(function(){
                    $(_self).parent().find('p.err_tip').fadeOut();
                },3000);
            }else{  //符合要求
                input_check=true; //符合要求
            }
        }else{
            input_check=false; //不符合要求
            clearTimeout(timer);
            $(_self).parent().find('p.err_tip').text('Unsupported symbol:#?&=\\').stop(true).fadeIn();
            timer = setTimeout(function(){
                $(_self).parent().find('p.err_tip').fadeOut();
            },3000);
        }
        
    }else{
        input_check=false; //不符合要求
        $(_self).parent().find('p.err_tip').text('No empty').fadeIn();
        setTimeout(function(){
            $(_self).parent().find('p.err_tip').fadeOut();
        },3000);
    }
    return input_check;
}

module.exports={
    getDataTable,
    create_list,
    split_page,
    init_show,
    input_check_fun,
    delete_language,
    request_delete_language
}