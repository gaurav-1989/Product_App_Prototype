//(function () {
//    "user strict";
//    angular.module('employee.list').
//        component('employeeList', {
//            templateUrl: "app/EmployeeList/employee-list.template.html",
//            controller: function employeeListController(employeeService) {
//                this.employees = employeeService.query();
//                this.setSelected = function (index) {
//                    this.selected = this.employees[index];
//                    console.log(this.selected);
//                };
//            }
//        });
//})();
(function () {
    "user strict";
    angular.module('employee.list').
        component('employeeList', {
            templateUrl: "app/EmployeeList/employee-list.template.html",
            controller: ['$routeParams', 'employeeService', '$filter',
                function employeeDetailsController($routeParams, employeeService, $filter) {
                    debugger
                    var self = this;
                    self.employeelist = employeeService.query();
                    console.log(self.employeelist);
                    this.setSelected = function (index) {
                        debugger
                        this.selected = self.employeelist[index];
                        console.log(this.selected);
                        $routeParams.Id = this.selected;
                        
                    };
                }]
        })
})();
          

//            controller:  function employeeListController(employeeService) {
//                this.employees = employeeService.query();
//                this.setSelected = function (index) {
//                    this.selected = this.employees[index];
//                    console.log(this.selected);
//                };
//            }
//        });
//})();