﻿(function () {
    "use strict";

    var gutil = require('gulp-util');

    var rootDir = './www';

    exports.paths = {
        rootDir: rootDir,
        index: rootDir + '/index.html',
        styles: [
            rootDir + '/assets/**/*.min.css',
            rootDir + '/assets/css/index.css'
        ],
        scripts: [
            rootDir + '/app/add-employee/add-employee.module.js',
            rootDir + '/app/employee-details/employee-details.module.js',
            rootDir + '/app/employee-list/employee-list.module.js',
            rootDir + '/app/app.module.js',
            rootDir + '/app/**/*.js'
        ],
        style: 'style.css',
        styleMin: 'style.min.css',
        script: 'script.js',
        scriptMin: 'script.min.js',
        outDir: rootDir + '/ref',
        ignore: 'www'
    };

    exports.setting = {
        debug: true
    };
})();