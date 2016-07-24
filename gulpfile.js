// 'use strict';

var gulp    = require('gulp'),
    order   = require('gulp-order'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    sass    = require('gulp-sass'),
    rename  = require('gulp-rename'),
    sourcemaps   =  require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    watch   = require('gulp-watch')
;

// --------------------------------------------------------------------

//For get-min-scripts
gulp.task('getminscripts', function(){
    gulp.src('bower_components/**/*.min.js').pipe(gulp.dest('src/js/lib/'));
});
//For min-scripts
gulp.task('minscripts', function(){
    gulp.src('bower_components/**/*.min.js')
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('src/js/'));
});

//For Scripts
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
        .pipe(order([
            "main.js"
        ]))
        // .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('src/js/'));
});

// --------------------------------------------------------------------

//For get-min-styles
gulp.task('getminstyles', function(){
    gulp.src('bower_components/**/*.min.css')
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('src/css/'))
        // .pipe(browserSync.stream())
        ;
});
//For min-styles
gulp.task('minstyles', function(){
    gulp.src('src/js/lib/*.min.css')
        .pipe(order([
            "angular-material.min.css"
        ]))
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('src/css/'))
        // .pipe(browserSync.stream())
        ;
});

//For Styles
gulp.task('styles', function(){
    gulp.src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/css/'));
});

//For Build
gulp.task('build', function(){
    gulp.src(['src/js/lib.js','src/js/main.min.js','src/css/lib.css','src/css/style.css','src/font/**/*.{ttf,woff,eof,svg}','src/images/*.{png,jpg,jpeg,gif}'])
        .pipe(gulp.dest('build/'));
});

//For Watch Task
gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss',['styles']);
    gulp.watch('src/js/**/*.js',['scripts']);
    // gulp.watch('src/*',['build']);

});

//For Default Task
gulp.task('default', ['getminscripts','getminstyles','minstyles','minscripts','styles','scripts','build','watch']);
