(function () {
    "use strict";

    angular.
        module('pap').
        component('employeeDetails', {
            templateUrl: "app/employee-details/employee-details.template.html",
            controller: ['$routeParams', 'employeeService', '$filter',
                function employeeDetailsController($routeParams, employeeService, $filter) {
                    var self = this;
                    self.employee = employeeService.get({ id: $routeParams.Id }, function () {
                    });
                }
            ]
        });
})();