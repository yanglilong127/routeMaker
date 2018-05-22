const path=require('path');
const webpack=require('webpack');
//创建html文件
const HtmlWebpackPlugin=require('html-webpack-plugin');
//提取css文件
const ExtractTextPlugin=require('extract-text-webpack-plugin');
const ExtractCSS=new ExtractTextPlugin({filename:'css/[name].css'});
const CopyWebpackPlugin=require('copy-webpack-plugin');
//当前npm运行的命令,判断是否是开发模式
var isDev=process.env.NODE_ENV==='dev'

module.exports={
	entry:{
		index:path.join(__dirname,'web/src/js/index.js'),
		routemaker:path.join(__dirname,'web/src/js/routemaker.js'),
		routedrive:path.join(__dirname,'web/src/js/routedrive.js'),
		companyStation:path.join(__dirname,'web/src/js/companyStation.js'),
		//分页插件
		pagination:path.join(__dirname,'web/src/libs/js/jquery.pagination.min.js'),
		bootstrapjs:path.join(__dirname,'web/src/libs/js/bootstrap.min.js'),
		common_jq:[
			path.join(__dirname,'web/src/libs/js/jquery-3.2.1.min.js'),
			path.join(__dirname,'web/src/libs/js/jquery-ui.js')
		],
		jq_validate:path.join(__dirname,'web/src/libs/js/jquery.validate.js'),
		//地图聚类标记
		markerclusterer:path.join(__dirname,'web/src/libs/js/markerclusterer.js'),
		//全球语言匹配
		xregexp:path.join(__dirname,'web/src/libs/js/xregexp-all.js'),
		login:path.join(__dirname,'web/src/js/login.js'),
		register:path.join(__dirname,'web/src/js/register.js')
	},
	output:{
		path:path.join(__dirname,'web/dist/myroute'),
		filename:'js/[name].js',
		publicPath:'/myroute/'
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:[{
					loader:'babel-loader',
					options:{presets:['es2015']}
				}]
			},
			{
				test:/\.html$/,
				loader:'html-loader'
			},
			{
				test:/\.css$/,
				exclude:/node_modules/,
				use:ExtractCSS.extract([
					{
						loader: 'css-loader',
						options:{
							minimize:true  //css压缩
						}
					},
					'less-loader',
					{
						loader:'postcss-loader',
						options: {
			                postcss: function(){
			                    return [
			                        require("autoprefixer")({
			                            browsers: ['ie>=8','>1% in CN']
			                        })
			                    ]
			                }
			            }
					}
				])
			},
			{
				test:/\.(eot|svg|ttf|woff|woff2)$/,
				loader:'file-loader',
				options:{
					limit:5000,
					name:'font/[name].[ext]'
				}
			},
			{
				test:/\.(jpeg|jpg|gif|png|svg)$/,
				loader:'file-loader?name=images/[name].[ext]'
			}
		]
	},
	/****
	postcss: [require("autoprefixer")({
                    browsers: ['ie>=8','>1% in CN']
            })],
    *****/
	resolve:{
		alias:{
			jquery:path.join(__dirname,'web/src/libs/js/jquery-3.2.1.min.js'),
			xregexp:path.join(__dirname,'web/src/libs/js/xregexp-all.js'),
			//"socket.io":path.join(__dirname,'web/src/libs/js/socket.io.js'),
			jqueryuicss:path.join(__dirname,'web/src/libs/css/jquery-ui.css'),
			bootstrapcss:path.join(__dirname,'web/src/libs/css/bootstrap.css'),
			indexcss:path.join(__dirname,'web/src/css/index.css')
		}
	},
	plugins:[
		ExtractCSS,
		//xml主页
		new HtmlWebpackPlugin({
			minify: {
				//removeAttributeQuotes:true, //取出属性引号
				removeComments:true  //去除注释
			},
			filename:'index.html',  //输出文件名称
			template:path.join(__dirname,'web/src/index.html'), //模版位置
			inject:true,
			chunks:['common_jq','pagination','bootstrapjs','xregexp','index'],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ['common_jq','pagination','bootstrapjs','xregexp','index'];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;  
			}
		}),
		//routeMaker编辑页面
		new HtmlWebpackPlugin({
			minify: {
				//removeAttributeQuotes:true, //取出属性引号
				removeComments:true  //去除注释
			},
			filename:'html/routeMaker.html',
			template:path.join(__dirname,'web/src/html/routeMaker.html'),
			inject:true,
			chunks:['common_jq','pagination','markerclusterer','bootstrapjs','routemaker'],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ['common_jq','pagination','markerclusterer','bootstrapjs','routemaker'];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;  
			}
		}),
		//公司站点管理
		new HtmlWebpackPlugin({
			minify: {
				//removeAttributeQuotes:true, //取出属性引号
				removeComments:true  //去除注释
			},
			filename:'html/companyStation.html',
			template:path.join(__dirname,'web/src/html/company_station.html'),
			inject:true,
			chunks:['common_jq','pagination','markerclusterer','bootstrapjs','companyStation'],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ['common_jq','pagination','markerclusterer','bootstrapjs','companyStation'];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;  
			}
		}),
		new HtmlWebpackPlugin({
			filename:'html/routeDrive.html',
			template:path.join(__dirname,'web/src/html/routeDrive.html'),
			inject:true,
			chunks:['common_jq','routedrive'],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ['common_jq','routedrive'];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;  
			}
		}),
		//login页面
		new HtmlWebpackPlugin({
			minify: {
				removeAttributeQuotes:true, //取出属性引号
				removeComments:true  //去除注释
			},
			filename:'html/login.html',
			template:path.join(__dirname,'web/src/html/login.html'),
			inject:true,
			chunks:['common_jq','jq_validate','login'],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ['common_jq','jq_validate','login'];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;  
			}
		}),
		//register页面
		new HtmlWebpackPlugin({
			minify: {
				removeAttributeQuotes:true, //取出属性引号
				removeComments:true  //去除注释
			},
			filename:'html/register.html',
			template:path.join(__dirname,'web/src/html/register.html'),
			inject:true,
			chunks:['common_jq','jq_validate','register'],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ['common_jq','jq_validate','register'];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;  
			}
		}),
		//复制文件
		new CopyWebpackPlugin([
			{
				from : 'web/src/locales/*.json',  //翻译文件
				to : 'locales/',
				flatten:true
			},
			{
				from :'web/src/libs/js/socket.io.js',  //socket文件
				to : 'js/',
				flatten : true
			},
			{
				from :'web/src/configs/config.xml',  //复制xml文件
				to : 'configs/',
				flatten : true
			},
			{
				from :'web/src/libs/images/**',  ////复制google地图图片
				to : 'libs/images/',
				flatten : true
			},
			{
				from :'web/src/libs/images/**',  ////复制google地图图片
				to : 'libs/images/',
				flatten : true
			}
		]),
		new webpack.optimize.CommonsChunkPlugin({
			names:['common_jq']
		}),
		//自动加载模块，当$被当作未赋值的变量时
		new webpack.ProvidePlugin({
			$:'jquery',
			jQuery:'jquery',
			'window.jQuery':'jquery',
			'XRegExp':'xregexp'
		}),
		//（删除重复依赖的文件）
    	new webpack.optimize.DedupePlugin(),
    	/**** 踩坑，在这里配postcss不行，在postcss-loader上面配
    	new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function(){
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }
        }),
        ******/
		//压缩
		/*****/
		new webpack.optimize.UglifyJsPlugin({
			sourceMap:true,
			compress:{
				warnings:false
			}
		}),

		//发布前清空发布目录
		/*****
		new CleanWebpackPlugin(['dist'], {
	        root: '', // An absolute path for the root  of webpack.config.js
	        verbose: true,// Write logs to console.
	        dry: false // Do not delete anything, good for testing.
	    }),
	    ****/
	    
	],
	devServer:{
		contentBase:__dirname+'/web/dist/myroute',
		//contentBase:__dirname+'/src',
	},
	watch:true,

}