(function () {
    "use strict";
    angular.
        module('pap').
        config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
                $locationProvider.hashPrefix('!');
                debugger;
                $routeProvider.
                    when('/', {
                        template: '<employee-list></employee-list>'
                    }).
                    //when('/phones/:phoneId', {
                    //    template: '<phone-detail></phone-detail>'
                    //}).
                    otherwise('/index');
            }
        ]);

})();