(function () {
    "user strict";

    angular.module('employee.list').
        component('employeeList', {
            templateUrl: "app/employee-list/employee-list.template.html",
            controller: ['$routeParams', 'employeeService', '$filter',
                function employeeDetailsController($routeParams, employeeService, $filter) {
                    var self = this;
                    self.employeelist = employeeService.query();
                    this.setSelected = function (index) {
                        this.selected = self.employeelist[index];
                        $routeParams.Id = this.selected;
                    };
                }]
        })
})();
