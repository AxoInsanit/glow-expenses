'use strict';

angular.module('Reports')
    .controller('CreateReportCtrl', ['$scope', '$filter', '$location', 'addReportErrorMsg', 'reportSharingSvc', 'projectRepositorySvc', '$modal', 'reportsRepositorySvc',
        function ($scope, $filter, $location, addReportErrorMsg,reportSharingSvc,projectRepositorySvc, $modal, reportsRepositorySvc)  {
            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.projects = null;
            //debugger;
            function onSuccess(projects) {
            	$scope.projects = projects;
            };

            function onFail(message) {
                alert('Failed because: ' + message);
            };

            function onSuccessSave() {
            	$location.path('/reports');
            };

            function onFailSave(message) {
                alert('Failed because: ' + message);
            };

            $scope.projectNameModal = function($event) {
            	//debugger;
                var modalInstance = $modal.open({
                    templateUrl: 'projectNameModal',
                    controller: 'projectNameModalCtrl',
                    size: "sm",
                    resolve: {
                    data: function () {
                      return {"projects": $scope.projects,"target":event.target};
                    }
                  }
                });   
                modalInstance.result.then(function () {
                   //onclose
                }, function () {
                }); 
            };

            projectRepositorySvc.getProjects( onSuccess,onFail );

          
           //TODO: SEND THE FORM NOW IT DOESNT SEND ANYTHING
           $scope.save = function(form){
          	 reportsRepositorySvc.saveReports({},onSuccessSave,onFailSave);
           };

        }
    ]);