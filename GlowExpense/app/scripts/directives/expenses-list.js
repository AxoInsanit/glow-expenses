'use strict';

angular.module('Directives').directive('expensesList', function($stateParams, expenseResource, reportResource, transitionService, localStorageSvc, confirmDeleteDialogSvc, editExRateDialogSvc, errorDialogSvc, $q, $filter) {
    return {
        restrict: 'E',
        replace: true,
        controller: function($scope) {

            $scope.reportId = $stateParams.reportId;
            var expensesSelected = {},
                originalExpenses = [],
                checkboxsList = {};

            function selectedToArray(onlyId){
                var expenseIds = [];
                _.each(expensesSelected, function(expense){
                    if (onlyId) {
                        expenseIds.push(expense.expenseId);
                    }
                    else {
                        expenseIds.push(expense);
                    }
                });
                return expenseIds;
            }

            $scope.unselected = function (){
               return _.isEmpty(expensesSelected);
            };

            $scope.addExpenses = function(event) {
                event.stopPropagation();
                event.preventDefault();

                var expenseIds = selectedToArray(true);
                // add expenses to report
                reportResource.addExpense($scope.reportId, expenseIds).then(function () {
                    transitionService.go({
                        name: 'viewReport',
                        params: {
                            reportId: $scope.reportId
                        },
                        replace: true
                    });
                }, function(){
                        return errorDialogSvc.open('Couldn\'t add expenses');
                });
            };

            $scope.itemChecked = function (index) {
                checkboxsList[index] = !checkboxsList[index];
                if (checkboxsList[index]) {
                    expensesSelected[index] = originalExpenses[index];
                }
                else {
                    delete expensesSelected[index];
                }
                $scope.editMode = !$scope.unselected();
            };

            $scope.checked = function (index) {
                return checkboxsList[index];
            };

            $scope.deleteExpenses = function (event) {
                event.stopPropagation();
                event.preventDefault();

                confirmDeleteDialogSvc.open('expenses').then(function(){
                    var expenseIds = selectedToArray(true),
                        promises = [];

                    _.each(expenseIds, function(expenseId){
                    //temporary solution until api new release allows deleting multiple expenses at once
                        if ($stateParams.reportId) {
                            promises.push(reportResource.removeExpense($stateParams.reportId, expenseId));
                        } else {
                            promises.push(expenseResource.removeExpense(expenseId));
                        }
                    });
                    $q.all(promises).then(function() {
                        $stateParams.view = 'expense';
                        transitionService.reload();
                    }, function(){
                        return errorDialogSvc.open('Couldn\'t remove expense');
                    });
                });
            };

            $scope.editExRate = function(event){
                event.stopPropagation();
                event.preventDefault();

                editExRateDialogSvc.open().then(function(value){
                    var expenses = selectedToArray(),
                        promises = [];

                    _.each(expenses, function(expense){
                        //temporary solution until api new release allows updating multiple expenses at once
                        if ($stateParams.reportId) {
                            expense.exchangeRate = value;
                            promises.push(expenseResource.updateExpense(expense));
                        } else {
                            expense.exchangeRate = value;
                            promises.push(expenseResource.updateExpense(expense));
                        }
                    });

                    $q.all(promises).then(function() {
                        if ($stateParams.reportId) {
                            //temporary solution until api new release allows get Report by reportId
                            reportResource.cleanCache($stateParams.reportId);
                        }
                        $stateParams.view = 'expense';
                        transitionService.reload();
                    }, function(){
                        return errorDialogSvc.open('Couldn\'t update expense');
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

            var unregister = $scope.$watch('expenses', function(){
                if ($scope.expenses) {
                    originalExpenses = angular.copy($scope.expenses);
                    _.each($scope.expenses, function(expense){
                        expense.currencyCode = getCurrencyCode(expense.originalCurrencyId);
                        expense.currencySocCode = getCurrencyCode(expense.societyCurrencyId);
                        expense.dateFilter = $filter('date')(expense.date, 'dd MMMM yyyy');
                        expense.originalAmountFormatted = $filter('currency')(expense.originalAmount);
                    });
                    unregister();
                }
            }, true);

            var getCurrencyCode = function(currencyId){
                var currencies = JSON.parse(localStorageSvc.getItem('currencies')),
                    currency = _.findWhere(currencies,{'id':currencyId});
                return currency.code;
            };
        },
        templateUrl: 'scripts/directives/views/expenses-list.html'
    };
});
