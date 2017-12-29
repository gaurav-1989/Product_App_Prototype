(function () {
	angular.
		module('employee.detail').
		component('employeeDetail', {
			templateUrl: '/app/EmployeeView/employee-view-template.html',
			controller: function EmployeeDataController() {
				debugger
				this.users = [
					{
						EmployeeID: '124',
						firstname: 'Priyam',
						lastname: 'Goswami',
						DOB: '22-10-1986',
						EmailAddress: 'Priya.Goswami@imaginea.com'
					}
				];
				
			}
		});
})();

angular.
	module('phonecatApp').
	config(['$locationProvider', '$routeProvider',
		function config($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');
						$routeProvider.
				when('/users', {
					templateUrl: '/app/EmployeeView/employee-view-template.html'
				}).
				when('/users/:EmployeeID', {
					templateUrl: '/app/EmployeeView/employee-view.html'
				});
		}
	]);