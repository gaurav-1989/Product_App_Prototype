(function () {
    "use strict";

    angular.module("pap").run(["nativeService", "employeeService", runBlock]);

    function runBlock($rootScope, nativeService, employeeService) {
        nativeService.initListners();
    }
})();