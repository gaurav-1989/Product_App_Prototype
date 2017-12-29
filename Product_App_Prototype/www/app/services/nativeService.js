(function () {
    "user strict";

    angular.module("pap").service("nativeService", ["$rootScope", "$window", NativeService]);

    function NativeService($rootScope, $window) {
        var _this = this;

        var pauseCallback = function () {
            $rootScope.$broadcast("app_pause_event");
        };

        var resumeCallback = function () {
            $rootScope.$broadcast("app_resume_event");
        };

        var deviceReadyCallback = function () {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', pauseCallback.bind(this), false);
            document.addEventListener('resume', resumeCallback.bind(this), false);

            //Handle the Cordova online and offlice events
            document.addEventListener('online', function () {
                $rootScope.$broadcast("device_online_event");
            });

            document.addEventListener('offline', function () {
                $rootScope.$broadcast("device_offline_event");
            });

            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            $rootScope.$broadcast("device_ready_event");

            //Show splash screen
            navigator.splashscreen.show();

            //Hide splash screen after 5 sec
            setTimeout(function () {
                navigator.splashscreen.hide();
            }, 5000);
        };

        _this.initListners = function () {
            document.addEventListener("deviceready", deviceReadyCallback, false);
        };

        _this.isNativeServiceAvailable = function () {
            return $window.cordova ? true : false;
        };

        _this.isNetworkAvailable = function () {
            var networkState = navigator.connection.type;
            return networkState !== $window.Connection.NONE;
        };
    }
})();