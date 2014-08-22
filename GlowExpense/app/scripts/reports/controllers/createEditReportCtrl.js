'use strict';

angular.module('Reports')
    .controller('CreateEditReportCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
        'reportsRepositorySvc', 'itemsSelectionDialogSvc', 'projectsSharingSvc', 'projectEntityName', 'projectAssigned',
        'allProjects','serverErrorMsg', 'editReportTitle', 'editReportBtnLabel', 'createReportTitle',
        'createReportBtnLabel', 'reportsPath', 'expenseSharingSvc', 'errorHandlerDefaultSvc',
        function ($scope, $location, addReportErrorMsg, reportsSharingSvc, reportsRepositorySvc,
                   itemsSelectionDialogSvc,  projectsSharingSvc, projectEntityName, projectAssigned, allProjects,
                   serverErrorMsg, editReportTitle, editReportBtnLabel, createReportTitle, createReportBtnLabel,
                   reportsPath, expenseSharingSvc, errorHandlerDefaultSvc)  {

            $scope.projectAssigned = projectAssigned;
            $scope.allProjects = allProjects;

            $scope.errorMessage = addReportErrorMsg;
            $scope.showErrorMessage = false;

            var expenseIds = [];

            var report = reportsSharingSvc.getReport();

            if (report.expenseReportId){
                $scope.report = report;

                $scope.title = editReportTitle;
                $scope.buttonLabel = editReportBtnLabel;

                expenseIds = $scope.report.expenseIds;
            }
            else {
                $scope.report = {};

                $scope.title = createReportTitle;
                $scope.buttonLabel = createReportBtnLabel;

                expenseIds = expenseSharingSvc.getExpenseIdsForReportAssign();
            }

            $scope.save = function(form, report){
                function onSuccess(){
                    $location.path(reportsPath);
                }

                function onFail(errorResponse){
                    errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
                        $scope.showErrorMessage = false;
                    });
                }

                if(form.$valid)
                {
                    var projectId = projectsSharingSvc.getProjectIdByName(report.project.name);

                    var reportViewModel = {
                        'expenseReportId': report.expenseReportId,
                        'description': report.description,
                        'applyTo': report.project.name,
                        'entityId': projectId,
                        'expenseIds': expenseIds
                    };

                    if ($scope.report) {
                        reportsRepositorySvc.saveReport(reportViewModel,onSuccess,onFail);
                    }
                    else {
                        reportsRepositorySvc.createReport(reportViewModel,onSuccess,onFail);
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