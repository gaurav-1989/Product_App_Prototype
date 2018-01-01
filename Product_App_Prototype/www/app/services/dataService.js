(function () {
    "user strict";

    angular.module('pap').service('dataService', ["$resource", function ($resource) {
        return $resource(
            'http://employeedemoapiapp.azurewebsites.net/api/Employee/:id',
            {},
            {
                save: {
                    method: 'POST',
                    isArray: true
                },
                delete: {
                    method: 'DELETE',
                    isArray: true
                }
            }
        );
    }]);
})();