﻿(function () {
    "use strict";

    var gulp = require('gulp');
    var config = require('./config');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');
    var uglify = require('gulp-uglify');
    var inject = require('gulp-inject');

    gulp.task('script-loader', ['style-loader'], function () {
        var target = gulp.src(config.paths.index);
        var sources = gulp.src(config.paths.scripts)
            .pipe(concat(config.paths.script))
            .pipe(gulp.dest(config.paths.outDir))
            .pipe(rename(config.paths.scriptMin))
            .pipe(uglify())
            .pipe(gulp.dest(config.paths.outDir));

        return target.pipe(inject(sources))
            .pipe(gulp.dest(config.paths.rootDir));
    });
})();