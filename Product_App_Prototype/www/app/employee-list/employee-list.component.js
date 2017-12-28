(function () {
    "user strict";

    angular.module('employee.list').
        component('employeeList', {
            templateUrl: "app/employee-list/employee-list.template.html",
            controller: ['$routeParams', 'dataService', '$filter',
                function employeeDetailsController($routeParams, dataService, $filter) {
                    var self = this;
                    self.employeelist = dataService.query();
                    this.setSelected = function (index) {
                        this.selected = self.employeelist[index];
                        $routeParams.Id = this.selected;
                    };
                }]
        })
})();
