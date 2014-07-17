'use strict';

angular.module('Expenses')
    .controller('ExpensesListDefaultCtrl', ['$scope', '$filter',
        function ($scope, $filter) {

            $scope.showSorting = false;
            $scope.reverseSorting = true;

            $scope.showSearch = false;

            $scope.showDeleteMode = false;
            
            $scope.addExpense= function() {
                $location.path('/addexpenses');
            };

            $scope.enableSorting = function() {
                $scope.showSorting = true;
            };

            $scope.sort = function(reverseSorting) {
                $scope.reverseSorting = reverseSorting;
                order('date', reverseSorting);
                $scope.showSorting = false;
            };

            $scope.toggleSearching = function(showSearch){
                $scope.showSearch = showSearch;
            };

            var orderBy = $filter('orderBy');

            function order(predicate, reverse) {
                $scope.expenses = orderBy($scope.expenses, predicate, reverse);
            }

        }]);
