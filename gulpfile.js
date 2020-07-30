var gulp, { parallel, series, src, dest, watch } = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat');
var babel = require('gulp-babel');

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
function styles(cb) {
    src(SCSS_PATH)
        .pipe(plumber(function(error) {
            console.log('Styles Task Got Error');
            console.log(error);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(sass()) // { outputStyle: 'compressed' }
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(PUBLIC_PATH + '/css'))
        .pipe(browserSync.stream());
    cb()
};


// // Scripts
function scripts(cb) {
    return src(["app/js/custom-plugin.js", "app/js/custom.js", SCRIPTS_PATH])
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
        .pipe(dest(PUBLIC_PATH + '/js'))
        .pipe(browserSync.stream());
    cb()
};


// // Images
function images(cb) {
    src(IMAGES_PATH)
        // .pipe(imagemin(
        //     [
        //         imagemin.gifsicle(),
        //         imagemin.jpegtran(),
        //         imagemin.optipng(),
        //         imagemin.svgo(),
        //         imageminPngquant(),
        //         imageminJpegRecompress()
        //     ]
        // ))
        .pipe(dest(PUBLIC_PATH + '/images'))
        .pipe(browserSync.stream());
    cb()
};

// // Bower Files inject
function bowerFiles() {
    var bowerModule = require("./bower.json");
    var sources = bowerModule.overrides;
    return src(BOWER_PATH)
        .pipe(mainBowerFiles({sources}))
        .pipe(dest(PUBLIC_PATH + '/libs'))
        .pipe(browserSync.stream());
};

// // ======================================= HTML
function pugTask() {
    var sources = src(['public/libs/jquery/**/*.js', 'public/libs/bootstrap/**/*.js','public/libs/**/*.js', 'public/libs/bootstrap/**/*.css', 'public/libs/**/*.css'], { read: false, addRootSlash: false, ignorePath: 'public/'});
    var injectOptions = {
        addRootSlash: false,
        ignorePath: 'public/'
    };
    return src(PUG_PATH + '/layout/*.pug')
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
        .pipe(dest('app/views/layout'))
        .pipe(browserSync.stream());
};

function html(cb) {
    // var beautiOptions = {
    //     {indentSize: 2}
    // };
    src(VIEWS_PATH)
        .pipe(nunjucks.compile({name: ''}))
        .pipe(htmlBeautify())
        .pipe(dest(PUBLIC_PATH))
        .pipe(browserSync.stream());
    cb()
};

// // gulp.task('changed', function() {
//     // return gulp.src('app/views/**/*.html')
//     //     .pipe(changed())
//     //     .pipe(gulp.dest(PUBLIC_PATH + '/**/*.html'))
//     //     .pipe(browserSync.stream());
// // });


// // Clean
function clean() {
    return del.sync([
        PUBLIC_PATH + '/*',
        // 'app/views/layout/app.html'
    ]);
};

// // serve
function serve(cb) {
    browserSync.init({
        "server": {
            "baseDir": PUBLIC_PATH
          },
        "port": 4726,
        "ui": {
            "port": 4727
        }
    });
	watch('app/scss/**/*.scss', styles);
    watch(SCRIPTS_PATH, scripts);
    watch(IMAGES_PATH, images);
    watch(BOWER_PATH, bowerFiles);
    watch(PUG_PATH + '/layout/*.pug', pugTask);
    watch(VIEWS_PATH, html);
    watch("app/*.html").on('change', browserSync.reload)
    cb()
};


exports.default = parallel(clean, styles, scripts, images, bowerFiles, pugTask, html, serve)