(function () {
    "use strict";

    angular.module("pap").config(["$logProvider", "$compileProvider", "RollbarProvider", papConfig]);

    function papConfig($logProvider, $compileProvider, RollbarProvider) {
        $logProvider.debugEnabled(true);
        $compileProvider.debugInfoEnabled(true);

        RollbarProvider.init({
            accessToken: "7db0f2a93f984502a686266f22f7cc23",
            captureUncaught: true,
            payload: {
                environment: 'production'
            }
        });
    }
})();