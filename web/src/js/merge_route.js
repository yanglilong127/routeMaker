//合并路线
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import {input_check_fun,getDataTable} from './pagination';
import {login_url} from '../configs/setting';

/***
 * 参数1 表示为url 的json对象
 * ***/
function merge_routes(url_json){
    //点击合并的确定按钮
    $('#merge_route .btn_box button.comfirm').unbind('click');
    $('#merge_route .btn_box button.comfirm').bind('click',function(e){
        e.stopPropagation();
        var route_name=$('#merge_route .routeFile input.filename').val().trim();
        if(!input_check_fun($('#merge_route .routeFile input.filename'))){
            return;
        }
        //路线名合法，继续往下走
        //判断选中了几条路线
        if(window.all_routes.length < 2){  //表示合并至少要选中两条路线
            return;
        }
        var new_route_name=XRegExp.replace(route_name, XRegExp('\\p{P}?\\p{S}?\\p{Zs}?','g'), (match)=>{
            return ''
        }).toUpperCase();
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url:'/myroute/merge_routes',
            type:'post',
            data:{
                all_routes:window.all_routes,
                languages_arr:window.merge_routes_languages,
                route_name,
                new_route_name
            },
            success:function(res){
                $('#zhezhao').fadeOut(1);
                if(res.msg=='err'){
                    window.location=login_url;
                }else if(res.msg=='ok'){
                    $('#getData p.info_tip button.merge').removeClass('disabled');  //移除不能点击样式
                    $('#merge_route').fadeOut();
                    window.merge_routes_languages=[];
                    window.all_routes=[];  //清空
                    $('#choose_stations_box ul.routes').html('');  //清空路线信息
                    $('#merge_route .exist_languages ul.languages li.language').remove();  //清空语言
                    getDataTable();
                }else if(res.msg=='has'){  // 路线名已有
                    $('#merge_route .routeFile p.err_tip')
                    .text(new_route_name+' route name has been used.')
                    .fadeIn();
                    setTimeout(function(){
                        $('#merge_route .routeFile p.err_tip').fadeOut();
                    },3000);
                }
            },
            error:function(err){
                $('#zhezhao').fadeOut(1);
                if(err.status==500){
                    alert('server error,please try later.');
                }
            }
        });
    });
}

