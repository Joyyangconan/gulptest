var gulp = require('gulp');

var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');


gulp.task('css', function(){
		gulp.src('./lunbo/origin/*.css')
		.pipe(cssnano('merged.css'))
		.pipe(gulp.dest('./lunbo/dist/css'));
});

gulp.task('uglify', function(){
	gulp.src('./lunbo/origin/*.js')
	.pipe(concat('merge.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./lunbo/dist/js'))
});

gulp.task('imagemin' , function(){
	gulp.src('./lunbo/origin/*.jpg')
	.pipe(imagemin())
	.pipe(gulp.dest('./lunbo/dist/imgs'))
});

gulp.task('default', ['css', 'uglify', 'imagemin']);