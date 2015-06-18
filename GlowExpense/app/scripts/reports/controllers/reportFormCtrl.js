'use strict';

angular.module('Reports')
    .controller('ReportFormCtrl', function ($scope, $stateParams, reportResource, projectResource, ReportModel,
                                            itemsSelectionDialogSvc, transitionService, errorDialogSvc)  {

        var reportId = $stateParams.reportId,
            onGetAssignmentsFail;

        $scope.buttonLabel = reportId ? 'Save' : 'Create';
        $scope.showErrorMessage = false;
        $scope.expenseId = $stateParams.expenseId;
        $scope.project = {};
        $scope.organizationalUnit = {};
        $scope.showAllProjects = false;
        $scope.globerAssignments = [];
        $scope.assignedProjects = true;

        if ($scope.$parent) {
            $scope.$parent.title = reportId ? 'Edit report': 'Create report';

            if(!reportId) {
                // override layout back path
                $scope.$parent.backStateName = 'home';
                $scope.$parent.backStateParams = {view: 'reports'};
            }
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
            if($scope.report.applyTo === 'PROJECT') {
                return;
            }
            if ($scope.showAllProjects) {
                projectResource.getProjects().then(function(projects){
                    itemsSelectionDialogSvc.open(projects, 'projects', 'name').then(function(selectedProject){
                        if (selectedProject) {
                            $scope.project = selectedProject;
                            $scope.report.entityId = selectedProject.id;
                        }
                    });
                });
            } else {
                itemsSelectionDialogSvc.open($scope.globerAssignments, 'projects', 'name').then(function(selectedProject){
                        if (selectedProject) {
                            $scope.project = selectedProject;
                            $scope.report.entityId = selectedProject.id;
                        }
                    });
            }
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

        $scope.removeAssignments = function() {
            $scope.report.applyTo = 'ALL_PROJECTS';
            $scope.showAllProjects = true;
            $scope.globerAssignments = [];
            $scope.project = {};
            $scope.report.entityId = '';
        };

        $scope.getGloberAssignments = function() {
            projectResource.getGloberAssignments().then(function (assignments) {
                if (assignments && assignments.length > 0) {
                    $scope.report.applyTo = 'PROJECT';
                    $scope.showAllProjects = false;
                    $scope.project = assignments[0].project;
                    $scope.report.entityId = assignments[0].project.id;
                    $.each(assignments, function(index, assignment){
                        $scope.globerAssignments.push(assignment.project);
                    });
                } else {
                    $scope.showAllProjects = true;
                    $scope.assignedProjects = false;
                }
            }, onGetAssignmentsFail);
        };

        onGetAssignmentsFail = function(){
            errorDialogSvc.open('Can\'t load assignments!');
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

        $scope.getGloberAssignments();

    }
);
