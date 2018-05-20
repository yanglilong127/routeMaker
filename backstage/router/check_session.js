//检查是否存在session

const fs=require('fs');

var check_session=function(req,res,callback){
    
    var sz=req.session['user_sz'];
    var username=req.session['user_name'];
    if(sz && username){  //session存在
        req.session._garbage=Date.now();  //更新session过期时间
        if(typeof(callback)=='function'){
            callback('ok');
        }
        
    }else{
        if(typeof(callback)=='function'){
            callback('no');
        }
    }       
    
};



module.exports={
    check_session
}