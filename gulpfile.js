var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');
// Images
var imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	imageminJpegRecompress = require('imagemin-jpeg-recompress');
// HTML
var nunjucks = require('gulp-nunjucks'), 
    inject = require('gulp-inject');
// Bower files
var mainBowerFiles = require('gulp-main-bower-files');
// delete
var del = require('del');

// ===================================== Files Directory
var PUBLIC_PATH 	= 'public',
	SCRIPTS_PATH 	= 'app/js/*.js',
	SCSS_PATH 		= 'app/scss/*.scss',
	IMAGES_PATH 	= 'app/images/**/*.{png,jpeg,jpg,gif,svg}',
	VIEWS_PATH		= 'app/views/*.html',
    BOWER_PATH      = './bower.json';

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
        .pipe(autoprefixer())
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PUBLIC_PATH + '/css'))
        .pipe(livereload());
});


// Scripts
gulp.task('scripts', function() {
    return gulp.src(SCRIPTS_PATH)
        .pipe(plumber(function(error) {
            console.log('Scripts Task Got Error');
            console.log(error);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(concat('custom.js'))
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
    return gulp.src(BOWER_PATH)
        .pipe(mainBowerFiles({
            overrides: {
                jquery: {
                    main: [
                        './dist/jquery.min.js'
                    ]
                },
                bootstrap: {
                    main: [
                    './dist/js/bootstrap.min.js',
                    './dist/css/bootstrap.min.css'
                    ]
                }
            }
        }))
        .pipe(gulp.dest(PUBLIC_PATH + '/libs'))
        .pipe(livereload());
});
// bower files inject to layout/app.html
gulp.task('inject', function() {
    var sources = gulp.src(['*/libs/**/*.js', '*/libs/**/*.css'], { read: false });
    return gulp.src('app/views/layout/app.html')
        .pipe(inject(sources))
        .pipe(gulp.dest('app/views/layout/'))
        .pipe(livereload());
});

// HTML
gulp.task('html', function() {
      gulp.src(VIEWS_PATH)
        .pipe(nunjucks.compile({name: ''}))
        .pipe(gulp.dest(PUBLIC_PATH))
        .pipe(livereload());
});


// Clean
gulp.task('clean', function() {
    return del.sync([
        PUBLIC_PATH + '/*',
        PUBLIC_PATH + '/css',
        PUBLIC_PATH + '/js',
    ]);
});


// Default
gulp.task('default', ['clean', 'styles', 'scripts', 'images', 'bower-files', 'inject', 'html'], function() {
	console.log('Default Starting')
});

// Watch
gulp.task('watch', ['default'], function() {
	require('./server.js');
    livereload.listen();
	gulp.watch(SCSS_PATH, ['styles']);
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(IMAGES_PATH, ['images']);
    gulp.watch(BOWER_PATH, ['bower-files']);
	gulp.watch('app/views/layout/app.html', ['inject']);
	gulp.watch(VIEWS_PATH, ['html']);
});
