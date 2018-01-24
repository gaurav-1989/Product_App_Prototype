(function () {
    "use strict";

    angular.
        module('employee.details').
        component('employeeDetails', {
            templateUrl: "app/employee-details/employee-details.template.html",
            controller: ['$routeParams', 'providerService', '$filter', 'Rollbar',
                function employeeDetailsController($routeParams, providerService, $filter, Rollbar) {
                    var _this = this;

                    _this.employee = {};

                    providerService.getEmployees({ Id: $routeParams.Id }).then(
                        function (emp) {
                            if (emp && emp.length > 0) {
                                _this.employee = emp[0];
                            }
                            else {
                                Rollbar.error("Get employee detail failed, employee with Id " + $routeParams.Id + " not found in sqlite database");
                            }
                        },
                        function (error) {
                            Rollbar.error("Get employee details failed", error);
                        }
                    );

               
                }

              
            ]
        });
})();