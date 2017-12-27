(function () {
    "use strict";

    angular.module("pap").config(["$logProvider", "$compileProvider", papConfig]);

    function papConfig($logProvider, $compileProvider) {
        $logProvider.debugEnabled(true);
        $compileProvider.debugInfoEnabled(true);
    }
<<<<<<< HEAD

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
=======
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
       
        $routeProvider.
            when('/employee', {
                template: ' <employee-list></employee-list>'
            }).
            when('/employee/:Id', {
                template: ' <employee-list></employee-list>'
            }).
            //when('/phones/:phoneId', {
            //    template: '<phone-detail></phone-detail>'
            //}).
            otherwise('/index');
    }
>>>>>>> be704eab7bfe7f7d62d84b8626cbe6d2399bc7e2
})();