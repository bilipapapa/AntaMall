//gulp的配置文件
var gulp = require("gulp");//加载gulp模块
var connect = require("gulp-connect");//服务器模块
var sass = require("gulp-sass");//将sass文件转换成css文件的模块
var sourcemaps = require('gulp-sourcemaps');//让编译后的文件和源文件的关联的模块
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require("gulp-babel");
//调用gulp的task方法创建任务
gulp.task("hello",function(){
	console.log("hello world");
});
//一个默认任务
/*gulp.task("default",function(){
	console.log("default task");
});*/

//有多个任务 [任务名1,任务名2，……]
//gulp.task("default",["hello"]);

gulp.task("copyIndex",function(){
	gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());//查找index.html文件,并将其放入到dist里
});

gulp.task("copyHtml",function(){
	gulp.src(["*.html","!index.html","html/**"]).pipe(gulp.dest("dist/html")).pipe(connect.reload());//查找所有的非index.html的.html文件，并将其放入到dist/html里
});

gulp.task("copyImg",function(){
	gulp.src(["*.{png,jpg,gif}","img/**.{png,jpg,gif}","images/**.{png,jpg,gif}"]).pipe(gulp.dest("dist/img"));//查找所有的png，jpg，gif图片放到img里
});

gulp.task("copyData",function(){
	gulp.src(["xml/*.xml","json/*.json"]).pipe(gulp.dest("dist/data"));//查找所有的xml,json文件放到distdata文件里
});

gulp.task("watch",function(){
	gulp.watch("*.html",["copyIndex","copyHtml"]);
	gulp.watch("sass/*.scss",["sass"]);
});

gulp.task("sass",function(){   //将sass转换成css
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css")).pipe(connect.reload());;
});

gulp.task("concat",function(){ //合并js文件
	gulp.src(["js/a.js","js/b.js"])
	.pipe(concat("mix.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("mix.min.js"))
	.pipe(gulp.dest("dist/js"));
});

gulp.task("babel",function(){ //将ES6转换成ES5
	gulp.src("js/test.js")
	 .pipe(babel({presets:["es2015"]}))  
	.pipe(gulp.dest("dist/js"));
})


gulp.task('server',function(){ 
	connect.server({
		root:'dist',
		livereload:true
		});
})  

gulp.task("default",["server","watch"]);









