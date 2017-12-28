(function () {
    "use strict";

    angular.
        module('employee.details').
        component('employeeDetails', {
            templateUrl: "app/employee-details/employee-details.template.html",
            controller: ['$routeParams', 'dataService', '$filter',
                function employeeDetailsController($routeParams, dataService, $filter) {
                    var self = this;
                    self.employee = dataService.get({ id: $routeParams.Id }, function () {
                    });
                }
            ]
        });
})();