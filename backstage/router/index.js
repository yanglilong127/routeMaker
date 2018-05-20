//主路由请求

const fs=require('fs');

//登录验证等
const my_authRequest=require('./auth_request');
//连接管理xml文件信息的脚本
const my_xmlManager=require('./xml_manager');
//连接站点管理的脚本
const my_stationManager=require('./stations_manage');
//公司站点统一管理
const my_companyStationManager=require('./company_station_manager');
const my_login_registry=require('./login_out_registry');


var myrouter=function(server){
    server.use((req,res,next)=>{
        req.session._garbage=Date.now();  //更新session过期时间
        next();
    });

    //登录验证
    my_authRequest.some_req_event(server);
    
    //管理xml
    my_xmlManager.xmlManager(server);
    
    //站点管理
    my_stationManager.station_manage(server);

    //公司站点统一管理
    my_companyStationManager.station_manage(server);

    my_login_registry.login_registry(server);

};



module.exports={
    myrouter
}