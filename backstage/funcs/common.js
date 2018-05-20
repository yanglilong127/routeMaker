const fs=require('fs');

/** 读取文件夹占用空间大小
 * 参数 为文件夹地址
 * **/
function dirSize(dst){
	var totalSize=0;   //空间大小 字节
	readFileSize(dst);
	function readFileSize(dst){
		var paths=fs.readdirSync(dst);
		for(var i=0; i<paths.length; i++){
			var stats=fs.statSync(dst+'/'+paths[i]);
			if(stats.isFile()){   //如果是文件
				totalSize+=stats.size;
			}else{
				readFileSize(dst+'/'+paths[i]);
			}
		}
	}
	return totalSize;
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

//删除整个文件夹
function del(dst){
    var arr=fs.readdirSync(dst);
    for(var i in arr){
        //读取文件信息，以便于判断是否是一个文件或目录
        var stats=fs.statSync(dst+'/'+arr[i]);
        if(stats.isFile()){
            //判断为真，是文件则执行删除文件
            fs.unlinkSync(dst+'/'+arr[i]);
        }else{
            //判断为假就是文件夹，就调用自己，递归的入口
            del(dst+'/'+arr[i]);
        }
    }
    //删除空目录
    fs.rmdirSync(dst);
}



module.exports={
    dirSize,
	forMatDate,
	del
}