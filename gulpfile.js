var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();

// Images
var imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress');
// HTML
var nunjucks = require('gulp-nunjucks'), 
    inject = require('gulp-inject'),
    pug = require('gulp-pug'),
    htmlBeautify = require('gulp-html-beautify');

// Bower files
var mainBowerFiles = require('gulp-main-bower-files');
// delete
var del = require('del');

// ===================================== Files Directory
var PUBLIC_PATH     = 'public',
    SCRIPTS_PATH    = 'app/js/*.js',
    SCSS_PATH       = 'app/scss/*.scss',
    IMAGES_PATH     = 'app/images/**/*.{png,jpeg,jpg,gif,svg}',
    VIEWS_PATH      = 'app/views/**/*.html',
    BOWER_PATH      = './bower.json',
    PUG_PATH        = 'app/views_pug';

//overrading 
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var __if = require('gulp-if');
var __path = require('gulp-path')

// ====================================== Gulp Task
// Styles
gulp.task('styles', function() {
    gulp.src(SCSS_PATH)
        .pipe(plumber(function(error) {
            console.log('Styles Task Got Error');
            console.log(error);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(sass()) // { outputStyle: 'compressed' }
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PUBLIC_PATH + '/css'))
        .pipe(livereload());
});


// Scripts
gulp.task('scripts', function() {
    return gulp.src(["app/js/custom-plugin.js", "app/js/custom.js", SCRIPTS_PATH])
        .pipe(plumber(function(error) {
            console.log('Scripts Task Got Error');
            console.log(error);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        // .pipe(uglify())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('custom.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PUBLIC_PATH + '/js'))
        .pipe(livereload());
});


// Images
gulp.task('images', function() {
    gulp.src(IMAGES_PATH)
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))
        .pipe(gulp.dest(PUBLIC_PATH + '/images'))
        .pipe(livereload());
});

// Bower Files inject
gulp.task('bower-files', function() {
    var bowerModule = require("./bower.json");
    var sources = bowerModule.overrides;
    return gulp.src(BOWER_PATH)
        .pipe(mainBowerFiles({sources}))
        .pipe(gulp.dest(PUBLIC_PATH + '/libs'))
        .pipe(livereload());
});

// ======================================= HTML
gulp.task('pug', function() {
    var sources = gulp.src(['public/libs/jquery/**/*.js', 'public/libs/bootstrap/**/*.js','public/libs/**/*.js', 'public/libs/bootstrap/**/*.css', 'public/libs/**/*.css'], { read: false, addRootSlash: false, ignorePath: 'public/'});
    var injectOptions = {
        addRootSlash: false,
        ignorePath: 'public/'
    };
    return gulp.src(PUG_PATH + '/layout/*.pug')
        .pipe(plumber(function(error) {
            console.log('Pug Task Got Error');
            console.log(error);
            this.emit('end');
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(inject(sources, injectOptions))
        .pipe(htmlBeautify())
        .pipe(gulp.dest('app/views/layout'))
        .pipe(livereload());
});

gulp.task('html', function() {
    // var beautiOptions = {
    //     {indentSize: 2}
    // };
    gulp.src(VIEWS_PATH)
        .pipe(nunjucks.compile({name: ''}))
        .pipe(htmlBeautify())
        .pipe(gulp.dest(PUBLIC_PATH))
        .pipe(livereload());
});

// gulp.task('changed', function() {
    // return gulp.src('app/views/**/*.html')
    //     .pipe(changed())
    //     .pipe(gulp.dest(PUBLIC_PATH + '/**/*.html'))
    //     .pipe(livereload());
// });


// Clean
gulp.task('clean', function() {
    return del.sync([
        PUBLIC_PATH + '/*',
        // 'app/views/layout/app.html'
    ]);
});

// Watch
gulp.task('watch', function() {
	require('./server.js');
    livereload.listen();
	gulp.watch('app/scss/**/*.scss', ['styles']);
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(IMAGES_PATH, ['images']);
    gulp.watch(BOWER_PATH, ['bower-files']);
    gulp.watch(PUG_PATH + '/layout/*.pug', ['pug']);
    gulp.watch(VIEWS_PATH, ['html']);
});

// Default
gulp.task('default', ['clean', 'styles', 'scripts', 'images', 'bower-files', 'pug', 'html', 'watch'], function() {
    console.log('Default Starting');
});
