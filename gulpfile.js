'use strict';
//此处代码都是由NODE执行
//载入gulp模块
const gulp=require('gulp');

const browserSync = require('browser-sync');

//const less=require('gulp-less');  
//const cssnano=require('gulp-cssnano');  //压缩css
//const postcss=require('gulp-postcss');
//const autoprefixer=require('autoprefixer'); //自动加前缀
gulp.task('indexcss',function(){
    var plugins = [
        autoprefixer({browsers: ['last 1 version']})
    ]; 
    gulp.src('./dist/css/index.css')
    .pipe(less())  //less语法编译
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'))
    //.pipe(cssnano())
    //改变后刷新
    .pipe(browserSync.reload({stream:true}));   
});

//html文件更改刷新
//const htmlmin=require('gulp-htmlmin');
gulp.task('html',function(){
    gulp.src('./web/dist/*.html')
    //改变后刷新
    .pipe(browserSync.reload({stream:true}));
});

//js文件更改刷新
gulp.task('js',function(){
    gulp.src('./web/dist/js/*.js')
    //改变后刷新
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('json',function(){
    gulp.src('./web/dist/locales/*.json')
    //改变后刷新
    .pipe(browserSync.reload({stream:true}));
});

//复制xml文件
gulp.task('xml',function(){
    gulp.src('./web/src/configs/config.xml')
    .pipe(gulp.dest('./web/dist/configs'));
    //复制 profiles文件夹
    gulp.src('./web/src/profiles/**')
    .pipe(gulp.dest('./web/dist/profiles/'));
    //复制google地图图片
    gulp.src('./web/src/libs/images/**')
    .pipe(gulp.dest('./web/dist/libs/images/'));
});

// Static server
gulp.task('default',['xml'],function() {
    /***自动开启浏览器，多屏共享*****/
    browserSync.init({
        server: {
            baseDir: "./web/dist"
        },
        open:false,    //关闭自动打开网址
    });
 
    gulp.watch('./web/dist/*.html',['html']);
    gulp.watch('./web/dist/js/*.js',['js']);
    gulp.watch('./web/dist/css/index.css',['indexcss']);
    gulp.watch('./web/dist/locales/*.json',['json']);
   
});

/**
 * 系统有一个默认的default任务
 * 在命令行中的项目根目录里执行gulp指令，便会看到default任务被执行
 * **/