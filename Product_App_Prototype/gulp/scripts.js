(function () {
    "use strict";

    var gulp = require('gulp');
    var inject = require('gulp-inject');

    gulp.task('script-loader', ['style-loader'], function () {
        var target = gulp.src('./www/index.html');
        var sources = gulp.src(['./www/app/app.module.js', './www/app/**/*.js'], { read: false });
        return target.pipe(inject(sources))
            .pipe(gulp.dest('./www'));
    });
})();
