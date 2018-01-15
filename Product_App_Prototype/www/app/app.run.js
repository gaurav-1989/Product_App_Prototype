(function () {
    "use strict";

    angular.module("pap").run(["nativeService", "$rootScope", "$location", "$window", "$mdDialog", runBlock]);

    function runBlock(nativeService, $rootScope, $location, $window, $mdDialog) {
        nativeService.initListners();

        $rootScope.$onMany = function (events, fn) {
            for (var i = 0; i < events.length; i++) {
                this.$on(events[i], fn);
            }
        }

        $rootScope.location = $location;
        $rootScope.window = $window;

        $rootScope.openAddEmpDg = function (ev) {
            $mdDialog.show({
                template: '<add-employee></add-employee>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true
            }).then(function (answer) {
                alert('You said the information was "' + answer + '".');
            }, function () {
                alert('You cancelled the dialog.');
            });
        };
    }
})();