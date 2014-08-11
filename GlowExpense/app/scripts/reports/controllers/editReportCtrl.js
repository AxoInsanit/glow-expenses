'use strict';
/*global alert */

angular.module('Reports')
    .controller('EditReportCtrl', ['$scope', '$filter', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
        'projectsRepositorySvc', '$modal', 'reportsRepositorySvc', 'selectProjectsDialogSvc',
        function ($scope, $filter, $location, addReportErrorMsg, reportsSharingSvc,
                  projectsRepositorySvc, $modal, reportsRepositorySvc, selectProjectsDialogSvc)  {
            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.projects = null;
            $scope.report = reportsSharingSvc.getReport();

            debugger;
            function onSuccess(projects) {
                $scope.projects = projects;
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

            function onSuccessSave() {
                $location.path('/view-report');
            }

            function onFailSave(message) {
                alert('Failed because: ' + message);
            }
            
            $scope.selectProject = function(project) {
                selectProjectsDialogSvc.open(project).then(function(selectedProject){
                    $scope.report.project = selectedProject;
                });
            };

            $scope.report = reportsSharingSvc.getReport();

          $scope.save = function(form){
              if(form.$valid)
              {
                  $location.path('/reports');
              }
              else {
                  $scope.showErrorMessage = true;
              }
           // reportsRepositorySvc.editReports($scope.reportData,onSuccessSave,onFailSave);
          };

        }
    ]);