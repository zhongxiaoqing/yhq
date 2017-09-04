


var obj = {
	removeComments: true, //清除HTML注释
	collapseWhitespace: true, //压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值<input checked="true"/> ==> <input checked/>
	removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
	removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
	removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
	minifyJS: true, //压缩页面JS 
	minifyCSS: true //压缩页面CSS 
	
}

//gulp对象
var gulp = require("gulp");  //gulp对象
var htmlmin = require("gulp-htmlmin"); //导入插件
var minifyCss = require('gulp-minify-css'); //css压缩插件
var babel = require('gulp-babel'); //es6转es5
var uglify = require('gulp-uglify'); //js压缩插件
var imagemin = require('gulp-imagemin'); //图片压缩相关插件
var pngquant = require('imagemin-pngquant'); //png图片压缩插件



gulp.task("htmlTask", function(){
	gulp.src("src/html/*.html")
	.pipe(htmlmin(obj))//使用插件
	.pipe(gulp.dest("dest/html"));
});
gulp.task("cssTask", function(){
	gulp.src("src/css/*.css")
	.pipe(babel({"presets": ["es2015"]})) //es6转es5
	.pipe(uglify()) //js压缩

	.pipe(gulp.dest("dest/css"));
});
gulp.task("jsTask", function(){
	gulp.src("src/js/*.js")
	.pipe(babel({"presets": ["es2015"]})) //es6转es5
	.pipe(uglify()) //js压缩
	.pipe(gulp.dest("dest/js"));
});
gulp.task('imgTask', function(){
	gulp.src('src/img/*')
	.pipe(imagemin({
		progressive: false, //类型：Boolean 默认：false 无损压缩jpg图片
		use: [pngquant()] //使用pngquant插件来深度压缩png图片

	}))
	.pipe(gulp.dest('dest/img'));
});

gulp.task("default", ["imgTask"]);

