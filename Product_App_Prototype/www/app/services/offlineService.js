(function () {
    "user strict";
    
    angular.module("pap")
    .service("offlineService", ["$rootScope", "$filter", "employeeProvider", "dataService", "$q", OfflineService]);
    
    function OfflineService($rootScope,$filter,employeeProvider,dataService, $q) {
        var _this = this;

        _this.Get = function (filter) {            
            var defer = $q.deferred();

             employeeProvider.Get(filter).then(
                 function(employees){
                        deferred.resolve(employees);
             }, 
             function(error){
                deferred.reject(error);
            }
            );

             return defer.promise;
        };

        // $rootScope.$on('app_resume_event', function() {   
        //        SynData();
        //  });

        // var SynData = function () {           
        //     //get all synced data from sql
        //     var getSyncedData=sqlService.getSyncedData("Sync:false");
        //     //if there are data available push it into the server i.e using the API Service
        //     if(getSyncedData.length>0)
        //     {
        //         var employeeDetails = [];
        //        for(var i=0; i < getSyncedData.length; i++) {
        //                employeeDetails.push({
        //                Id: getSyncedData[i].Id,
        //                FirstName: getSyncedData[i].FirstName,
        //                LastName: getSyncedData[i].LastName,
        //                DOB :getSyncedData[i].DOB,
        //                Email:getSyncedData[i].Email
                        
        //             });
        //             for(var i=0;i<employeeDetails.length;i++)
        //             {
        //                dataService.save(employeeDetails[i]);
        //             }
        //     }
        //     }          
        //     //getting the last Id from the API
        //     var self = this;
        //     var lastRecID=this;
        //             self.employeelist = dataService.query();
        //             lastRecID =$filter('orderBy')(self.employeelist,'ID')[self.employeelist.length-1].ID ;
                    
        //             //sending the last ID to API to get all the records after that

           
        // };
    }
    })();