'use strict';

angular.module('Modals').factory('expenseCreatedDialog', function($modal){



        function open(reportId, reportDescription) {

            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/expenese-created-dialog.html',
                size: 'sm',
                controller: ['$scope', '$modalInstance', 'transitionService', function($scope, $modalInstance, transitionService) {

                    var goTo = function(place, param) {

                        transitionService.go({
                            name: place,
                            params: {
                                reportId: param
                            },
                            replace: true
                        });
                    };
                    
                    $scope.reportDescription = reportDescription;
                    $scope.addedToReport = reportId || false;

                    $scope.goToExpensesList = function() {
                        goTo('home', 'expenses');
                        $modalInstance.close();
                    };

                    $scope.goToReport = function() {
                        goTo('viewReport', reportId);
                        $modalInstance.close();
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
);