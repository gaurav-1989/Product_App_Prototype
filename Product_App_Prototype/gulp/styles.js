(function () {
    "use strict";

    var gulp = require('gulp');
    var inject = require('gulp-inject');

    gulp.task('style-loader', function () {
        var target = gulp.src('./www/index.html');
        var sources = gulp.src(['./www/assets/**/*.min.css', './www/assets/css/index.css'], { read: false });
        return target.pipe(inject(sources))
            .pipe(gulp.dest('./www'));
    });
})();
