var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var rename = require("gulp-rename");

gulp.task('style', function () {
	return gulp.src("src/sass/style.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer()
		]))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream())
		.pipe(csso())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('./build/css'));
});

gulp.task('serve', gulp.series('style', function () {
	browserSync.init({
		server: "./"
	});

		gulp.watch("src/sass/**/*.scss", gulp.series('style'));
		gulp.watch("./*.html").on('change', browserSync.reload);
		gulp.watch("build/js/*.js").on('change', browserSync.reload);
	}));