(function () {
    "use strict";

    angular.module("employee.add")
        .component('addEmployee', {
            templateUrl: 'app/add-employee/add-employee.template.html',
            controller: ["$rootScope", "$location", "providerService", "Rollbar", "$mdDialog",
                function EmployeeFormController($rootScope, $location, providerService, Rollbar, $mdDialog) {
                    var _this = this;
                    var componentId = "addEmployee";

                    var employeeSchema = function () {
                        return {
                            Id: "",
                            FirstName: "",
                            LastName: "",
                            Email: "",
                            DOB: ""
                        };
                    };

                    _this.add = function (e) {
                        providerService.addEmployee(angular.copy(_this.employee)).then(
                            function (emps) {
                                $rootScope.$broadcast("new_employee_added", emps[0]);
                            },
                            function (error) {
                                Rollbar.error("Add new employee failed", error);
                            }
                        );
                        _this.close();
                    };

                    _this.reset = function () {
                        _this.employee = angular.copy(employeeSchema());
                    };

                    _this.close = function () {
                        _this.employee = angular.copy(employeeSchema());
                        $mdDialog.cancel();
                    };
                }]
        });
})();