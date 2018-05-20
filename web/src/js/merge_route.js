//合并路线
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import {input_check_fun,getDataTable} from './pagination';
import {login_url} from '../configs/setting';
import {htmlspecialchars} from './functions';
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
    //operation_by_myself 表示是否是自己点击的Confirm按钮
    $('#route_info .modal-footer button.confirm').click(function(e,chuandi_obj={operation_by_myself:true,save_operation:false}){
        e.stopPropagation();
        var $this = $(this);
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
        //遍历查看翻译是否有填写完整
        var is_compleate_transition = true;
        $('#route_info .modal-footer .submit_waring').fadeOut(1);//先隐藏
        for(var i=0; i<row_num; i++){
            if(!is_compleate_transition){  //有翻译未完成
                break;
            }
            for(var j=1; j<col_num; j++){
                let language=$table_head.eq(j).text();
                if(language=='en.US'){
                    continue;
                }
                var input_val=$table_body.eq(i).find('th').eq(j).find('input').val().trim();
                if(input_val==''){
                    is_compleate_transition= false;
                    $table_body.eq(i).find('th').eq(j).find('input').focus();
                    $('#route_info .modal-footer button.confirm').addClass('disabled')
                    .removeClass('btn-primary')
                    .addClass('noclick')  //表示禁止点击
                    .css({color:'red'});
                    break;
                    /* var complate_tran= i18next.t('Complete_translation');
                    $table_body.eq(i).find('th').eq(j).find('input').focus();
                    $('#route_info .modal-footer button.download').addClass('disabled')
                    .attr('title',complate_tran)
                    .removeClass('btn-primary')
                    .find('a').removeAttr('download href')
                    .css({color:'red'});
                    if(operation_by_myself){ //如果是自己点击的
                        let Complete_translation = i18next.t('Complete_translation');
                        $('#route_info .modal-footer .submit_waring').stop(true)
                        .text(Complete_translation).slideDown(1000);
                    }
                    return; */
                }
            }
        }
        if(is_compleate_transition){  //如果翻译全部完成
            $('#route_info .modal-footer button.confirm').removeClass('disabled')
            .addClass('btn-primary')
            .removeClass('noclick')  //表示禁止点击
            .css({color:'white'});
        }
        if(!chuandi_obj.operation_by_myself){
            return;
        }
        if(!$this.hasClass('noclick')){
            $('#zhezhao').fadeIn(1);
        }
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
        var transition_change = {  //翻译改变过的记录
            route_id: xml_id,
            tran_change_route_id : '',  //表示路线翻译改变了
            stations_id: []  //取站点的id
        }
        for(var i=1; i<col_num; i++){  //路线
            let language=$table_head.eq(i).text();
            let Name='';
            let route_lang_id=Number($table_head.eq(i).attr('route_lang_id'));
            if(language=='en.US'){
                Name=$table_body.eq(0).find('th').eq(i).text();
            }else{
                let $table_th = $table_body.eq(0).find('th').eq(i).find('input');
                Name=$table_th.val().trim();
                var origin_tran = $table_th.attr('origin_val').trim();
                if((origin_tran!= Name) && (!transition_change.tran_change_route_id)){
                    transition_change.tran_change_route_id = xml_id;
                }
            }
            Name = htmlspecialchars(Name);
            let tmp_obj={
                LangCode:language,
                Name:Name,
                route_lang_id
            }
            RouteInfo.NameTable.push(tmp_obj);
        }
        for(var i=1; i<row_num; i++){  //站点
            var Station_id=$table_body.eq(i).attr('id');
            let lat=$table_body.eq(i).attr('lat');
            let lon=$table_body.eq(i).attr('lon');
            
            RouteInfo.StopAttr.push(Station_id);
            let tmp_obj={
                ID:Station_id,
                Lat:lat,
                Lon:lon,
                NameTable:[]
            }

            for(var j=1; j<col_num; j++){
                let language=languages[j-1];
                let Name;
                if(language == 'en.US'){
                    Name=$table_body.eq(i).find('th').eq(j).text();
                }else{
                    let $table_th = $table_body.eq(i).find('th').eq(j);
                    Name=$table_th.find('input').val().trim();
                    var origin_tran = $table_th.find('input').attr('origin_val').trim();
                    if((origin_tran!= Name)  && transition_change.stations_id.indexOf(Station_id)==-1){
                        transition_change.stations_id.push(Station_id);
                    }
                    
                }
                Name = htmlspecialchars(Name);
                let station_lang_id=Number($table_body.eq(i).find('th').eq(j).attr('station_lang_id'));
                let temp_obj1={
                    Name:Name,
                    LangCode:language,
                    station_lang_id
                };
                tmp_obj.NameTable.push(temp_obj1);
            }
            Stop.StopInfo.push(tmp_obj);
        }
        //console.log(transition_change)
        var languages_num=RouteInfo.NameTable.length;  //语言数目
        //console.log(chuandi_obj.save_operation, typeof(chuandi_obj.save_operation))
        $.ajax({
            url:'/myroute/xml_change_language',
            type:'post',
            data:{
                xml_id,
                filename,
                Stop:Stop,
                RouteInfo,
                save_operation: chuandi_obj.save_operation,
                transition_change
            },
            success:function(res){
                $('#zhezhao').fadeOut(1);
                if(res.msg=='err'){
                    window.location.reload();
                }else if(res.msg=='ok'){
                    var changed_routes = res.changed_routes;  //所有需要更新的路线id
                    //console.log(changed_routes)
                    var $main_table_tr = $('#getDataTable table tbody tr');
                    if(changed_routes){
                        for(var i=0; i<$main_table_tr.length; i++){
                            let route_id = $main_table_tr.eq(i).attr('xml_id');
                            if(changed_routes.indexOf(route_id)!=-1){
                                $main_table_tr.eq(i).find('th.action a.xiazai span.need_update').addClass('fadein');
                            }
                        }
                    }
                    if(res.addr){  //更新下载地址
                        var addr=res.addr;
                        var download_filename=addr.split('\/')[addr.split('\/').length-1];
                        for(var i=0; i<$main_table_tr.length; i++){
                            let _this_xml_id = $main_table_tr.eq(i).attr('xml_id');
                            if(xml_id == _this_xml_id){
                                $main_table_tr.eq(i).find('th.action a.xiazai')
                                .attr({'href':addr,"download":download_filename})
                                .find('i.download').removeClass('noclick')
                                .siblings('span.need_update')
                                .removeClass('fadein');
                                break;
                            }
                        }
                    }

                    if(is_compleate_transition){  //如果翻译全部完成
                        $('#route_info .modal-footer button.confirm').removeClass('disabled')
                        .addClass('btn-primary')
                        .removeClass('noclick') 
                        .css({color:'white'});
                        //保存成功的返回信息
                        if(chuandi_obj.operation_by_myself){
                            let Complete_translation;
                            if(chuandi_obj.save_operation){ //来自于save按钮触发的
                                Complete_translation = i18next.t('Save_success');
                            }else{
                                Complete_translation = i18next.t('Can_download');
                            }
                            $('#route_info .submit_waring').stop(false,true).slideUp(1000);
                            $('#route_info .submit_success')
                            .text(Complete_translation).slideDown(1000);
                            setTimeout(function(){
                                $('#route_info .submit_success').stop(true).slideUp();
                            },2500);
                        }
                    }else{
                        if(chuandi_obj.save_operation && chuandi_obj.operation_by_myself){
                            let Complete_translation = i18next.t('Complete_translation');
                            $('#route_info .modal-footer .submit_waring').stop(true)
                            .text(Complete_translation).slideDown(1000);
                            setTimeout(function(){
                                $('#route_info .modal-footer .submit_waring').slideUp(500)
                            },3000);
                        }
                    }
                }
            }
        });

    });

    $('#route_info .modal-footer button.save').click(function(e,operation_by_myself=true){
        e.stopPropagation();
        $('#route_info .modal-footer button.confirm').trigger('click',{operation_by_myself:true,save_operation:true});
    });


    //点击合并的路线模态框的确定Comfirm按钮
    //operation_by_myself 表示是否是自己点击的Confirm按钮
    /**
     * 参数1 operation_by_myself表示为子集点击或者是触发的
     * 参数2 save_operation表示是否来自于save按钮触发
     * **/
    $('#merge_route_info .modal-footer button.confirm').click(function(e,chuandi_obj={operation_by_myself:true,save_operation:false}){
        e.stopPropagation();
        var all_data=[]; //所有的表格数据
        var $table=$('#merge_route_info .modal-body .body_table table');
        if($('#merge_route_info').hasClass('click_comfirm')){  //是否是点击的确定触发的
            var tip_info= i18next.t('Can_download'); //提示信息
        }else{
            var tip_info= i18next.t('Save_success'); //提示信息
        }
        //检测是否有空的
        var is_compleate_transition = true;
        $('#merge_route_info .submit_waring').fadeOut(1);//先隐藏
        for(var z=0; z<$table.length; z++){
            if(!is_compleate_transition){
                break;
            }
            var $table_head=$table.eq(z).find('thead tr th');
            var $table_body=$table.eq(z).find('tbody tr');
            var col_num=$table_head.length;  //表格列数
            var row_num=$table_body.length;  //表格行数

            for(var i=0; i<row_num; i++){
                if(!is_compleate_transition){
                    break;
                }
                for(var j=1; j<col_num; j++){
                    let language=$table_head.eq(j).text();
                    if(language=='en.US'){
                        continue;
                    }
                    var input_val=$table_body.eq(i).find('th').eq(j).find('input').val().trim();
                    if(input_val==''){
                        is_compleate_transition= false;
                        $table_body.eq(i).find('th').eq(j).find('input').focus();
                        $('#merge_route_info .modal-footer button.confirm').addClass('disabled')
                        .removeClass('btn-primary')
                        .addClass('noclick')  //表示禁止点击
                        .css({color:'red'});
                        break;
                        /* var complate_tran= i18next.t('Complete_translation');
                        $table_body.eq(i).find('th').eq(j).find('input').focus();
                        $('#merge_route_info .modal-footer button.download').addClass('disabled')
                        .attr('title',complate_tran)
                        .removeClass('btn-primary')
                        .find('a').removeAttr('download href')
                        .css({color:'red'});
                        if(operation_by_myself){
                            let Complete_translation = i18next.t('Complete_translation');
                            $('#merge_route_info .modal-footer .submit_waring').stop(true)
                            .text(Complete_translation).slideDown(1000);
                        }
                        return; */
                    }
                }
            }
        }
        if(is_compleate_transition){  //如果翻译全部完成
            $('#merge_route_info .modal-footer button.confirm').removeClass('disabled')
            .addClass('btn-primary')
            .removeClass('noclick')  //表示禁止点击
            .css({color:'white'});
        }
        if(!chuandi_obj.operation_by_myself){
            return;
        }
        var transition_change = {  //翻译改变过的记录
            routes_id: [],
            stations_id: []  //取站点的id
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
            for(var i=1; i<$table_head.length; i++){
                let language=$table_head.eq(i).text();
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
            for(var i=1; i<col_num; i++){  //路线
                let language=$table_head.eq(i).text();
                let Name='';
                let route_lang_id=Number($table_head.eq(i).attr('route_lang_id'));
                if(language=='en.US'){
                    Name=$table_body.eq(0).find('th').eq(i).text();
                }else{
                    let $table_body_inp = $table_body.eq(0).find('th').eq(i).find('input');
                    Name=$table_body_inp.val().trim();
                    let origin_val = $table_body_inp.attr('origin_val').trim();
                    if(Name!=origin_val  && (transition_change.routes_id.indexOf(xml_id)==-1)){
                        transition_change.routes_id.push(xml_id);
                    }
                }
                Name = htmlspecialchars(Name);
                let tmp_obj={
                    LangCode:language,
                    Name:Name,
                    route_lang_id
                }
                RouteInfo.NameTable.push(tmp_obj);
            }
            for(var i=1; i<row_num; i++){  //站点
                let Station_id=$table_body.eq(i).attr('id');
                let lat=$table_body.eq(i).attr('lat');
                let lon=$table_body.eq(i).attr('lon');
                
                RouteInfo.StopAttr.push(Station_id);
                let tmp_obj={
                    ID:Station_id,
                    Lat:lat,
                    Lon:lon,
                    NameTable:[]
                }

                for(var j=1; j<col_num; j++){
                    let language=languages[j-1];
                    let Name;
                    if(language == 'en.US'){
                        Name=$table_body.eq(i).find('th').eq(j).text();
                    }else{
                        let $table_body_tr = $table_body.eq(i);
                        let station_id = $table_body_tr.attr('id');
                        Name=$table_body_tr.find('th').eq(j).find('input').val().trim();
                        let origin_val = $table_body_tr.find('th').eq(j).find('input').attr('origin_val').trim();
                        if(Name!=origin_val  && (transition_change.stations_id.indexOf(station_id)==-1)){
                            transition_change.stations_id.push(station_id);
                        }
                    }
                    Name = htmlspecialchars(Name);
                    let station_lang_id=Number($table_body.eq(i).find('th').eq(j).attr('station_lang_id'));
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
        //console.log(transition_change);
        var xml_id=$('#merge_route_info').attr('xml_id');  //路线id
        var filename=$('#merge_route_info').attr('filename');  //路线名称
        //console.log(all_data,xml_id,filename);
        if($(this).hasClass('noclick')){
            $('#zhezhao').fadeIn(1);
        }
        $.ajax({
            url:'/myroute/merge_routes_change_lang_xml',
            type:'post',
            data:{
                xml_id,
                filename,
                all_data,
                save_operation: chuandi_obj.save_operation,
                transition_change: transition_change
            },
            success:function(res){
                $('#zhezhao').fadeOut(1);
                if(res.msg=='ok'){
                    var changed_routes = res.changed_routes;  //所有需要更新的路线id
                    //console.log('返回的',changed_routes)
                    var $main_table_tr = $('#getDataTable table tbody tr');
                    if(changed_routes){
                        for(var i=0; i<$main_table_tr.length; i++){
                            let route_id = $main_table_tr.eq(i).attr('xml_id');
                            if(changed_routes.indexOf(route_id)!=-1){
                                $main_table_tr.eq(i).find('th.action a.xiazai span.need_update').addClass('fadein');
                            }
                        }
                    }

                    if(res.web_addr){  //更新下载地址
                        var addr=res.web_addr;
                        var download_filename=addr.split('\/')[addr.split('\/').length-1];
                        var $main_table_tr=$('#getDataTable table tbody tr');
                        for(var i=0; i<$main_table_tr.length; i++){
                            let _this_xml_id = $main_table_tr.eq(i).attr('xml_id');
                            if(xml_id == _this_xml_id){
                                $main_table_tr.eq(i).find('th.action a.xiazai')
                                .attr({'href':addr,"download":download_filename})
                                .find('i.download').removeClass('noclick')
                                .siblings('span.need_update').removeClass('fadein');
                                break;
                            }
                        }
                    }

                    if(is_compleate_transition){  //如果翻译全部完成
                        $('#merge_route_info .modal-footer button.confirm').removeClass('disabled')
                        .addClass('btn-primary')
                        .removeClass('noclick')  //表示禁止点击
                        .css({color:'white'});
                        //保存成功的返回信息
                        if(chuandi_obj.operation_by_myself){
                            let Complete_translation;
                            if(chuandi_obj.save_operation){ //来自于save按钮触发的
                                Complete_translation = i18next.t('Save_success');
                            }else{
                                Complete_translation = i18next.t('Can_download');
                            }
                            $('#merge_route_info .submit_waring').stop(false,true).slideUp(1000);
                            $('#merge_route_info .submit_success')
                            .text(Complete_translation).slideDown(1000);
                            setTimeout(function(){
                                $('#merge_route_info .submit_success').stop(true).slideUp();
                            },2500);
                        }
                    }else{
                        if(chuandi_obj.save_operation && chuandi_obj.operation_by_myself){
                            let Complete_translation = i18next.t('Complete_translation');
                            $('#merge_route_info .submit_waring').stop(true)
                            .text(Complete_translation).slideDown(1000);
                            setTimeout(function(){
                                $('#merge_route_info .modal-footer .submit_waring').slideUp(500)
                            },3000)
                        }
                    }

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
    //点击合并的save按钮，触发Comfirm按钮
    $('#merge_route_info .modal-footer button.save').click(function(e){
        e.stopPropagation();
        $('#merge_route_info .modal-footer button.confirm').trigger('click',{operation_by_myself:true,save_operation:true});
    });
}


module.exports={
    merge_routes,
    route_info_click_confirm
}