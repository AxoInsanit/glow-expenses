'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', ['$scope', '$filter', '$location', 'expenseSvc', 'expensesBufferingSvc',
        'defaultMode', 'selectMode', 'expensesRequestNotificationChannelSvc', 'currenciesSvc', 'invoiceImageSvc',
        function ($scope, $filter, $location, expenseSvc, expensesBufferingSvc, defaultMode, selectMode,
                  expensesRequestNotificationChannelSvc, currenciesSvc, invoiceImageSvc) {

                var currencies = currenciesSvc.get();

                var mode = defaultMode;

                // TODO remove this when real services are implemented
                var firstLoad = true;

                $scope.expenses = [];

                $scope.searchedExpense = {};

                $scope.showSorting = false;
                $scope.reverseSorting = true;

                $scope.showSearch = false;

                $scope.showDeleteMode = false;

                $scope.addExpense = function() {
                    $location.path('/add-expense');
                };

                $scope.showInvoiceImage = function(invoiceImage) {
                    invoiceImageSvc.set(invoiceImage);
                    $location.path('/invoice-expense-image');
                };

                $scope.editExpense = function() {
                    $location.path('/edit-expense');
                };

                $scope.selectMode = function () {
                    return mode === selectMode;
                };

                $scope.select = function () {

                };

                $scope.getMoreExpenses = function () {

                    // TODO remove this when real services are implemented
                    if (firstLoad) {
                        firstLoad = false;
                        return;
                    }

                    expensesBufferingSvc.getMoreExpenses($scope).then(function (result) {
                        result.forEach(function (item) {
                            $scope.expenses.push(expenseSvc.getExpense($scope, item));
                        });

                    });
                };

                $scope.enableSorting = function () {
                    $scope.showSorting = true;
                };

                $scope.sort = function (reverseSorting) {
                    $scope.reverseSorting = reverseSorting;
                    order('date', reverseSorting);
                    $scope.showSorting = false;
                };

                $scope.toggleSearching = function (showSearch) {
                    $scope.showSearch = showSearch;
                };

                $scope.toggleSelectMode = function (select) {
                    if (select) {
                        mode = selectMode;
                        expensesRequestNotificationChannelSvc.activateSelectMode();
                    } else {
                        mode = defaultMode;
                    }
                };

                var orderBy = $filter('orderBy');

                function order(predicate, reverse) {
                    $scope.expenses = orderBy($scope.expenses, predicate, reverse);
                }

                expensesBufferingSvc.getExpenses($scope).then(function (result) {
                    result.forEach(function (item) {
                        $scope.expenses.push(item);
                    });
                });

            }
    ]);