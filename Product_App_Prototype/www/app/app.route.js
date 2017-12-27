(function () {
    "use strict";
    angular.
        module('pap').
        config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                 $locationProvider.hashPrefix('!');
                debugger;
                $routeProvider.
                    when('/employees', {
                        template: '<employee-list></employee-list>'
                    }).
                    when('/employee/:Id', {
                       template: '<employee-details></employee-details>'
                    }).
                     otherwise('/employees');
            }
        ]);
})();