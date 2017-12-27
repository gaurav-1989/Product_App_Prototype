(function () {
    "use strict";

    angular.module("employee.add")
        .component('addEmployee', {
    templateUrl: '../www/app/add-employee/add-employee.template.html',
    controller: function EmployeeFormController($scope) {
        var myDB = null;
        $scope.employee = {
            firstName:"d",
            lastName:"k",
            dob:new Date(),
            email:"dd@ff.com"
        };
        this.createEmployee  = function(employee) {
          this.addEmployee = angular.copy(employee);
          console.log("clicked on save", this.addEmployee);
          this.pushData(this.addEmployee);
          this.reset();
      }
        this.pushData = function (employee) {

            // ToDo: Add data to Sqlite
      
      }
    this.reset = function() {
        $scope.employee = {
            firstName:"",
            lastName:"",
            dob:"",
            email:""
        };
        
      }
    }
});
})();