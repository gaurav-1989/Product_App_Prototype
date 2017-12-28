(function () {
    "use strict";

    var gulp = require('gulp');
    var config = require('./config');
    var clean = require('gulp-clean');

    gulp.task('clean', function () {
        return gulp.src(config.paths.outDir, { read: false })
            .pipe(clean());
    });

    gulp.task('build', ['script-loader'], function () {
        return true;
    });
})();