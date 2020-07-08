const del = require('del');
const gulp = require('gulp');
const webserver = require('gulp-webserver');
const  sass = require('gulp-sass')
const babel = require('gulp-babel')
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");
const htmlmin = require("gulp-htmlmin");
const jsmin = require("gulp-jsmin");
const jsugify = require("gulp-uglify");
const { series } = require('gulp');


//编译sass任务
var scssHandler =  ()=>{
    return gulp
            .src("./src/sass/*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./src/css"))
}
//打包任务
var cssminHandler = ()=>{
    return gulp
            .src("./src/css/*.css")
            .pipe(autoprefixer())
            .pipe(cssmin())
            .pipe(gulp.dest("./dist/css"))
}
var jsminHandler = ()=>{
    return  gulp
            .src("./src/js/*.js")
            .pipe(babel())
            .pipe(jsmin())
            .pipe(gulp.dest("./dist/js"))
}
var htmlminHandler = ()=>{
    return  gulp
            .src("./src/pages/*.html")
            .pipe(htmlmin())
            .pipe(gulp.dest("./dist/pages"))
}
var delHandler = ()=>{
    return del(['./dist'])
}

// 服务器测试 已弃用
var testServer = ()=>{
    return gulp
        .src('./src')
        .pipe(webserver({
            port:8000,
            open:'./pages/index.html',
            livereload:true,
            proxies:[
                {
                    source:'/smartisan_hotword',
                    target:'https://shopapi.smartisan.com'
                },
                {
                    source:'/smartisan_second_nav',
                    target:'https://shopapi.smartisan.com'
                },
                {
                    source:'/smartisan_goods_list',
                    target:'https://shopapi.smartisan.com'
                },
                {
                    source:'/home',
                    target:'https://shopapi.smartisan.com'
                }
            ]
        }))
}
var watchHandler = ()=>{
    gulp.watch('./',testServer)
}


module.exports.default = gulp.series(
    delHandler,
    scssHandler,
    gulp.parallel(
        htmlminHandler,
        cssminHandler,
        jsminHandler
    ),
    testServer,
    watchHandler
)