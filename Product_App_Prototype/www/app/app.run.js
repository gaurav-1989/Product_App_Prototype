(function () {
    "use strict";

    angular.module("pap").run(["nativeService", "$rootScope", "$location", "$window", runBlock]);

    function runBlock(nativeService, $rootScope, $location, $window) {
        nativeService.initListners();

        $rootScope.$onMany = function (events, fn) {
            for (var i = 0; i < events.length; i++) {
                this.$on(events[i], fn);
            }
        }

        $rootScope.location = $location;
        $rootScope.window = $window;
    }
})();