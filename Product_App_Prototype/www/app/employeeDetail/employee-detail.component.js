(function () {
	debugger
	angular.module('employee.detail').component('employeeDetail', {
		templateUrl: 'app/employeeDetail/employee-detail-template.html',
		controller: function employeeDetailController() {
			debugger
								this.user = [
				{					Firstname: 'Manikandan',
									LastName: 'Sankar'
				}
			];
		}
	});
})();