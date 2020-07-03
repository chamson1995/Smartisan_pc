/*
gulp
    cssHandler        压缩css的规则
    jsHandler           js转语法和压缩
    htmlHandler       压缩html       
    libHandler          处理lib里的内容(简单移动)
    images              处理images里面的图片(简单移动)
    del                    删除指定目录

第三方
    gulp-cssmin     
        压缩css
    gulp-autoprefixer   
        给css自动添加浏览器兼容前缀
    gulp-uglify        
        压缩js  
        只能压缩es5
    gulp-babel  (依赖@babel/core和@babel/preset-env)
        把es6语法转es5
    gulp-htmlmin
        压缩html
    del
        删除目录
    gulp-webserver
        开启服务器

*/

const gulp = require('gulp');
const webserver = require('gulp-webserver');
const testServer = ()=>{
    return gulp
        .src('./src')
        .pipe(webserver({
            port:8001,
            open:'./pages/topBar.html',
            livereload:true,
            proxies:[
                {
                    source:'/smartisan_hotword',
                    target:'https://shopapi.smartisan.com'
                },
                {
                    source:'/smartisan_second_nav',
                    target:'https://shopapi.smartisan.com/v1/cms/second_nav'
                }
            ]
        }))

}

const watchHandler = ()=>{
    gulp.watch('./src',testServer)
    console.log(1111111111)
}


module.exports.default = testServer;
