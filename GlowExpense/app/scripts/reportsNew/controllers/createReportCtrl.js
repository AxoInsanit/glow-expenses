'use strict';
/*global alert */

angular.module('Reports')
    .controller('CreateReportCtrl', ['$scope', '$filter', '$location', 'addReportErrorMsg', 'reportsSharingSvc', '$modal', 'reportsRepositorySvc',
        function ($scope, $filter, $location, addReportErrorMsg,reportsSharingSvc,projectRepositorySvc, $modal)  {
            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.projects = null;

            $scope.reportData = {};

            //debugger;
            function onSuccess(projects) {
                $scope.projects = projects;
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

            $scope.projectNameModal = function(event) {
                //debugger;
                var modalInstance = $modal.open({
                    templateUrl: 'projectNameModal',
                    controller: 'projectNameModalCtrl',
                    size: 'sm',
                    resolve: {
                    data: function () {
                      return {'projects': $scope.projects,'target':event.target};
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
                $scope.reportData.token = localStorage.getItem('session-token');
                //debugger;
                //dont know from where to get it. Ask geronimo
                $scope.reportData.expense = undefined;
                $scope.reportData.expenseID = undefined;

                $scope.reportData.description = form.title;
                $scope.reportData.type = form.type;
                $scope.reportData.project = form.project;

                reportsSharingSvc.setReport($scope.reportData);

                $location.path('/edit-report');

                // TODO: GET THE DATA-ID,DATA-NAME FROM THE PROJECT INPUT
                //reportsRepositorySvc.saveReports($scope.reportData,onSuccessSave,onFailSave);
            };

        }
    ]);