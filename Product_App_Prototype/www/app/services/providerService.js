(function () {
    "user strict";

    angular.module("pap")
        .service("providerService", ["$rootScope", "$filter", "employeeProvider", "dataService", "$q", ProviderService]);

    function ProviderService($rootScope, $filter, employeeProvider, dataService, $q) {
        var _this = this;
        var _deferred = $q.defer();

        $rootScope.$onMany(["device_online_event"], function () {
            syncStep1();
        });

        _this.getEmployees = function (filter) {
            var deferred = $q.defer();

            employeeProvider.get(filter).then(
                function (employees) {
                    deferred.resolve(employees);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        _this.addEmployee = function (emp) {
            var deferred = $q.defer();

            employeeProvider.insert([emp], false).then(
                function (emps) {
                    deferred.resolve(emps);
                },
                function (error) {
                    deferred.reject();
                }
            );

            return deferred.promise;
        };

        _this.removeEmployee = function (filter) {
            var deferred = $q.defer();

            employeeProvider.softRemove(filter).then(
                function () {
                    deferred.resolve();
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        }

        _this.isDataReady = function () {
            return _deferred.promise;
        };

        //TODO: Destroy events

        //Lot of improvement is possible but because of time issues 
        //Step - 1  Get all unsynced records from db
        //Step - 2  Push unsynced records to server
        //Step - 3  Remove all sqlite records 
        //Step - 4  Get all server records
        //Step - 5  Push all records to sqlite db

        //Or even beter we can use promise chain
        //https://stackoverflow.com/questions/24357445/chain-promises-with-angularjs

        //pub/sub
        var syncStep1 = function () {
            employeeProvider.get({ Sync: 0 }).then(
                function (emps) {
                    if (emps.length == 0) {
                        $rootScope.$broadcast("sync_step2_completed");
                    }
                    else {
                        $rootScope.$broadcast("sync_step1_completed", emps);
                    }
                },
                function (error) {
                    $rootScope.$broadcast("sync_failed", error);
                }
            );
        };

        var syncStep2 = function (e, emps) {
            var addList = emps.filter(function (e) { return e.Deleted == 0; });
            var deleteList = emps.filter(function (e) { return e.Deleted == 1; });

            dataService.save(addList).$promise.then(
                function (saveResp, saveHttpResp) {
                    if (saveResp) {
                        dataService.delete({ ids: deleteList.map(function (e) { return e.Id; }) }).$promise.then(
                            function (delResp, delHttpResp) {
                                if (delResp) {
                                    $rootScope.$broadcast("sync_step2_completed");
                                }
                                else {
                                    $rootScope.$broadcast("sync_failed", delHttpResp);
                                }
                            },
                            function (error) {
                                $rootScope.$broadcast("sync_failed", error);
                            }
                        );
                    }
                    else {
                        $rootScope.$broadcast("sync_failed", saveHttpResp);
                    }
                },
                function (error) {
                    $rootScope.$broadcast("sync_failed", error);
                }
            );
        };

        var syncStep3 = function () {
            employeeProvider.hardRemove().then(
                function (res) {
                    $rootScope.$broadcast("sync_step3_completed");
                },
                function (error) {
                    $rootScope.$broadcast("sync_failed", error);
                }
            );
        };

        var syncStep4 = function () {
            dataService.query().$promise.then(
                function (emps) {
                    if (emps.length == 0) {
                        $rootScope.$broadcast("sync_completed", emps);
                    }
                    else {
                        $rootScope.$broadcast("sync_step4_completed", emps);
                    }
                },
                function (error) {
                    $rootScope.$broadcast("sync_failed", error);
                }
            );
        };

        var syncStep5 = function (e, emps) {
            employeeProvider.insert(emps).then(
                function (addedEmps) {
                    $rootScope.$broadcast("sync_completed", addedEmps);
                },
                function (error) {
                    $rootScope.$broadcast("sync_failed", error);
                }
            );
        };

        var syncCompleted = function (e, emps) {
            _deferred.resolve(emps);
        };

        var syncFailed = function (error) {
            alert("Sync Failed: " + JSON.stringify(error));
            _deferred.resolve([]);
        };

        $rootScope.$on("sync_step1_completed", syncStep2);
        $rootScope.$on("sync_step2_completed", syncStep3);
        $rootScope.$on("sync_step3_completed", syncStep4);
        $rootScope.$on("sync_step4_completed", syncStep5);
        $rootScope.$on("sync_completed", syncCompleted);
        $rootScope.$on("sync_failed", syncFailed);

        //CALLBACK HELL
        //var synData = function () {
        //    employeeProvider.get({ Sync: false }).then(
        //        function (employees) {
        //            dataService.save(employees).$promise.then(
        //                function (saveResp, httpResp) {
        //                    if (saveResp) {
        //                        employeeProvider.hardRemove().then(
        //                            function (res) {
        //                                dataService.query().$promise.then(
        //                                    function (emps) {
        //                                        employeeProvider.insert(employees).then(
        //                                            function () {
        //                                                //successfully re-populated sqlite DB
        //                                            },
        //                                            function (error) {
        //                                                //step-5 failed
        //                                            }
        //                                        );
        //                                    },
        //                                    function (error) {
        //                                        //step-4 failed
        //                                    }
        //                                );
        //                            },
        //                            function (error) {
        //                                //step-3 failed
        //                            }
        //                        )
        //                    }
        //                },
        //                function (error) {
        //                    //step-2 failed
        //                }
        //            )
        //        },
        //        function (error) {
        //            //step-1 failed
        //        }
        //    );
        //};
    }
})();