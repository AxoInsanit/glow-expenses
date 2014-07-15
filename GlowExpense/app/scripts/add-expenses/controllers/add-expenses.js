'use strict';

angular.module('AddExpenses').controller('AddExpensesCtrl', ['$scope', '$location', 'expensesObj', function ($scope, $location, expensesObj) {
	$scope.errorMessage = 'Please try again! Something get wrong!';
    $scope.showErrorMessage = false;

    $scope.add=function(expense){

        var Expenses = new expensesObj();
        Expenses.title = expense.title;
        Expenses.description = expense.description;
        Expenses.date = expense.date;
        Expenses.amount = expense.amount;
        Expenses.currency = expense.currency;
        Expenses.rate = expense.rate;

        Expenses.$save()
            .then(function(response) {
                $scope.showErrorMessage = false;

                if( window.localStorage ){
                    localStorage.setItem('session-token', response.session_token);
                }

                $location.path('/expenses');

            },
            function(){
                $scope.showErrorMessage = true;
                $scope.expense.title = '';
                $scope.expense.description = '';
                $scope.expense.date = '';
                $scope.expense.amount = '';
                $scope.expense.currency = '';
                $scope.expense.rate = '';
            });
    };

}]);