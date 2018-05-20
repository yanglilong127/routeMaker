//用到的公共函数

//将url路径search参数转为json对象形式
function parseQueryString(url){
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(url),
    ret = {};
    if(arr_url && arr_url[1]) {
        var str_para = arr_url[1], result;
        while ((result = reg_para.exec(str_para)) != null) {
        ret[result[1]] = result[2];
        }
    }
    return ret;
}

/**** 产生随机数据
 * 参数表示获取几位字符串
 * *** */
function get_random(length){
    var suiji=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
                'q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F',
                'G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V',
                'W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];
    var result='';
    for(var i=0; i<length; i++){
        var suiji_len=suiji.length;  //随机数组的长度
        var xiabiao=parseInt(Math.random()*suiji_len);
        result += suiji[xiabiao];
    }
    return result;
}

//存储空间转换  字节转换为KB、MB、GB..
//参数为数字型的字节
function byte2(size){
    if(size<1024)
        size=size+'B';
    else if(size<1024*1024)
        size=Math.round(size*10/1024)/10+'KB';     //保留小数点后一位
    else if(size<1024*1024*1024)
        size=Math.round(size*10/(1024*1024))/10+'MB';
    else
        size=Math.round(size*10/(1024*1024*1024))/10+'GB';
    return size;
}

//将数字都转换为两位的
function num2double(number){
    number=(number.toString().length==2) ? number : ('0'+number);
    return number;
}

//将标准时间转换格式 2017/07/27 08:20:08
//参数2是默认导出格式
function forMatDate(date,default_val=true){  //中国标准时间对象
    var year=date.getFullYear();
    var month=num2double(date.getMonth()+1);
    var dat=num2double(date.getDate());
    var hours=num2double(date.getHours());
    var min=num2double(date.getMinutes());
    var sen=num2double(date.getSeconds());
    if(default_val){
        date=year+'/'+month+'/'+dat+' '+hours+':'+min+':'+sen;
    }else{
        date=year+month+dat+hours+min+sen;
    }
    
    return date;
}

/** 
 * 计算两点之间距离 
 * @param start 
 * @param end 
 * @return 米 
**/  
function getDistance(latLng_start,latLng_end){  
    var lat1 = (Math.PI/180)*latLng_start.lat;  
    var lat2 = (Math.PI/180)*latLng_end.lat;  
        
    var lon1 = (Math.PI/180)*latLng_start.lng;  
    var lon2 = (Math.PI/180)*latLng_end.lng;  
    //地球半径  
    var R = 6371;  
        
    //两点间距离 km，如果想要米的话，结果*1000就可以了  
    var d =  Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1))*R;  
        
    return d*1000;  
} 



/**
 * 检查站点的唯一性
 * **/
function check_station(latLng){
    var lat = latLng.lat;
    var lng = latLng.lng;
    var latLng_sum = lat + lng;
    for(var i=0; i<window.company_markers.length; i++){
        var tmp_latLng=window.company_markers[i].getPosition();
        var tmp_lat = parseInt(tmp_latLng.lat()*1000000)/1000000;
        var tmp_lng = parseInt(tmp_latLng.lng()*1000000)/1000000;
        var tmp_latLng_sum = tmp_lat + tmp_lng;
        if(latLng_sum === tmp_latLng_sum || (lat===tmp_lat && lng===tmp_lng) ){
            latLng.lat += 0.000001;
            check_station(latLng);
        }
    }
    latLng = {
        lat: parseInt(latLng.lat*1000000)/1000000,
        lng: parseInt(latLng.lng*1000000)/1000000,
    }
    return latLng;
}

/**
 * 计算站点id(唯一性)=(公司id *1000+经度+纬度)* 1000000
 * @param company_id 公司id
 * @latLng 经纬度
 * @markers 标记数组
 * @except_itself 是否检查自己这个标记
 * **/
function cal_station_id(company_id,latLng,the_markers,except_itself=false){
    //经纬度保留6位小数
    var lat = latLng.lat();
    lat = parseInt(lat*1000000)/1000000;
    var lng = latLng.lng();
    lng = parseInt(lng*1000000)/1000000;

    latLng = {
        lat:lat,
        lng:lng
    }
    latLng = check_station(latLng);
    if( check_marker_area(latLng,the_markers,except_itself) ){
        var station_id = parseInt((company_id *1000+lat+lng)* 1000000);
        return {
            station_id,
            latLng
        };
    }else{
        return false;
    }
}

/**
 * 检查要增加的标记周围附近是否有其他标记
 * 参数1 经纬度对象
 * 参数2 所有标记数组
 * 参数3 是否检查自己这个标记
 * 参数4 单位米 默认100米
 * **/
function check_marker_area(latLng,the_markers,except_itself,area=100){
    for(var i=0; i<the_markers.length; i++){
        var end_latLng=the_markers[i].getPosition();
        var station_id = the_markers[i].station_id;
        if(except_itself == station_id){ //不检查自己
            continue;
        }
        var end_lat = parseInt(end_latLng.lat()*1000000)/1000000;
        var end_lng = parseInt(end_latLng.lng()*1000000)/1000000;
        end_latLng = {
            lat:end_lat,
            lng:end_lng
        }
        //计算两点之间的距离
        var distance = getDistance(latLng,end_latLng);
        if(distance < area){
            return false;
        }
    }
    return true;
};

//html字符串转换为 HTML 实体
function htmlspecialchars(str) {        
    var s = "";  
    if (str.length == 0) 
        return "";  
    for(var i=0; i<str.length; i++)  
    {  
        switch(str.substr(i,1))  
        {  
            case "\"": s += "&quot;"; break; 
            case "\'": s += "&apos;"; break;
            default: s += str.substr(i,1); break;  
        }  
    }  
    return s;  
}

//HTML实体 转换为 html字符串
function htmlspecialchars_decode(str){ 
    str = str.replace(/&quot;/g, "\"");  
    str = str.replace(/&apos;/g, "\'"); 
    return str;  
}

module.exports={
    parseQueryString,
    get_random,
    byte2,
    forMatDate,
    getDistance,
    cal_station_id,
    htmlspecialchars,
    htmlspecialchars_decode
}