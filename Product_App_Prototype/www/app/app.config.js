(function () {
    "use strict";

    angular.module("pap").config(["$logProvider", "$compileProvider", papConfig]);

    function papConfig($logProvider, $compileProvider) {
        $logProvider.debugEnabled(true);
        $compileProvider.debugInfoEnabled(true);
    }
})();