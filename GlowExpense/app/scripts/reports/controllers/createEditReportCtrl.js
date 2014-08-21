'use strict';

angular.module('Reports')
    .controller('CreateEditReportCtrl', ['$scope', '$location', 'addReportErrorMsg', 'reportsSharingSvc',
        'reportsRepositorySvc', 'itemsSelectionDialogSvc', 'projectsSharingSvc', 'projectEntityName', 'projectAssigned',
        'allProjects','serverErrorMsg', 'editReportTitle', 'editReportBtnLabel', 'createReportTitle',
        'createReportBtnLabel', 'reportsPath', 'expenseSharingSvc',
        function ($scope, $location, addReportErrorMsg, reportsSharingSvc, reportsRepositorySvc,
                   itemsSelectionDialogSvc,  projectsSharingSvc, projectEntityName, projectAssigned, allProjects,
                   serverErrorMsg, editReportTitle, editReportBtnLabel, createReportTitle, createReportBtnLabel,
                   reportsPath, expenseSharingSvc)  {

            $scope.projectAssigned = projectAssigned;
            $scope.allProjects = allProjects;

            $scope.errorMessage = addReportErrorMsg;
            $scope.serverErrorMsg = serverErrorMsg;

            $scope.showErrorMessage = false;
            $scope.showServerErrorMessage  = false;

            var expenseIds = [];

            var report = reportsSharingSvc.getReport();

            if (report.expenseReportId){
                $scope.report = report;

                $scope.title = editReportTitle;
                $scope.buttonLabel = editReportBtnLabel;

                // TODO where are we getting the report project from ? The report api does not have such a property. Hardcode this for now
                $scope.report.project = {
                    name:  'New Website Development'
                };

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

                function onFail(){
                    $scope.showErrorMessage = false;
                    $scope.showServerErrorMessage = true;
                }

                if(form.$valid)
                {
                    var reportViewModel = {
                        'expenseReportId': report.expenseReportId,
                        'description': report.description,
                        'applyTo': report.project.name,
                        'entityId': 1245,
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
                    $scope.showServerErrorMessage = false;
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