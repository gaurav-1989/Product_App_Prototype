(function () {
    "use strict";

    angular.module("employee.add")
        .component('addEmployee', {
    templateUrl: 'app/add-employee/add-employee.template.html',
    controller:function EmployeeFormController($scope) {
        var myDB = null;
        var _this = this;
        _this.employee = {
            firstName:"d",
            lastName:"k",
            dob:new Date(),
            email:"dd@ff.com"
        };
        _this.createEmployee  = function(employee) {
            _this.addEmployee = angular.copy(employee);
            console.log("clicked on save", _this.addEmployee);
            _this.pushData(_this.addEmployee);
            _this.reset();
      }
        _this.pushData = function (employee) {

            // ToDo: Add data to Sqlite
      
      }
        _this.reset = function() {
            _this.employee = {
            firstName:"",
            lastName:"",
            dob:"",
            email:""
        };
        
      }
    }
});
})();