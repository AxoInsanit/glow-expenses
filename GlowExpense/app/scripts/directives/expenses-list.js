'use strict';

angular.module('Directives').directive('expensesList', function($stateParams, transitionService, confirmDeleteDialogSvc,
                                                                expenseResource, reportResource, errorDialogSvc, localStorageSvc) {
    return {
        restrict: 'E',
        replace: true,
        controller: function($scope) {

            $scope.deleteExpense = function (expense, event) {
                event.stopPropagation();
                event.preventDefault();
                confirmDeleteDialogSvc.open('expense').then(function(){
                    var promise;
                    if ($stateParams.reportId) {
                        promise = reportResource.removeExpense($stateParams.reportId, expense.expenseId);
                    } else {
                        promise = expenseResource.removeExpense(expense.expenseId);
                    }
                    promise.catch(function () {
                        return errorDialogSvc.open('Couldn\'t remove expense');
                    }).finally(function () {
                        $stateParams.view = 'expense';
                        transitionService.reload();
                    });
                });
            };

            $scope.takePhoto = function (expense, event) {
                event.stopPropagation();
                event.preventDefault();
                if ($stateParams.reportId) {
                    transitionService.go({
                        name: 'editReportExpense',
                        params: {
                            reportId: $stateParams.reportId,
                            expenseId: expense.expenseId,
                            imageModal: 'open'
                        },
                        direction: 'forward'
                    });
                } else {
                    transitionService.go({
                        name: 'editExpense',
                        params: {
                            expenseId: expense.expenseId,
                            imageModal: 'open'
                        },
                        direction: 'forward'
                    });
                }
            };

            $scope.getCurrencyCode = function(currencyId){
                var currencies = JSON.parse(localStorageSvc.getItem('currencies')),
                    currency = _.findWhere(currencies,{'id':currencyId});
                return currency.code;

            };
        },
        templateUrl: 'scripts/directives/views/expenses-list.html'
    };
});
