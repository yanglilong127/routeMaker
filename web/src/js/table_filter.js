//对表格进行过滤功能

function filterTable() {
    //清除选中样式并显示
    $('#marked_stations .search_data input.filter').val('');
    $('#marked_stations tbody tr').fadeIn(1)
        .find('td').removeClass('filter');

    //监听输入内容
    $('#marked_stations .search_data input.filter').get(0).oninput=function(e){
        e.preventDefault();
        var inp_val=$(this).val().trim().toLowerCase();
        if(inp_val){  //有内容
            $('#marked_stations .search_data i.clear_text').fadeIn(1);
            var $tbody_tr= $('#marked_stations tbody tr');
            for(var i=0; i<$tbody_tr.length; i++){
                if($tbody_tr.eq(i).text().toLowerCase().indexOf(inp_val)!= -1){ //如果搜索到了
                    $tbody_tr.eq(i).fadeIn(1).addClass('isShow');  //显示
                    var $tbody_tr_td=$tbody_tr.eq(i).children('td');
                    for(var j=0; j<$tbody_tr_td.length; j++){
                        var td_text=$tbody_tr_td.eq(j).text().trim().toLowerCase();
                        if(td_text.indexOf(inp_val)!= -1 ){
                            $tbody_tr_td.eq(j).addClass('filter');
                        }else{
                            $tbody_tr_td.eq(j).removeClass('filter');
                        }
                    }
                }else{
                    $tbody_tr.eq(i).fadeOut(1).removeClass('isShow');  //隐藏
                }
            }
            //获取搜索到的结果条数
            var showNum = $('#marked_stations tbody tr.isShow').length;
            $('#search_station_numbers').text(showNum);
            //console.log(showNum)
            if(showNum === 0){  //表格没有数据时显示没有搜到结果
                $('#company_stations tfoot').fadeIn(1);
            }else{
                $('#company_stations tfoot').fadeOut(1);
            }
        }else{
            $('#marked_stations .search_data i.clear_text').fadeOut(1);
            $('#marked_stations tbody tr').fadeIn(1)
            .find('td').removeClass('filter');
        }
    };
    /* //使用的
    $('#chosen_stations .search_data input.filter').get(0).oninput=function(e){
        e.preventDefault();
        var inp_val=$(this).val().trim().toLowerCase();
        if(inp_val){  //有内容
            $('#chosen_stations .search_data i.clear_text').fadeIn(1);
            var $tbody_tr= $('#chosen_stations tbody tr');
            for(var i=0; i<$tbody_tr.length; i++){
                if($tbody_tr.eq(i).text().toLowerCase().indexOf(inp_val)!= -1){ //如果搜索到了
                    $tbody_tr.eq(i).fadeIn(1).addClass('isShow');  //显示
                    var $tbody_tr_td=$tbody_tr.eq(i).children('td');
                    for(var j=0; j<$tbody_tr_td.length; j++){
                        var td_text=$tbody_tr_td.eq(j).text().trim().toLowerCase();
                        if(td_text.indexOf(inp_val)!= -1 ){
                            $tbody_tr_td.eq(j).addClass('filter');
                        }else{
                            $tbody_tr_td.eq(j).removeClass('filter');
                        }
                    }
                }else{
                    $tbody_tr.eq(i).fadeOut(1).removeClass('isShow');  //隐藏
                }
            }
            //获取搜索到的结果条数
            var showNum = $('#chosen_stations tbody tr.isShow').length;
            $('#pageShow .info_show span.total').text(showNum);
            //console.log(showNum)
            if(showNum == 0){  //表格没有数据时显示没有搜到结果
                $('#company_stations tfoot').fadeIn(1);
            }else{
                $('#company_stations tfoot').fadeOut(1);
            }
        }else{
            $('#chosen_stations .search_data i.clear_text').fadeOut(1);
            $('#chosen_stations tbody tr').fadeIn(1)
            .find('td').removeClass('filter');
        }
    }; */
    //点击表格输入框叉叉
    $('#marked_stations .search_data i.clear_text').unbind('click');
    $('#marked_stations .search_data i.clear_text').bind('click',function(e){
        e.stopPropagation();
        $('#marked_stations .search_data input.filter').val('');
        $('#marked_stations .search_data i.clear_text').fadeOut(1);
        $('#marked_stations tbody tr').fadeIn(1)
        .find('td').removeClass('filter');
        //数据原本条数
        var showNum = $('#marked_stations tbody tr').length;
        $('#search_station_numbers').text(showNum);
        if(showNum == 0){  //表格没有数据时显示没有搜到结果
            $('#company_stations tfoot').fadeIn(1);
        }else{
            $('#company_stations tfoot').fadeOut(1);
        }
    });
    //点击表格中的搜索图标按钮
   /*  $('#marked_stations .search_data i.serach').click(function(e){
        e.stopPropagation();
        var inp_val=$('#marked_stations .search_data input.filter').val().trim();
        if(inp_val){
            window.my_company_stations.get_company_station(my_company_stations.nums_limit,1, inp_val);
        }
    }); */
};


