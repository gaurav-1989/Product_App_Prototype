(function () {
    "user strict";

    angular.module('employee.list').
        component('employeeList', {
            templateUrl: "app/employee-list/employee-list.template.html",
            controller: ['$routeParams', 'providerService', '$rootScope', '$window', 'Rollbar', 'nativeService',
                function employeeDetailsController($routeParams, providerService, $rootScope, $window, Rollbar, nativeService) {
                    var self = this;
                    self.employeelist = [];

                    providerService.isDataReady().then(
                        function (employees) {
                            self.employeelist = employees;
                        },
                        function (error) {
                            Rollbar.error("EmployeeList load failed", error);
                        }
                    );

                    $rootScope.$on("new_employee_added", function (e, newEmp) {
                        self.employeelist.push(newEmp);
                    });

                    self.query = "";

                    self.delete = function (index) {
                        var selected = self.employeelist[index];

                        var confirmation = $window.confirm("Are you sure?")
                        if (confirmation) {
                            providerService.removeEmployee({ Id: selected.Id }).then(
                                function () {
                                    self.employeelist.splice(index, 1);
                                },
                                function (error) {
                                    Rollbar.error("Employee deletion failed", error);
                                }
                            );
                        }
                    };

                    self.detail = function (index) {
                      nativeService.imageLoad("win-ten_block2-icon3.svg");
                      var selected = self.employeelist[index];
                        $window.location.href = "#!/employee/" + selected.Id;
                    };

                    self.playVideo = function () {
                        nativeService.playVideo('bitcoin_1.mp4');
                    };
                                       
                }]
        })
})();
