'use strict';

angular.module('Reports').factory('selectProjectsDialogSvc', ['$modal', 'projectsSharingSvc',
    function($modal, projectsSharingSvc){

        function open(lastSelected) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/reports/views/select-projects-dialog.html',
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    projectsSharingSvc.getProjects().then(function(response){
                        $scope.projects = response;

                        if (lastSelected) {
                            $scope.projects.forEach(function(item){
                                if (lastSelected.id === item.id){
                                    item.selected = true;
                                } else {
                                    item.selected = false;
                                }
                            });
                        }
                    });

                    $scope.select = function(project) {
                        if (lastSelected){
                            lastSelected.selected = false;
                        }

                        project.selected = true;
                        $modalInstance.close(project);
                    };

                }]
            });

            return modalInstance.result.then(function(response) {
                return response;
            });
        }

        return {
            open: open
        };
    }
]);