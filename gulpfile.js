var gulp    = require('gulp'),
    order   = require('gulp-order'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    sass    = require('gulp-sass'),
    rename  = require('gulp-rename'),
    notify  = require('gulp-notify'),
    sourcemaps   =  require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    watch   = require('gulp-watch')
;
//For getting src files from bower
gulp.task('getSRC', function(){
    gulp.src('bower_components/**/*.min.js').pipe(gulp.dest('src/lib/'));
    gulp.src('bower_components/**/*.css').pipe(gulp.dest('src/lib/'));
    gulp.src('bower_components/**/*.{ttf,woff,woff2,eof,svg}').pipe(gulp.dest('src/lib/'));

});

//For min-scripts
gulp.task('minscripts', function(){
    gulp.src([
        'src/lib/jquery/dist/jquery.min.js',
        'src/lib/bootstrap/dist/js/bootstrap.min.js',
        'src/lib/owl-carousel/owl-carousel/owl.carousel.min.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('src/js/'));
});

//For Scripts
gulp.task('scripts', function(){
    gulp.src('src/js/main.js').pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('src/js/'));
});

//For min-styles
gulp.task('minstyles', function(){
    gulp.src([
        'src/lib/bootstrap/dist/css/bootstrap.min.css',
        'src/lib/animate.css/animate.min.css',
        'src/lib/owl-carousel/owl-carousel/owl.carousel.css',
        'src/lib/owl-carousel/owl-carousel/owl.theme.css',
        'src/lib/owl-carousel/owl-carousel/owl.transitions.css',
        'src/lib/lato/css/lato.min.css',
        'src/lib/font-awesome/css/font-awesome.min.css',
        ])
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('src/css/'))
        ;
});

//For Styles
gulp.task('styles', function(){
    gulp.src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        // .pipe(sass())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/css/'));
});

//For Font Task
gulp.task('fonts', function(){
    gulp.src('src/lib/bootstrap/fonts/*.{ttf,woff,woff2,eof,svg}').pipe(gulp.dest('src/fonts/'));
    gulp.src('src/lib/font-awesome/fonts/*.{ttf,woff,woff2,eof,svg}').pipe(gulp.dest('src/fonts/'));
    gulp.src('src/lib/lato/font/**/*.{ttf,woff,woff2,eof,svg}').pipe(gulp.dest('src/font/'));
});

//For Watch Task
gulp.task('watch', function(){
    gulp.watch('src/scss/**/*.scss',['styles']);
    gulp.watch('src/js/**/*.js',['scripts']);
    // gulp.watch('src/*',['build']);

});

//For Build
gulp.task('buildJS', function(){
    gulp.src(['src/js/lib.js','src/js/main.min.js']).pipe(gulp.dest('build/js/'));
    gulp.src('src/js/trip.json').pipe(gulp.dest('build/js/'));
});
gulp.task('buildCSS', function(){
    gulp.src(['src/css/lib.css','src/css/style.css']).pipe(gulp.dest('build/css/'));
});
gulp.task('buildFont', function(){
    gulp.src('src/fonts/**/*.{ttf,woff,woff2,eof,svg}').pipe(gulp.dest('build/fonts/'));
    gulp.src('src/font/**/*.{ttf,woff,woff2,eof,svg}').pipe(gulp.dest('build/font/'));
});
gulp.task('buildImages', function(){
    gulp.src('src/images/**/*').pipe(gulp.dest('build/images/'));
});
gulp.task('build',['buildJS','buildCSS','buildFont','buildImages']);

//For Default Task
gulp.task('default', ['getSRC','minstyles','minscripts','fonts','styles','scripts','watch','build']);
