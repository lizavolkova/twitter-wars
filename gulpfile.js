'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require('./webpack.config.js');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var exec = require('child_process').exec;

gulp.task('default', ['sass', 'webpack-dev-server', 'watch']);
gulp.task('build', ['sass', 'html', 'webpack']);

gulp.task('sass', function () {
    return gulp.src([
        './src/globals/scss/*.scss',
        './src/js/*.scss',
        './src/js/components/**/*.scss'
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('styles.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/'))
        .pipe(gulp.dest('./dist/'))
        .pipe(livereload())
});

gulp.task('webpack-dev-server', function(callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = 'eval';
    myConfig.debug = true;

    new WebpackDevServer(webpack(myConfig), {
        contentBase: './src',
        inline: true,
        hot: true,
        // https: true,
        path: '/' + myConfig.output.path,
        stats: {
            colors: true
        }
    }).listen(8080, 'localhost', function(err) {
        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
            gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
        }
    })
});

gulp.task('watch', function() {
    gulp.watch([
        './src/globals/scss/*.scss',
        './src/js/*.scss',
        './src/js/components/**/*.scss'
    ], ['sass']);
});

//prod tasks
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'))
});

gulp.task('webpack', function() {
    var myConfig = Object.create(webpackConfig);
    // myConfig.devtool = 'eval';
    // myConfig.debug = false;
    // myConfig.output.path = __dirname + "/dist/";
    // myConfig.output.publicPath = "/dist/";
    // myConfig.output.filename = __dirname + "/dist/";
    myConfig.externals = {
        'config': JSON.stringify(require('./src/globals/config/config.prod.json'))
    };

    webpack((myConfig), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
    });

});




