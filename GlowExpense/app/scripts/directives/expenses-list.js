'use strict';

angular.module('Directives').directive('expensesList', ['expensesListTemplateUrl', function(expensesListTemplateUrl) {
        return {
            restrict: 'E',
            replace: true,
            controller: ['$scope', '$location', 'expenseSvc', 'expensesRepositorySvc', 'expensesBufferingSvc',
                'confirmDeleteDialogSvc', 'reportEntity', 'sessionToken', 'errorHandlerDefaultSvc', 'expenseSharingSvc',
                function($scope, $location, expenseSvc, expensesRepositorySvc, expensesBufferingSvc,
                    confirmDeleteDialogSvc, reportEntity, sessionToken, errorHandlerDefaultSvc, expenseSharingSvc ) {


                    $scope.sort = function(item) {
                        return new Date(item.date);
                    };

                    $scope.deleteExpense = function(expenseId){

                        function deleteSuccess(){
                            expenseSharingSvc.deleteExpense(expenseId);
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