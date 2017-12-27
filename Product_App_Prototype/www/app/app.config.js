(function () {
    "use strict";

    angular.module("pap").config(["$logProvider", "$compileProvider", papConfig]);

    function papConfig($logProvider, $compileProvider) {
        $logProvider.debugEnabled(true);
        $compileProvider.debugInfoEnabled(true);
    }

    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
  
        $routeProvider.
        //   when('/employees', {
        //     template: '<employee-list></employee-list>'
        //   }).
          when('/employees/:Id', {
            template: '<employee-details></employee-details>'
          }).
          otherwise('/employees');
      }
})();