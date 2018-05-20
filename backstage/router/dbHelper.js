//实现事务处理

const async =require('async');
const pool =require('./databaseConnection').pool;

/**
 * 参数1 sql语言数组
 * 参数2 回调函数
 * **/
function execTrans(sqlparamsEntities, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            return callback(err, null);
        }
        connection.beginTransaction(function (err) {
            if (err) {
                return callback(err, null);
            }
            //console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
            var funcAry = [];
            sqlparamsEntities.forEach(function (sql_param) {
                var temp = function (cb) {
                    var sql = sql_param.sql;
                    var param = sql_param.params;
                    connection.query(sql, param, function (tErr, rows, fields) {
                        if (tErr) {
                            connection.rollback(function () {
                                console.log("事务失败，" + sql_param + "，ERROR：" + tErr);
                                throw tErr;
                            });
                        } else {
                            return cb(null, 'ok');
                        }
                    })
                };
                funcAry.push(temp);
            });

            async.series(funcAry, function (err, result) {
                if (err) {
                    connection.rollback(function (err) {
                        console.log("transaction error: " + err);
                        connection.release();
                        return callback(err, null);
                    });
                } else {
                    connection.commit(function (err, info) {
                        //console.log("transaction info: " + JSON.stringify(info));
                        if (err) {
                            console.log("执行事务失败，" + err);
                            connection.rollback(function (err) {
                                console.log("transaction error: " + err);
                                connection.release();
                                return callback(err, null);
                            });
                        } else {
                            connection.release();
                            return callback(null, info);
                        }
                    })
                }
            })
        });
    });
}

//初始化sql & params：
function _getNewSqlParamEntity(sql, params, callback) {
    if (callback) {
        return callback(null, {
            sql: sql,
            params: params
        });
    }
    return {
        sql: sql,
        params: params
    };
}

/* //如果你要执行多条sql语句，则需要：
var sqlParamsEntity = [];
//var sql1 = "insert table set a=?, b=? where 1=1";
//var param1 = {a:1, b:2};
//sqlParamsEntity.push(_getNewSqlParamEntity(sql1, param1));
execTrans(sqlParamsEntity, function(err, info){
    if(err){
       console.error("事务执行失败");
    }else{
       console.log("done.");
       console.log(info);
       ret = info;
    }
}); */

module.exports = {
    execTrans: execTrans,
    _getNewSqlParamEntity
}