function Used_stations_filter(){
    //清除选中样式并显示
    $('#chosen_stations .search_data input.filter').val('');
    $('#chosen_stations tbody tr').fadeIn(1)
        .find('td').removeClass('filter');

    //监听输入内容
    $('#chosen_stations .search_data input.filter').get(0).oninput=function(e){
        e.preventDefault();
        var inp_val=$(this).val().trim().toLowerCase();
        if(inp_val){  //有内容
            $('#chosen_stations .search_data i.clear_text').fadeIn(1);
            var $tbody_tr= $('#chosen_stations tbody tr');
            for(var i=0; i<$tbody_tr.length; i++){
                if($tbody_tr.eq(i).text().toLowerCase().indexOf(inp_val)!= -1){ //如果搜索到了
                    $tbody_tr.eq(i).fadeIn(1).addClass('isShow');  //显示
                    var $tbody_tr_td=$tbody_tr.eq(i).children('td');
                    for(var j=0; j<$tbody_tr_td.length; j++){
                        var td_text=$tbody_tr_td.eq(j).text().trim().toLowerCase();
                        if(td_text.indexOf(inp_val)!= -1 ){
                            $tbody_tr_td.eq(j).addClass('filter');
                        }else{
                            $tbody_tr_td.eq(j).removeClass('filter');
                        }
                    }
                }else{
                    $tbody_tr.eq(i).fadeOut(1).removeClass('isShow');  //隐藏
                }
            }
            //获取搜索到的结果条数
            var showNum = $('#chosen_stations tbody tr.isShow').length;
            $('#search_route_numbers').text(showNum);
            //console.log(showNum)
            if(showNum === 0){  //表格没有数据时显示没有搜到结果
                $('#company_used_stations tfoot').fadeIn(1);
            }else{
                $('#company_used_stations tfoot').fadeOut(1);
            }
        }else{
            $('#chosen_stations .search_data i.clear_text').fadeOut(1);
            $('#chosen_stations tbody tr').fadeIn(1)
            .find('td').removeClass('filter');
        }
    };
    //点击表格输入框叉叉
    $('#chosen_stations .search_data i.clear_text').unbind('click');
    $('#chosen_stations .search_data i.clear_text').bind('click',function(e){
        e.stopPropagation();
        $('#chosen_stations .search_data input.filter').val('');
        $('#chosen_stations .search_data i.clear_text').fadeOut(1);
        $('#chosen_stations tbody tr').fadeIn(1)
        .find('td').removeClass('filter');
        //数据原本条数
        var showNum = $('#chosen_stations tbody tr').length;
        $('#search_route_numbers').text(showNum);
        if(showNum == 0){  //表格没有数据时显示没有搜到结果
            $('#company_used_stations tfoot').fadeIn(1);
        }else{
            $('#company_used_stations tfoot').fadeOut(1);
        }
    });
}

module.exports = {
    filterTable,
    Used_stations_filter
}