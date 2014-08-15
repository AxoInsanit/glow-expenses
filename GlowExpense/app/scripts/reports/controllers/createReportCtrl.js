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
            $scope.reportData = {};

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
                    //$location.path('/reports');
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
                $scope.reportData.token = localStorage.getItem('session-token');

                //debugger;
                //dont know from where to get it. Ask geronimo

                $scope.reportData.expense = undefined;
                $scope.reportData.expenseID = undefined;

                $scope.reportData.description = form.title;
                $scope.reportData.type = form.type;
                $scope.reportData.project = form.project;

                reportsSharingSvc.setReport($scope.reportData);

                $location.path('/reports');

                // TODO: GET THE DATA-ID,DATA-NAME FROM THE PROJECT INPUT
                //reportsRepositorySvc.saveReports($scope.reportData,onSuccessSave,onFailSave);
            };
        }
    ]);