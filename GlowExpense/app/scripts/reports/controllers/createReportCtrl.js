'use strict';
/*global alert */

angular.module('Reports')
    .controller('CreateReportCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
        'projectsRepositorySvc', 'reportsRepositorySvc', 'selectProjectsDialogSvc',
        function ($scope, $location, addReportErrorMsg,reportsSharingSvc,projectsRepositorySvc,
                  reportsRepositorySvc, selectProjectsDialogSvc)  {
            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;
            $scope.projects = null;

            $scope.report = {};

            function onSuccess(projects) {
                $scope.projects = projects;
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

            $scope.selectProject = function(project) {
                selectProjectsDialogSvc.open(project).then(function(selectedProject){
                    $scope.report.project = selectedProject;
                });
            };

            projectsRepositorySvc.getProjects( onSuccess,onFail );

            $scope.save = function(form){
                if(form.$valid)
                {
                    // TODO implement service
                    $location.path('/reports');
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
            };
        }
    ]);