(function () {
    "use strict";

    var gulp = require('gulp');

    gulp.task('clean', function () {
        return true;
    });

    gulp.task('build', ['script-loader'], function () {
        return true;
    });
})();