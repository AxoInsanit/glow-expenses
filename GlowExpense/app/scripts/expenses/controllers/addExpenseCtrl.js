'use strict';

/* global Camera: false */
/* global alert: false */

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'expensesRepositorySvc', 'addExpenseErrorMsg',
        'currenciesSvc', 'expenseTypesSvc',

    function ($scope, $location, expensesRepositorySvc, addExpenseErrorMsg, currenciesSvc, expenseTypesSvc) {

        $scope.errorMessage = addExpenseErrorMsg;
        $scope.showErrorMessage = false;
        $scope.imageSelectedPath = '';

        $scope.date = new Date();
        $scope.currencies = currenciesSvc.get();

        $scope.expenseTypes = expenseTypesSvc.get();

       $scope.add = function(expense) {
           function onSuccess() {
              $scope.showErrorMessage = false;
              $location.path('/expenses');
            }

            function onFail() {
                $scope.showErrorMessage = true;
            }

           if($scope.expenseForm.$valid)
            {
               expense.date = new Date();
               expensesRepositorySvc.saveExpense(expense, onSuccess, onFail);
            }
            else
            {
                $scope.showErrorMessage = true;
            }
        };
        // TODO Mitko move this to a service
        $scope.cancelPhoto = function() {
            $scope.imageSelectedPath = '';
        }
        $scope.takePhoto = function() {
            function onSuccess(imageURI) {
                var x;
                if (confirm("Upload image to expense?") == true) {
                    alert("You pressed OK!");
                    $scope.$apply(function(){ $scope.imageSelectedPath = imageURI; })    
                } else {
                    alert("You pressed Cancel!");
                }
                
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

            //main function for photo
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, targetWidth: 100,
                targetHeight: 100, destinationType: Camera.DestinationType.FILE_URI });
        };
    }]);