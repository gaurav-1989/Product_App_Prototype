(function () {
    "use strict";

    var gulp = require('gulp');
    var config = require('./config');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');
    var cleanCSS = require('gulp-clean-css');
    var inject = require('gulp-inject');

    gulp.task('style-loader', function () {
        var target = gulp.src(config.paths.index);
        var sources = gulp.src(config.paths.styles)
            .pipe(concat(config.paths.style))
            .pipe(gulp.dest(config.paths.outDir))
            .pipe(rename(config.paths.styleMin))
            .pipe(cleanCSS())
            .pipe(gulp.dest(config.paths.outDir));

        return target.pipe(inject(sources))
            .pipe(gulp.dest(config.paths.rootDir));
    });
})();