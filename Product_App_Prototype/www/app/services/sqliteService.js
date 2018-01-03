(function () {
    "user strict";

    angular.module("pap").service("sqliteService", ["$rootScope", "$q", "Rollbar", SqliteService]);

    function SqliteService($rootScope, $q, Rollbar) {
        var db = null;
        var _this = this;

        var init = function () {
            db = window.sqlitePlugin.openDatabase({ name: 'pap.db', location: 'default' },
                function (db1) {
                    db1.executeSql('CREATE TABLE IF NOT EXISTS employee (Id, FirstName, LastName, Email, DOB, Sync, Deleted)');
                },
                function (error) {
                    Rollbar.error("sqlite openDatabase failed", error);
                }
            );
        };

        $rootScope.$on('device_ready_event', init);

        _this.get = function (query) {
            var deferred = $q.defer();

            db.transaction(
                function (tx) {
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
                },
                function (error) {
                    deferred.reject(error);
                },
                function () {
                }
            );

            return deferred.promise;
        };

        _this.insert = function (query, values) {
            var deferred = $q.defer();

            db.transaction(
                function (tx) {
                    for (var i = 0; i < values.length; i++) {
                        tx.executeSql(query, values[i]);
                    }
                },
                function (error) {
                    deferred.reject(error);
                },
                function () {
                    deferred.resolve();
                }
            );

            return deferred.promise;
        };

        _this.update = function (query) {
            var deferred = $q.defer();

            db.transaction(
                function (tx) {
                    tx.executeSql(query, [],
                        function (tx, res) {
                            deferred.resolve(res);
                        },
                        function (tx, error) {
                            deferred.reject(error);
                        }
                    );
                },
                function (error) {
                    deferred.reject(error);
                },
                function () {
                }
            );

            return deferred.promise;
        };

        _this.remove = function (query) {
            var deferred = $q.defer();

            db.transaction(
                function (tx) {
                    tx.executeSql(query, [],
                        function (tx, res) {
                            deferred.resolve(res);
                        },
                        function (tx, error) {
                            deferred.reject(error);
                        }
                    );
                },
                function (error) {
                    deferred.reject(error);
                },
                function () {
                }
            );

            return deferred.promise;
        };
    }
})();