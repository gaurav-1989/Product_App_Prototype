(function () {
    "use strict";

    angular.module("pap").run(["nativeService","employeeService", runBlock]);
    

    function runBlock(nativeService,employeeService) {
        nativeService.initListners();
        console.log(employeeService.query());   
    }
    
})();