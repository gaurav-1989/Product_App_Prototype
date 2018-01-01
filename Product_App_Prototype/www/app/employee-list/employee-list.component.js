(function () {
    "user strict";

    angular.module('employee.list').
        component('employeeList', {
            templateUrl: "app/employee-list/employee-list.template.html",
            controller: ['$routeParams', 'providerService', '$rootScope', '$window',
                function employeeDetailsController($routeParams, providerService, $rootScope, $window) {
                    var self = this;
                    self.employeelist = [];

                    providerService.isDataReady().then(
                        function (employees) {
                            self.employeelist = employees;
                        },
                        function (error) {
                            alert(JSON.stringify(error));
                        }
                    );

                    $rootScope.$on("new_employee_added", function (e, newEmp) {
                        self.employeelist.push(newEmp);
                    });

                    self.query = "";

                    self.delete = function (index) {
                        var selected = self.employeelist[index];

                        var confirmation = $window.confirm("Are you sure?")
                        if (confirmation) {
                            providerService.removeEmployee({ Id: selected.Id }).then(
                                function () {
                                    self.employeelist.splice(index, 1);
                                },
                                function (error) {
                                    alert(JSON.stringify(error));
                                }
                            );
                        }
                    };
                }]
        })
})();
