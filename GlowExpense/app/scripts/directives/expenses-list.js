'use strict';

angular.module('Directives').directive('expensesList', ['expensesListTemplateUrl', function(expensesListTemplateUrl) {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope', '$location', 'expenseSvc', 'expensesRepositorySvc', 'confirmDeleteDialogSvc',
                'reportEntity', 'sessionToken', 'errorHandlerDefaultSvc', 'expenseSharingSvc', 'getIdFromLocationSvc',
                'infiniteScrollEnabled',

                function($scope, $location, expenseSvc, expensesRepositorySvc,  confirmDeleteDialogSvc, reportEntity,
                   sessionToken, errorHandlerDefaultSvc, expenseSharingSvc, getIdFromLocationSvc, infiniteScrollEnabled) {

                    $scope.sort = function(item) {
                        return new Date(item.date);
                    };

                    $scope.deleteExpense = function(expenseId){

                        function deleteSuccess(){
                            var reportId = getIdFromLocationSvc.getLastIdFromLocation($location.path());

                            expenseSharingSvc.deleteExpense(expenseId, reportId);

                            if (!infiniteScrollEnabled){
                                return;
                            }

                            var expenseToDeleteIndex = 0;

                            $scope.expenses.some(function(item, index){
                                if (item.expenseId === expenseId){
                                    expenseToDeleteIndex = index;
                                    return true;
                                }
                            });

                            if (expenseToDeleteIndex !== null){
                                $scope.expenses.splice(expenseToDeleteIndex, 1);
                            }
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