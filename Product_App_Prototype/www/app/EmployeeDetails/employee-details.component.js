angular.
    module('pap').
    component('employeeDetails', {
        templateUrl:"app/EmployeeDetails/employee-details.template.html",
        controller: ['$routeParams', 'employeeService', '$filter',
      function employeeDetailsController ($routeParams, employeeService, $filter) {
            debugger
            var self = this;
            self.employee = employeeService.get({ id: $routeParams.Id }, function() {
             console.log(self.employee);
          });           
        }
    ]
});

