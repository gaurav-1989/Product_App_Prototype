(function () {
    "user strict";

    angular.module("pap").service("nativeService", ["$rootScope", "$window", NativeService]);

    function NativeService($rootScope, $window) {
        var _this = this;

        var pauseCallback = function () {
            // TODO: This application has been suspended. Save application state here.
        };

        var resumeCallback = function () {
            // TODO: This application has been reactivated. Restore application state here.
        };

        var deviceReadyCallback = function () {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', pauseCallback.bind(this), false);
            document.addEventListener('resume', resumeCallback.bind(this), false);

            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            //var parentElement = document.getElementById('deviceready');
            //var listeningElement = parentElement.querySelector('.listening');
            //var receivedElement = parentElement.querySelector('.received');
            //listeningElement.setAttribute('style', 'display:none;');
            //receivedElement.setAttribute('style', 'display:block;');

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