//根据经纬度搜索城市地名
//API:  http://maps.google.cn/maps/api/geocode/json?latlng=30.603487,114.492305&language=CN


/** 根据经纬度搜索地名
 * 参数1 为经纬度的参数
 * 参数2 为搜索的语言
 * **/
//var api_url='http://maps.google.cn/maps/api/geocode/json?'; 
var api_url= 'http://ditu.google.cn/maps/api/geocode/json?';
function search_place(latlng,language='EN'){
    var lat = latlng.lat; //纬度
    var lng = latlng.lng; //经度
    var detail_address=''; //详细地址
    return new Promise(function(resolve,reject){
        $('#zhezhao').fadeIn(1);
        getLocation();
        //请求数据
        function getLocation(){
            $.ajax({
                url : api_url +"latlng="+ lat+ "," +lng +"&language="+language,
                type:'get',
                dataType:'json',
                success:function(res){
                    //$('#zhezhao').fadeOut(1);
                    if(res.status=='OK'){
                        var results=res.results[0].address_components;  //返回的数组结果
                        var result_len = results.length; 
                        for(var i=result_len-1; i>=0; i--){
                            var types = results[i].types;
                            if(types.indexOf('country')!=-1){
                                detail_address += results[i].long_name;
                            }else if(types.indexOf('administrative_area_level_1')!=-1){
                                detail_address += ','+ results[i].long_name;
                            }else if(types.indexOf('locality')!=-1){
                                detail_address += ','+ results[i].long_name;
                            }
                        };
                        resolve(detail_address);
                    }else{
                        //reject('err');
                        //如果请求不到数据就再次请求
                        getLocation();
                    }
                }
            });
        }
    });
}


/**
 * 根据地名搜索经纬度**/
function search_latlng(place,language='EN'){
    var latLng = {};  //经纬度
    
    return new Promise(function(resolve,reject){
        $('#zhezhao').fadeIn(1);
        getLat_lng();
        function getLat_lng(){
            $.ajax({
                url : api_url +"address="+ place+"&language="+language,
                type:'get',
                dataType:'json',
                success:function(res){
                    //$('#zhezhao').fadeOut(1);
                    if(res.status=='OK'){
                        var results=res.results;  //返回的数组结果
                        for(var i=0; i<results.length; i++){
                            var types = results[i].types;
                            if(types.indexOf('university')!=-1){
                                latLng = {
                                    lat : results[i].geometry.location.lat,
                                    lng : results[i].geometry.location.lng
                                }
                                resolve(latLng);
                                break;
                            }else if(types.indexOf('sublocality_level_1')!=-1){
                                latLng = {
                                    lat : results[i].geometry.location.lat,
                                    lng : results[i].geometry.location.lng
                                }
                                resolve(latLng);
                                break;
                            }else if(types.indexOf('locality')!=-1 || types.indexOf('administrative_area_level_2')!=-1){ //是城市
                                latLng = {
                                    lat : results[i].geometry.location.lat,
                                    lng : results[i].geometry.location.lng
                                }
                                resolve(latLng);
                                break;
                            }else if(types.indexOf('administrative_area_level_1')!=-1){
                                latLng = {
                                    lat : results[i].geometry.location.lat,
                                    lng : results[i].geometry.location.lng
                                }
                                resolve(latLng);
                                break;
                            }else if(types.indexOf('country')!=-1){
                                latLng = {
                                    lat : results[i].geometry.location.lat,
                                    lng : results[i].geometry.location.lng
                                }
                                resolve(latLng);
                                break;
                            }else{  //非城市
                                continue;
                            }
                        }
                    }else{
                        //reject('err');
                        getLat_lng();
                    }
                }
            });
        }
    });
}

module.exports={
    search_place,
    search_latlng
}