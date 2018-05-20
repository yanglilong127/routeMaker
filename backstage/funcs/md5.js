//md5加密函数

const crypto=require('crypto');

//加密
function md5(str){
    var obj=crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
}

module.exports={
    MD5_SUFFIX: 'DFFDFfscs23rstt44f杨aAd利龙fr%244556%^&&dd',//加密前缀，任意写
    md5
}