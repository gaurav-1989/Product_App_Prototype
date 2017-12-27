(function () {
    "user strict";
    
    angular.module('pap').service('employeeService', ["$resource", function ($resource) {
            return $resource('http://employeedemoapiapp.azurewebsites.net/api/Employee/:id')
        }]);
    })();