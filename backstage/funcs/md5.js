//md5加密函数

const crypto=require('crypto');

//加密
function md5(str){
    var obj=crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
}

module.exports={
    md5
}