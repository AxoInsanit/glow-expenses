'use strict';

angular.module('Reports')
    .controller('EditReportCtrl', ['$scope', '$filter', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
       'reportsRepositorySvc', 'selectProjectsDialogSvc', 'itemsSelectionDialogSvc', 'projectsSharingSvc', 'projectEntityName',
        function ($scope, $filter, $location, addReportErrorMsg, reportsSharingSvc, reportsRepositorySvc,
                  selectProjectsDialogSvc, itemsSelectionDialogSvc,  projectsSharingSvc, projectEntityName)  {

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.projects = null;
            $scope.report = reportsSharingSvc.getReport();

            $scope.selectProject = function() {
                projectsSharingSvc.getProjects().then(function(response){
                    itemsSelectionDialogSvc.open(response, projectEntityName).then(function(selectedProject){
                        $scope.report.project = selectedProject;
                    });
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