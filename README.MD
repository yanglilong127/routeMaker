# 系统需要安装环境

1. nodejs(需带npm，版本6以上)
2. mysql


# 在项目根目录执行命令
1. npm install(安装项目所需要的包,在linux服务器上操作时，如果用户权限不够，可加sudo)
2. npm run build(打包前端项目)
3. node routemaker(开启后台)
## 注：第三步如果服务挂掉，项目就会停止，所以我们一把我们会使用守护进程方式：
## 上面的第三步不做。继续做下面的两步。
3. npm install -g forever(全局安装包)
4. forever -e ./log/err.log -a start routemaker.js




# 注：新项目需手动删除 web/dist/myroute/profiles文件夹里的内容
# 注：数据库初始会需要一个user_table表，如果其他表存在，，则其他表全部删除


## 数据库连接的配置文件，更改即可
    - backstage/router/databaseConnection.js 
## 端口默认是55566，如果需要更改连接端口以及服务器端IP地址
    - web/src/cofigs/setting.js 文件更改server_ip变量值即可