//处理点击路线详情Comfirm按钮事件
function route_info_click_confirm(){
    //点击单一路线模态框的确定Confirm按钮
    $('#route_info .modal-footer button.confirm').click(function(e){
        e.stopPropagation();
        var $table_head=$('#language_table thead tr th');
        var col_num=$table_head.length;  //表格列数
        var $table_body=$('#language_table tbody tr');
        var row_num=$table_body.length;  //表格行数
        var xml_id=$('#route_info').attr('xml_id');  //路线id
        var filename=$('#route_info').attr('filename');  //路线名称

        if($('#route_info').hasClass('click_comfirm')){  //是否是点击的缺点触发的
            var tip_info= i18next.t('Can_download'); //提示信息
        }else{
            var tip_info= i18next.t('Save_success'); //提示信息
        }
        for(var i=0; i<row_num; i++){
            for(var j=1; j<col_num; j++){
                let language=$table_body.eq(i).find('th:eq(0)').text();
                if(language=='en.US' && j==1){
                    continue;
                }
                var input_val=$table_body.eq(i).find('th').eq(j).find('input').val().trim();
                if(input_val==''){
                    $table_body.eq(i).find('th').eq(j).find('input').focus();
                    $('#route_info .modal-footer button.download').addClass('disabled')
                    .removeClass('btn-primary')
                    .find('a').removeAttr('download href')
                    .css({color:'red'});
                    return;
                }
            }
        }
        //都有输入内容才执行下面代码
        $('#zhezhao').fadeIn(1);
        var languages=[];  //语言列表
        var $language_box=$('#choose_language ul.chosen li.language');
        for(var i=0; i<$language_box.length; i++){
            let language=$language_box.eq(i).find('span').text();
            languages.push(language);
        }

        var Stop={ //站点对象
            StopInfo:[]
        };  
        var RouteInfo={  //路线对象
            Number:filename,
            ID:xml_id,
            NameTable:[],
            StopAttr:[]
        };  
        for(var i=0; i<row_num; i++){  //路线
            let language=$table_body.eq(i).find('th:eq(0)').text();
            let Name='';
            let route_lang_id=Number($table_body.eq(i).attr('route_lang_id'));
            if(language=='en.US'){
                Name=$table_body.eq(i).find('th').eq(1).text();
            }else{
                Name=$table_body.eq(i).find('th').eq(1).find('input').val().trim();
            }
            let tmp_obj={
                LangCode:language,
                Name:Name,
                route_lang_id
            }
            RouteInfo.NameTable.push(tmp_obj);
        }
        for(var i=2; i<col_num; i++){  //站点
            let Station_id=$table_head.eq(i).attr('id');
            let lat=$table_head.eq(i).attr('lat');
            let lon=$table_head.eq(i).attr('lon');
            
            RouteInfo.StopAttr.push(Station_id);
            let tmp_obj={
                ID:Station_id,
                Lat:lat,
                Lon:lon,
                NameTable:[]
            }

            for(var j=0; j<row_num; j++){
                let language=languages[j];
                let Name=$table_body.eq(j).find('th').eq(i).find('input').val().trim();
                let station_lang_id=Number($table_body.eq(j).find('th').eq(i).attr('station_lang_id'));
                let temp_obj1={
                    Name:Name,
                    LangCode:language,
                    station_lang_id
                };
                tmp_obj.NameTable.push(temp_obj1);
            }
            Stop.StopInfo.push(tmp_obj);
        }
        var languages_num=RouteInfo.NameTable.length;  //语言数目
        //console.log(Stop,RouteInfo);
        $.ajax({
            url:'/myroute/xml_change_language',
            type:'post',
            data:{
                xml_id,
                filename,
                Stop:Stop,
                RouteInfo
            },
            success:function(res){
                $('#zhezhao').fadeOut(1);
                if(res.msg=='err'){
                    window.location.reload();
                }else if(res.msg=='ok'){
                    var addr=res.addr;
                    var download_filename=addr.split('\/')[addr.split('\/').length-1];
                    //去点不能操作样式和添加下载地址
                    $('#route_info .modal-footer button.download').removeClass('disabled')
                    .addClass('btn-primary')
                    .find('a').attr({download:download_filename,href:addr})
                    .css({color:'#fff'});
                    //保存成功的返回信息
                    $('#save_success p.save_tip').text(tip_info);
                    $('#save_success').stop(true).fadeIn(1);
                    setTimeout(function(){
                        $('#save_success').stop(true).fadeOut(1);
                    },2000);
                }
            }
        });

    });

    //点击合并的路线模态框的确定Comfirm按钮
    $('#merge_route_info .modal-footer button.confirm').click(function(e){
        e.stopPropagation();
        var all_data=[]; //所有的表格数据
        var $table=$('#merge_route_info .modal-body .body_table table');
        if($('#merge_route_info').hasClass('click_comfirm')){  //是否是点击的缺点触发的
            var tip_info= i18next.t('Can_download'); //提示信息
        }else{
            var tip_info= i18next.t('Save_success'); //提示信息
        }
        //检测是否有空的
        for(var z=0; z<$table.length; z++){
            var $table_head=$table.eq(z).find('thead tr th');
            var $table_body=$table.eq(z).find('tbody tr');
            var col_num=$table_head.length;  //表格列数
            var row_num=$table_body.length;  //表格行数

            for(var i=0; i<row_num; i++){
                for(var j=1; j<col_num; j++){
                    let language=$table_body.eq(i).find('th:eq(0)').text();
                    if(language=='en.US' && j==1){
                        continue;
                    }
                    var input_val=$table_body.eq(i).find('th').eq(j).find('input').val().trim();
                    if(input_val==''){
                        $table_body.eq(i).find('th').eq(j).find('input').focus();
                        $('#merge_route_info .modal-footer button.download').addClass('disabled')
                        .removeClass('btn-primary')
                        .find('a').removeAttr('download href')
                        .css({color:'red'});
                        return;
                    }
                }
            }
        }
        //如果都有数据
        for(var z=0; z<$table.length; z++){
            var $table_head=$table.eq(z).find('thead tr th');
            var $table_body=$table.eq(z).find('tbody tr');
            var col_num=$table_head.length;  //表格列数
            var row_num=$table_body.length;  //表格行数
            var xml_id=$table.eq(z).attr('route_id');  //路线id
            let filename=$table.eq(z).attr('filename');  //路线名称

            var languages=[];  //语言列表
            for(var i=0; i<$table_body.length; i++){
                let language=$table_body.eq(i).find('th:eq(0)').text();
                languages.push(language);
            }

            var Stop={ //站点对象
                StopInfo:[]
            };  
            var RouteInfo={  //路线对象
                Number:filename,
                ID:xml_id,
                NameTable:[],
                StopAttr:[]
            };  
            for(var i=0; i<row_num; i++){  //路线
                let language=$table_body.eq(i).find('th:eq(0)').text();
                let Name='';
                let route_lang_id=Number($table_body.eq(i).attr('route_lang_id'));
                if(language=='en.US'){
                    Name=$table_body.eq(i).find('th').eq(1).text();
                }else{
                    Name=$table_body.eq(i).find('th').eq(1).find('input').val().trim();
                }
                let tmp_obj={
                    LangCode:language,
                    Name:Name,
                    route_lang_id
                }
                RouteInfo.NameTable.push(tmp_obj);
            }
            for(var i=2; i<col_num; i++){  //站点
                let Station_id=$table_head.eq(i).attr('id');
                let lat=$table_head.eq(i).attr('lat');
                let lon=$table_head.eq(i).attr('lon');
                
                RouteInfo.StopAttr.push(Station_id);
                let tmp_obj={
                    ID:Station_id,
                    Lat:lat,
                    Lon:lon,
                    NameTable:[]
                }

                for(var j=0; j<row_num; j++){
                    let language=languages[j];
                    let Name=$table_body.eq(j).find('th').eq(i).find('input').val().trim();
                    let station_lang_id=Number($table_body.eq(j).find('th').eq(i).attr('station_lang_id'));
                    let temp_obj1={
                        Name:Name,
                        LangCode:language,
                        station_lang_id
                    };
                    tmp_obj.NameTable.push(temp_obj1);
                }
                Stop.StopInfo.push(tmp_obj);
            }

            var tmp_obj={
                Stop,RouteInfo
            };
            all_data.push(tmp_obj);
        }
        
        var xml_id=$('#merge_route_info').attr('xml_id');  //路线id
        var filename=$('#merge_route_info').attr('filename');  //路线名称
        //console.log(all_data,xml_id,filename);
        $('#zhezhao').fadeIn(1);
        $.ajax({
            url:'/myroute/merge_routes_change_lang_xml',
            type:'post',
            data:{
                xml_id,
                filename,
                all_data
            },
            success:function(res){
                $('#zhezhao').fadeOut(1);
                if(res.msg=='ok'){
                    var webAddr=res.web_addr;  //文件下载地址
                    var download_filename=webAddr.split('\/')[webAddr.split('\/').length-1];
                    //去点不能操作样式和添加下载地址
                    $('#merge_route_info .modal-footer button.download').removeClass('disabled')
                    .addClass('btn-primary')
                    .find('a').attr({download:download_filename,href:webAddr})
                    .css({color:'#fff'});
                    //保存成功的返回信息
                    $('#save_success p.save_tip').text(tip_info);
                    $('#save_success').stop(true).fadeIn(1);
                    setTimeout(function(){
                        $('#save_success').stop(true).fadeOut(1);
                    },2000);

                }else if(res.msg=='err'){
                    alert('Expiration of login information,login again.')
                    window.location=login_url;
                }else if(res.msg=='no'){
                    alert('this route is not exists.');
                    window.location.reload();
                }
            },
            error:function(err){
                if(err.status==500){
                    alert('server error,please try again later.');
                }
            }
        });

    });
}


module.exports={
    merge_routes,
    route_info_click_confirm
}