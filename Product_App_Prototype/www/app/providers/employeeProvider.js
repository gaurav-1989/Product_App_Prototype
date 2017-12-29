(function () {
    "use strict";

    angular.module("pap").service("employeeProvider", ["sqliteService", "$q", EmployeeProvider]);

    function EmployeeProvider(sqliteService, $q) {
        var tableName = 'employee';
        var _this = this;

        var createSelectQuery = function (table, filter) {
            var whereClause = null;
            if (filter) {
                whereClause = " WHERE "
                for (var f in filter) {
                    whereClause += f + " = " + filter[f] + " AND ";
                }
                whereClause = whereClause.trim(" AND ");
            }

            return 'SELECT * FROM ' + table + (whereClause ? whereClause : "");
        };

        _this.get = function (filter) {
            var deferred = $q.defer();
            var query = createSelectQuery(tableName, filter);

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

        _this.insert = function (employees) {
            var deferred = $q.defer();
            var values = [];
            var query = "INSERT INTO " + tableName + " VALUES (?,?,?,?,?,?)";

            var valArr;
            for (var i = 0; i < employees.length; i++) {
                valArr = Object.keys(employees[i]).map(function (k) { return employees[i][k] });
                values.push(valArr);
            }

            sqliteService.insert(query, values).then(
                function () {
                    deferred.resolve();
                },
                function (error) {
                    deferred.reject(error);
                }
            );

            return deferred.promise;
        };
    }
})();