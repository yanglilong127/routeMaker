//company语言操作事件
/* import {countries} from '../configs/setting';  //所有国家，cloud登录地址

$('#route_info,#merge_route_info').modal({
    show:false,
    backdrop:false  //元素用于提供一个可点击的区域，点击此区域就即可关闭模态框。
});

//点击Language按钮使语言选择框显示
$('#choose_language p.button_choose button.language').click(function(e){
    e.stopPropagation();
    $('#language_lists_box').fadeIn();
});
//语言选择框可以拖动
$('#language_lists_box').draggable({
    "containment":'.outerbox1'
});
//点击语言选择的叉叉
$('#language_lists_box p.title_info i').click(function(e){
    e.stopPropagation();
    $('#language_lists_box').fadeOut(); //隐藏
});
//语言列表
for(var key in countries){
    var $li='<li class="language">'
            + '<span class="this_country">'+key+'</span>'
            + '<i class="icon route_iconfont route_icon-you"></i>'
            + '<ul class="country">';
    for(var key1 in countries[key]){
        $li +='<li class="country_text" callname="'+countries[key][key1]+'"><span>'
                +key1+'</span><i class="icon route_iconfont"></i></li>';
    }
    $li += '</ul></li>';
    $('#language_lists_box ul.choose_my_language').append($li); //一次性选择多国语言
}

//点击列表语言
$('#language_lists_box ul.choose_my_language li.language ul li.country_text').click(function(e){
    e.stopPropagation();
    var jianchen=$(this).attr('callname');  //语言代码简称
    if(jianchen =='en.US')  //这个点击无效
        return;
    var $chosen_i=$(this).find('i.icon');
    var xml_id=$('#route_info').attr('xml_id');
    var $stations_tb=$('#language_table tbody tr');
    var stations=[];
    for(var i=1; i<$stations_tb.length; i++){
        var station_id=$stations_tb.eq(i).attr('id');
        stations.push(station_id);
    }
    if(!$chosen_i.hasClass('route_icon-xuanzhong')){  //添加语言
        $chosen_i.addClass('route_icon-xuanzhong'); //添加选中样式
        var language_len=$('#choose_language .language_box ul.chosen li.language').length;
        $.ajax({
            url : '/myroute/add/language',
            type:'post',
            data:{
                xml_id,
                jianchen,
                stations,
                xml_id,
                language_num:language_len+1 //语言数目
            },
            success:function(res){
                if(res.msg=='ok'){
                    var route_lang_id=res.route_lang_id; //该路线的对应语言id
                    var stations_data=res.stations_data;  //站点的ID和station_id数组
                    console.log(stations_data)
                    var li=`<li class="language">
                                <span>${jianchen}</span>
                                <i class="icon route_iconfont route_icon-shanchu"></i>
                            </li>`;
                    var $language_ul=$('#choose_language .language_box ul.chosen');
                    $language_ul.find('.clear').before($(li));
                    delete_language();  //使点击删除图标有效
                    //表格中头部语言添加一列
                    $('#language_table thead tr').append($(`<th route_lang_id=${route_lang_id}>${jianchen}</th>`));
                    var cols_len= $('#language_table thead tr th').length;
                    var $table_row=$('#language_table tbody tr'); //表格的行数
                    for(var i=0; i<$table_row.length; i++){
                        var th;  //列内容
                        if(i==0){
                            th=`<th>
                                    <input type="text" class="form-control" value=''>
                                </th>`;
                        }else{
                            var head_id=$table_row.eq(i).attr('id');
                            var station_lang_id;
                            var sta_transition='';
                            for(var j=0; j<stations_data.length; j++){
                                let ret_station_id=stations_data[j].station_id;
                                let ID=stations_data[j].ID;
                                let transition=stations_data[j].transition;
                                if(ret_station_id === head_id){
                                    station_lang_id = ID;
                                    sta_transition = transition;
                                    break;
                                }
                            }
                            th=`<th station_lang_id='${station_lang_id}'>
                                    <input type="text" class="form-control" value=${sta_transition}>
                                </th>`;
                        }
                        $('#language_table tbody tr').eq(i).append($(th));
                    }
                    //改变语言的数目
                    language_len=$('#choose_language .language_box ul.chosen li.language').length;
                    var $route_table=$('#getDataTable table tbody tr');
                    for(var i=0; i<$route_table.length; i++){
                        var route_id=$route_table.eq(i).attr('xml_id');
                        if(route_id ==xml_id){
                            $route_table.eq(i).find('th.language_num').text(language_len);
                            break;
                        }
                    }
                    //触发点击确定
                    $('#route_info .modal-footer button.confirm').trigger('click');
                }else if(res.msg=='err'){
                    window.location=login_url;
                }
            }
        });
    }else{    //删除语言
        request_delete_language(jianchen);
    }   
});

//点击Choose Language按钮弹出模态框
$('.box1 .home button.language').click(function(e){
    e.stopPropagation();
    $('#zhezhao').fadeIn(1);
    //先清空表格内容
    $('#language_table thead tr th:gt(0)').remove();
    $('#language_table tbody tr').remove()
    //清空已选择的语言
    $('#choose_language .language_box ul li.language').remove();
    $('#language_lists_box .languages_left li.country_text i.icon').removeClass('route_icon-xuanzhong');
     //请求数据
     $.ajax({
        url: '/myroute/company_stations_get_transition',
        type:'post',
        data:{},
        success:function(res){
            $('#zhezhao').fadeOut(1);  //遮罩隐藏
            if(res.msg=='ok'){
                $('#route_info').modal('show');
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
                                    <input type="text" class="form-control" value='${name}'>
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
                                    th=`<th station_lang_id=${_ID}>
                                            <input type="text" class="form-control" value='${_transition}'>
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
                $('#route_info .modal-footer button.confirm').trigger('click',false);
                setTimeout(function(){
                    $('#route_info').removeClass('click_comfirm');
                },1000);
            }else if(res.msg=='err'){
                window.location=login_url;
            }
        }
    });
}); */