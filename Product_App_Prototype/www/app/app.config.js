(function () {
    "use strict";

    angular.module("pap").config(["$logProvider", "$compileProvider", papConfig]);

    function papConfig($logProvider, $compileProvider) {
        $logProvider.debugEnabled(true);
        $compileProvider.debugInfoEnabled(true);
    }
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
       
        // $routeProvider.
        //     when('/employee', {
        //         template: ' <employee-list></employee-list>'
        //     }).
        //     when('/employee/:Id', {
        //         template: ' <employee-details></employee-details>'
        //     })          
    }
    
})();