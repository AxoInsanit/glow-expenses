'use strict';

angular.module('Reports')
    .controller('ReportsCtrl', ['$scope', '$filter', '$location', 'reportsRepositorySvc', '$modal',
        function ($scope, $filter, $location, reportsRepositorySvc, $modal)  {
            $scope.isMain = true;
            $scope.reportCollection = {};

            $scope.showEditMode = false;
            //when edit list is active
            $scope.$on('EditList', function(event, args) {
                $scope.showEditMode = args;
            });

            $scope.deleteReport = function(report) {
            	
            	$scope.reportForDeletion = report;
                var modalInstance = $modal.open({
                    templateUrl: 'deleteModal',
                    controller: 'deleteExpModalCtrl',
                    size: "sm",
                    resolve: {}
                });   
                modalInstance.result.then(function () {
                    function onSuccess(reportsRepositorySvc) {
                        reportsRepositorySvc.getReports();
                    }

                    function onFail(message) {
                        alert('Failed because: ' + message);
                    }
                    reportsRepositorySvc.deleteReports({"token":localStorage.getItem("session-token"),"expenseReportId":$scope.reportForDeletion.expenseReportId},onSuccess(reportsRepositorySvc),onFail());
                }, function () {
                });     

            };

            $scope.viewReport = function(report) {
                if((!$scope.showEditMode)&&(!report.locked))
                {
                    $location.path('/view-report');
                }
            };

            $scope.createReport = function() {
                $location.path('/create-report');
            };
            function onSuccess(reports) {
            	$scope.reportCollection = reports;
                //debugger;
                
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
           reportsRepositorySvc.getReports(onSuccess,onFail);

            
        }
    ]);