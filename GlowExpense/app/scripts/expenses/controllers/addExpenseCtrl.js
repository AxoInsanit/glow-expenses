'use strict';

/* global Camera: false */
/* global alert: false */

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'expenseSvc', 'addExpenseErrorMsg',

        function ($scope, $location, addExpenseErrorMsg) {

        $scope.errorMessage = addExpenseErrorMsg;
        $scope.showErrorMessage = false;
        $scope.imageSelectedPath = '';
        $scope.date = new Date();

       $scope.add = function(expense) {

           var Expense = new AddExpensesSvc();
           Expense.title = expense.title;
           Expense.description = expense.description;
           Expense.date = expense.date;
           Expense.amount = expense.amount;
           Expense.currency = expense.currency;
           Expense.rate = expense.rate;

           debugger;

           Expense.$save()
               .then(function(response) {
                   $scope.showErrorMessage = false;

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
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
        };
    }]);