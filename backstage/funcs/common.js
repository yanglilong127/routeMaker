const fs=require('fs');
const event_poll=require('../router/dbHelper');  //事务回滚

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

//IP地址获取以及切片
function get_IP(req){
    var IP_addr = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;;  //IP地址
    IP_addr = IP_addr.toString().split('');
    IP_addr = IP_addr.slice(IP_addr.lastIndexOf(':')+1).join('');
    return IP_addr;
}

//对历史记录的操作
/**
 * 参数1 req
 * 参数2 operation_order String 操作指令
 * 参数3 数组，需要批量操作表的数组
 * 参数
 * 
 * **/
function operation_history(req,operation_order,sqlParamsEntity,detail_desc,route_name){
    var sz=req.session['user_sz'];
    var username=req.session['user_name']; //用户名
    var IP_addr = get_IP(req);
    var operation_order = operation_command[operation_order.toString()];
    var table_name="operation_history";

    route_name = route_name? route_name: "";
    var sql = `INSERT INTO ${table_name}(route_name,username,
            oper_time,operation,detail,IP) VALUES("${route_name}",
            "${username}",NOW(),"${operation_order}","${detail_desc}",'${IP_addr}')`;
    
    sqlParamsEntity.push(event_poll._getNewSqlParamEntity(sql));
    return sqlParamsEntity;
}

//操作指令对应表
var operation_command= {
    "1": "Create New Route",
    "2": "Create Merge Route",
    "3": "Rename Route",
    "4": "Change Description",
    "5": "Add Language",
    "6": "Subside Language",
    "7": "Change Stops Translation",
    "8": "Clone Route",
    "9": "Download XML File",
    "10": "Delete Route",
    "11": "Add Company Stop",
    "12": "Add Route Stop",
    "13": "Delete Route Stop",
    "14": "Sortable Route Stop",
    "15": "Save Stop Information",
    "16": "Change Stop Information",
    "17": "Delete Company Stop"
}


module.exports={
    dirSize,
	forMatDate,
	del,
    get_IP,
    operation_history,
    operation_command
}