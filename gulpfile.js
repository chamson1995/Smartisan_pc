var del = require('del');
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var  sass = require('gulp-sass')
var babel = require('gulp-babel')
var autoprefixer = require("gulp-autoprefixer");
var cssmin = require("gulp-cssmin");
var htmlmin = require("gulp-htmlmin");
var jsmin = require("gulp-jsmin");
var jsugify = require("gulp-uglify");
var { series } = require('gulp');
var phpserver = require('gulp-connect-php');




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
                },
                {
                    source:'/smartisan_cart',
                    target:'https://shopapi.smartisan.com/product/spus'
                },
                {
                    source:'/myphpuser',
                    target:'http://localhost:666/php/user.php'
                },
                {
                    source:'/myphpcart',
                    target:'http://localhost:666/php/cart.php'
                }
            ]
        }))
}

var phpHandler = ()=>{
    return gulp.src("./src")
        .pipe(
            phpserver({
                port:8001,
                open:true,
                bin:"/Applications/MAMP/bin/php/php7.4.2/bin"
            })
        )
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
    watchHandler,
    phpHandler
)