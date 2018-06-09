'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const inlineCss = require('gulp-inline-css');
const browserSync = require('browser-sync').create();

//server
gulp.task('server', function () {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: './source',
            index: 'email.html'
        }
    });
    gulp.watch('./source/**/*.*').on('change', browserSync.reload);
});

//scss
gulp.task('styles', function () {
    return gulp.src('./source/scss/styles/inline.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./source/css'));
});

//pug
gulp.task('pug', function () {
    return gulp.src('./source/pug/email.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./source'));
});

//inlineCss
gulp.task('inline', function () {
    return gulp.src('./source/email.html')
        .pipe(inlineCss({
            preserveMediaQueries: true,
            applyTableAttributes: true
        }))
        .pipe(gulp.dest('./build'));
});

//watcher
gulp.task('watch', function () {
    gulp.watch('./source/pug/email.pug', gulp.series('pug'));
    gulp.watch('./source/scss/styles/inline.scss', gulp.series('styles'));
});

//default task
gulp.task('default', gulp.series(
    gulp.parallel('styles', 'pug', 'inline'),
    gulp.parallel('watch', 'server')
));
