'use strict';

angular.module('Directives').directive('expensesList', ['expensesListTemplateUrl', function(expensesListTemplateUrl) {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope', '$location', 'expenseSvc', 'expensesRepositorySvc', 'confirmDeleteDialogSvc',
                'reportEntity', 'sessionToken', 'errorHandlerDefaultSvc', 'expenseSharingSvc', 'getIdFromLocationSvc',

                function($scope, $location, expenseSvc, expensesRepositorySvc,  confirmDeleteDialogSvc, reportEntity,
                   sessionToken, errorHandlerDefaultSvc, expenseSharingSvc, getIdFromLocationSvc) {

                    $scope.sort = function(item) {
                        return new Date(item.date);
                    };

                    $scope.deleteExpense = function(expenseId){

                        function deleteSuccess(){
                            var reportId = getIdFromLocationSvc.getLastIdFromLocation($location.path());

                            expenseSharingSvc.deleteExpense(expenseId, reportId);
                        }
                        confirmDeleteDialogSvc.open(reportEntity).then(function(){
                            expensesRepositorySvc.deleteExpense(
                                {
                                    expenseId: expenseId,
                                    token: localStorage.getItem(sessionToken)
                                },
                                deleteSuccess,
                                errorHandlerDefaultSvc.handleError
                            );
                        });
                    };
                }
            ],
            templateUrl: expensesListTemplateUrl
        };
    }
]);