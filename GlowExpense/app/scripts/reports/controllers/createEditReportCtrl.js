'use strict';

angular.module('Reports')
    .controller('CreateEditReportCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
        'reportsRepositorySvc', 'itemsSelectionDialogSvc', 'projectsSharingSvc', 'projectEntityName', 'projectAssigned',
        'allProjects','serverErrorMsg', 'editReportTitle', 'editReportBtnLabel', 'createReportTitle',
        'createReportBtnLabel', 'reportsPath', 'expenseSharingSvc', 'errorHandlerDefaultSvc', 'getIdFromLocationSvc',
        'localStorageSvc', 'sessionToken',
        function ($scope, $location, addReportErrorMsg, reportsSharingSvc, reportsRepositorySvc,
                   itemsSelectionDialogSvc,  projectsSharingSvc, projectEntityName, projectAssigned, allProjects,
                   serverErrorMsg, editReportTitle, editReportBtnLabel, createReportTitle, createReportBtnLabel,
                   reportsPath, expenseSharingSvc, errorHandlerDefaultSvc, getIdFromLocationSvc, localStorageSvc,
                   sessionToken)  {

            $scope.projectAssigned = projectAssigned;
            $scope.allProjects = allProjects;

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;

            var expenseIds = [];

            var reportId = getIdFromLocationSvc.getLastIdFromLocation($location.path());

            if (reportId){
                $scope.report = angular.copy(reportsSharingSvc.getReportById(reportId));
                $scope.isProjectSelected = $scope.report.entityId > 0;
                $scope.title = editReportTitle;
                $scope.buttonLabel = editReportBtnLabel;

                expenseIds = $scope.report.expenseIds;
            }
            else {
                $scope.report = {};

                $scope.title = createReportTitle;
                $scope.buttonLabel = createReportBtnLabel;
            }

            $scope.select = function(choise){
                if(choise==='allProjects')
                {
                    $scope.isProjectSelected = false;
                }
                else
                {
                    $scope.isProjectSelected = true;
                }
            };

            $scope.save = function(form, report){

                function createReportSuccess(){
                    reportsSharingSvc.resetReports();
                    reportsSharingSvc.expenseSharingSvc.addReport();
                    $location.path(reportsPath);
                }

                function saveReportSuccess(){
                    reportsSharingSvc.updateReport(report);
                    $location.path(reportsPath);
                }

                if(form.$valid)
                {
                    var projectId = 0;
                    if (report.project){
                        projectId = projectsSharingSvc.getProjectIdByName(report.project.name);
                    }

                    expenseIds = expenseSharingSvc.getExpenseIdsForReportAssign();

                    if (reportId) {
                        var reportViewModel = {
                            'expenseReportId': report.expenseReportId,
                            'description': report.title,
                            'applyTo': '',
                            'entityId': projectId,
                            'owner': localStorageSvc.getItem('userName'),
                            'expenseIds': expenseIds
                        };

                        reportsRepositorySvc.saveReport(
                            {
                                'token': localStorageSvc.getItem(sessionToken)
                            },
                            reportViewModel,
                            saveReportSuccess,
                            errorHandlerDefaultSvc.handleError
                        );
                    }
                    else {

                        var reportVM = {
                            'description': report.title,
                            'applyTo': 'PROJECT',
                            'entityId': projectId,
                            'owner': localStorageSvc.getItem('userName'),
                            'expenseIds': expenseIds
                        };
                        reportsRepositorySvc.createReport(
                            {
                                'token': localStorageSvc.getItem(sessionToken)
                            },
                            reportVM,
                            createReportSuccess,
                            errorHandlerDefaultSvc.handleError
                        );
                    }
                }
                else {
                    $scope.showErrorMessage = true;
                }
            };

            $scope.selectProject = function() {
                projectsSharingSvc.getProjects().then(function(response){
                    itemsSelectionDialogSvc.open(response, projectEntityName).then(function(selectedProject){
                        if (selectedProject){
                            $scope.report.project = selectedProject;
                        }
                    });
                });
            };
        }
    ]);
