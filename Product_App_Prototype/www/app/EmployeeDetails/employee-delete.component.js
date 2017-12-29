angular.
	module('pap').
	component('employeeDelete', {
		templateUrl: "app/EmployeeDetails/employee-details.template.html",
		controller: ['$routeParams', 'employeeService', '$filter',
			function employeeDeleteController($routeParams, employeeService, $filter) {
				debugger
				var self = this;
				var id = $routeParams.Id;

				employeeService.$delete(function ($routeParams.Id) { });

				//self.employee = employeeService.get({ id: $routeParams.Id }, function () {
				//	self.employee.$delete(function (id) {
				//		//gone forever!
				//		console.log(deleted);
				//	});
				//});
			}
		]
	});

