﻿(function () {
    "user strict";

    angular.module("pap").service("sqliteService", ["$rootScope", "$q", SqliteService]);

    function SqliteService($rootScope, $q) {
        var db = null;
        var _this = this;

        var init = function () {
            db = window.sqlitePlugin.openDatabase({ name: 'pap.db', location: 'default' },
                function (db1) {
                    db1.executeSql('CREATE TABLE IF NOT EXISTS employee (Id, FirstName, LastName, Email, DOM, Sync)');
                },
                function (err) {
                    //Handle open db error
                }
            );
        };

        $rootScope.$on('device_ready_event', init);

        _this.get = function (query) {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                tx.executeSql(query, [],
                    function (tx, resultSet) {
                        var results = [];

                        for (var i = 0; i < resultSet.rows.length; i++) {
                            results.push(resultSet.rows.item(i));
                        }

                        deferred.resolve(results);
                    },
                    function (tx, error) {
                        deferred.reject(error);
                    }
                );
            }, function (error) {
                //Handle tnx error
                deferred.reject(error);
            }, function () {
                //Handle tnx success
            });

            return deferred.promise;
        };

        _this.insert = function (query, values) {
            var deferred = $q.defer();

            db.transaction(function (tx) {
                for (var i = 0; i < values.length; i++) {
                    tx.executeSql(query, values[i]);
                }
            }, function (error) {
                //Handle tnx error
                deferred.reject(error);
            }, function () {
                //Handle tnx success
                deferred.resolve();
            });

            return deferred.promise;
        };
    }
})();