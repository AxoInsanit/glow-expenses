'use strict';

angular.module('Reports')
    .controller('ReportFormCtrl', function ($scope, $stateParams, reportResource, projectResource, ReportModel,
                                            itemsSelectionDialogSvc, transitionService, errorDialogSvc)  {

        var reportId = $stateParams.reportId;

        $scope.buttonLabel = reportId ? 'Save' : 'Create';
        $scope.showErrorMessage = false;
        $scope.expenseId = $stateParams.expenseId;
        $scope.project = {};
        $scope.organizationalUnit = {};

        if ($scope.$parent) {
            $scope.$parent.title = reportId ? 'Edit report': 'Create report';
        }

        $scope.removeWhiteSpaces = function () {
            if ($scope.report && $scope.report.description) {
                //remove consecutive spaces
                $scope.report.description = $scope.report.description.replace(/\s+/g, ' ');

                //remove whitespace from start of string
                if ($scope.report.description.charAt(0) === ' ') {
                  $scope.report.description = $scope.report.description.slice(1);
                }
            }
        };

        $scope.appliesTo = function (applyTo) {
            $scope.report.applyTo = applyTo;
        };

        $scope.selectProject = function() {
            projectResource.getProjects().then(function(projects){
                itemsSelectionDialogSvc.open(projects, 'projects', 'name').then(function(selectedProject){
                    if (selectedProject) {
                        $scope.project = selectedProject;
                        $scope.report.entityId = selectedProject.id;
                    }
                });
            });
        };

        $scope.selectOrganizationalUnit = function() {
            projectResource.getOrganizationalUnits().then(function(organizationalUnits){
                itemsSelectionDialogSvc.open(organizationalUnits, 'projects', 'name').then(function(selectedOrganizationalUnit){
                    if (selectedOrganizationalUnit) {
                        $scope.organizationalUnit = selectedOrganizationalUnit;
                    }
                });
            });
        };

        $scope.save = function () {
            if ($scope.report.applyTo === 'ORGANIZATIONAL_UNIT') {
                $scope.report.entityId = $scope.organizationalUnit.id;
            } else if ($scope.report.applyTo === 'PROJECT') {
                $scope.report.entityId = $scope.project.id;
            }

            $scope.report.save().then(function (reportId) {
                transitionService.go({
                    name: 'viewReport',
                    params: {
                        reportId: reportId
                    },
                    replace: true
                });
            }, function () {
                errorDialogSvc.open('Review fields!');
            });

        };

        if (reportId){
            reportResource.getReport(reportId).then(function (report) {
                $scope.report = new ReportModel(report);

                projectResource.getProject(report.entityId).then(function (project) {
                    $scope.project = project;
                });
                reportResource.getExpenses(reportId).then(function (expenses) {
                    var expenseIds = [];
                    if (expenses) {
                        expenses.map(function (expense) {
                           expenseIds.push(expense.expenseId);
                        });
                    }
                    $scope.report.expenseIds = expenseIds;
                });


            });
        } else {
            $scope.report = new ReportModel();
            $scope.report.expenseIds = [];
            $scope.report.applyTo = 'PROJECT';
        }
    }
);
