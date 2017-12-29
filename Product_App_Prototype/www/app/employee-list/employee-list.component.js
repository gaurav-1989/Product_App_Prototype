(function () {
    "user strict";

    angular.module('employee.list').
        component('employeeList', {
            templateUrl: "app/employee-list/employee-list.template.html",
            controller: ['$routeParams', 'offlineService', '$rootScope',
                function employeeDetailsController($routeParams, offlineService, $rootScope) {
                    var self = this;
                    self.employeelist = [];

                    $rootScope.$on('device_ready_event', function () {
                        offlineService.GetEmployees().then(
                            function (employees) {
                                alert(JSON.stringify(employees));
                                self.employeelist = employees;
                            },
                            function (error) {
                                alert(JSON.stringify(error));
                            }
                        );
                    });

                    this.setSelected = function (index) {
                        this.selected = self.employeelist[index];
                        $routeParams.Id = this.selected;
					};

					this.setDelete = function (index) {
						debugger
						this.selected = self.employeelist[index];
						dataService.delete({ id: this.selected.Id }, function (data) {
							location.reload();
							console.log("Deleted");
						});

					};
                }]
        })
})();
