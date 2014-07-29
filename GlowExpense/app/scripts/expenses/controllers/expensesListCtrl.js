'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', ['$scope', '$filter', '$location', 'expenseSvc', 'expensesBufferingSvc',
        'defaultMode', 'selectMode', 'editExpenseSvc', 'cameraSvc',
        function ($scope, $filter, $location, expenseSvc, expensesBufferingSvc, defaultMode, selectMode, editExpenseSvc,
                  cameraSvc)  {


             //   var currencies = currenciesSvc.get();

                var mode = defaultMode;

                // TODO remove this when real services are implemented
                var firstLoad = true;
                $scope.isMain = true;
                $scope.expenses = [];

                $scope.searchedExpense = {};

                $scope.showSorting = false;
                $scope.reverseSorting = true;

                $scope.showSearch = false;

                $scope.showDeleteMode = false;

                //when edit list is active
                $scope.$on('EditList', function(event, args) {});

                $scope.takePhoto = function() {
                    function onSuccess(imageURI) {
                        $scope.imageSelectedPath = imageURI;
                    }

                    function onFail(message) {
                        alert('Failed because: ' + message);
                    }

                    //main function for photo
                    navigator.camera.getPicture(onSuccess, onFail,
                        {
                            quality: 50,
                            destinationType: Camera.DestinationType.FILE_URI,
                            targetWidth: 50,
                            targetHeight: 50
                        }
                    );
                };

                $scope.showInvoiceImage = function() {
                    $location.path('/invoice-expense-image');
                };

                $scope.editExpense = function(expense) {
                    editExpenseSvc.setExpenseForEdit(expense);
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

                $scope.takePhoto = function(expense) {
                    cameraSvc.takePhoto().then(function(){
                        // TODO get the type from the image or make constants with the types
                        expense.imageType = 'jpg';
                    });
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