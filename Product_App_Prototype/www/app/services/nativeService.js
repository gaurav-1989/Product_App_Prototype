(function () {
    "user strict";

    angular.module("pap").service("nativeService", ["$rootScope", "$window", "$q", "config", NativeService]);

    function NativeService($rootScope, $window, $q, config) {
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

            FCMPlugin.onNotification(function (data) {
                if (data.wasTapped) {
                    //Notification was received on device tray and tapped by the user.
                    alert(JSON.stringify(data));
                } else {
                    //Notification was received in foreground. Maybe the user needs to be notified.
                    alert(JSON.stringify(data));
                }
            });

            //Show splash screen
            navigator.splashscreen.show();

            //Hide splash screen after 5 sec
            setTimeout(function () {
                navigator.splashscreen.hide();
            }, 5000);
        };

        var download = function (fileEntry, uri, deferred) {
            var fileTransfer = new FileTransfer();
            var fileURL = fileEntry.toURL();

            fileTransfer.download(
                uri,
                fileURL,
                function (entry) {
                    if (deferred)
                        deferred.resolve(entry);
                },
                function (error) {
                    //error downloading file
                    deferred.reject(error);
                },
                null);
        }

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

        _this.isFileExist = function (path) {
            var deferred = $q.defer();

            window.resolveLocalFileSystemURL(path,
                function (fileEntry) {
                    deferred.resolve(true);
                }, function () {
                    deferred.resolve(false);
                }
            );

            return deferred.promise;
        };

        _this.downloadFile = function (url, name, size) {
            var deferred = $q.defer();
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, size, function (fs) {
                fs.root.getFile(name, { create: true, exclusive: false },
                    function (fileEntry) {
                        download(fileEntry, url, true);
                    }, function (error) {
                        //error creating file
                        deferred.reject(error);
                    });
            }, function (error) {
                //error loading file system
                deferred.reject(error);
            });

            return deferred.promise;
        };

        var options = {
            successCallback: function () {
                //alert("Video was closed without error event.");
            },
            errorCallback: function (errMsg) {
                alert("Error! " + errMsg);
            },
            orientation: 'landscape',
            shouldAutoClose: true,
            controls: true
        };

        _this.playVideo = function (videoFileName) {
            try {
                var url = config.videoApiUrl + "?videoFileName=" + videoFileName;
                window.plugins.streamingMedia.playVideo(url, options);
            }
            catch (error) {
                alert(error);
            }
        };

//     

        _this.imageLoad = function (imageFileName) {
         debugger
            var url = 'https://static.ivanti.com/sites/marketing/media/images/solutions/win-ten/'+imageFileName;
            var filePath = cordova.file.dataDirectory + '/'+imageFileName;
            var fileTransfer = new FileTransfer();
            var uri = encodeURI(url);
           
            window.resolveLocalFileSystemURL(filePath,
                function (fileEntry) {
                  document.getElementById("downloadedimage").src = filePath;
                }, function () {
                    fileTransfer.download(
                        uri,
                        filePath,
                        function (entry) {
                            var path = entry.fullPath + '/' + imageFileName;
                            ocument.getElementById("downloadedimage").src = entry.toURL();
                        },
                        function (error) {
                            console.log("download error source " + error.source);
                            console.log("download error target " + error.target);
                            console.log("upload error code" + error.code);
                        },
                        false,
                        {
                            headers: {
                            }
                        }
                    );
                })                 

            
        }
    }
})();