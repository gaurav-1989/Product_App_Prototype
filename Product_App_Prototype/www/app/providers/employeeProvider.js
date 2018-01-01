(function () {
    "use strict";

    angular.module("pap").service("employeeProvider", ["sqliteService", "$q", "uuid", EmployeeProvider]);

    function EmployeeProvider(sqliteService, $q, uuid) {
        var tableName = 'employee';
        var _this = this;

        //TODO: add support for OR
        var createWhereClause = function (filter) {
            if (filter === undefined) {
                return null;
            }

            var whereClause = "WHERE ";
            var fieldVals = [];
            for (var f in filter) {
                if (typeof filter[f] === "string")
                    fieldVals.push(f + " = '" + filter[f] + "'");
                else
                    fieldVals.push(f + " = " + filter[f]);
            }

            whereClause += fieldVals.join(" AND ");

            return whereClause;
        };

        _this.get = function (filter) {
            var deferred = $q.defer();

            var query = "SELECT * FROM " + tableName;
            var whereClause = createWhereClause(filter);

            if (whereClause) {
                query += " " + whereClause;
            }

            sqliteService.get(query).then(
                function (employees) {
                    deferred.resolve(employees);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        _this.insert = function (employees, synced) {
            var deferred = $q.defer();
            var values = [];
            var query = "INSERT INTO " + tableName + " VALUES (?,?,?,?,?,?,?)";
            var valArr;
            for (var i = 0; i < employees.length; i++) {
                if (employees[i].DOB) {
                    employees[i].DOB = new Date(employees[i].DOB).toLocaleDateString();
                }
                if (synced === undefined || synced) {
                    employees[i].Sync = 1;
                }
                else {
                    employees[i].Id = uuid.v4();
                    employees[i].Sync = 0;
                }
                employees[i].Deleted = 0;
                valArr = Object.keys(employees[i]).map(function (k) { return employees[i][k] });
                values.push(valArr);
            }

            sqliteService.insert(query, values).then(
                function () {
                    deferred.resolve(employees);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        _this.softRemove = function (filter) {
            var deferred = $q.defer();

            var query = "Update " + tableName + " Set Deleted = 1, Sync = 0";
            var whereClause = createWhereClause(filter);

            if (whereClause) {
                query += " " + whereClause;
            }

            sqliteService.update(query).then(
                function (res) {
                    deferred.resolve(res);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };

        _this.hardRemove = function (filter) {
            var deferred = $q.defer();

            var query = "DELETE FROM " + tableName;
            var whereClause = createWhereClause(filter);

            if (whereClause) {
                query += " " + whereClause;
            }

            sqliteService.remove(query).then(
                function (res) {
                    deferred.resolve(res);
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };
    };
})();