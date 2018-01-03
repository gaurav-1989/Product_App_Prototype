(function () {
    "use strict";

    angular.module("employee.add")
        .component('addEmployee', {
            templateUrl: 'app/add-employee/add-employee.template.html',
            controller: ["$rootScope", "$location", "providerService", "Rollbar",
                function EmployeeFormController($rootScope, $location, providerService, Rollbar) {
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

                    $rootScope.$on("mobile-angular-ui.state.changed." + componentId, function (e, isOpen) {
                        _this.employee = employeeSchema();
                    });

                    _this.add = function () {
                        providerService.addEmployee(angular.copy(_this.employee)).then(
                            function (emps) {
                                $rootScope.$broadcast("new_employee_added", emps[0]);
                            },
                            function (error) {
                                Rollbar.error("Add new employee failed", error);
                            }
                        );
                        $rootScope.Ui.turnOff(componentId);
                    };

                    _this.reset = function () {
                        _this.employee = angular.copy(employeeSchema());
                    };
                }]
        });
})();