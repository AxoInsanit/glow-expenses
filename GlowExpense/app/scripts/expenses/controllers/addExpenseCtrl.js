'use strict';

/* global Camera: false */
/* global alert: false */

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'editExpenseSvc', 'addExpenseErrorMsg',

    function ($scope, $location, editExpenseSvc, addExpenseErrorMsg) {

        $scope.errorMessage = addExpenseErrorMsg;
        $scope.showErrorMessage = false;
        $scope.imageSelectedPath = '';
        $scope.date = new Date();

       $scope.add = function(expense) {
           //var Expense = new editExpenseSvc();
           // add the expense id to expense object
           //debugger;
           function onSuccess(response) {
            debugger;
              $scope.showErrorMessage = false;
               alert("Go other path");
               $location.path('/expenses');
              
            }

            function onFail(response) {
              debugger;
                $scope.showErrorMessage = true;
            }
           if(!$scope.expenseForm.$invalid)
           {
               alert("In");
               debugger;
               editExpenseSvc.save1(expense,onSuccess, onFail);
                   // .then(function(response) {
                   //  debugger;
                   //     $scope.showErrorMessage = false;
                   //     alert("Go other path");
                   //     $location.path('/expenses');

                   // },
                   // function(){
                   //  debugger;
                   //  alert("Error");
                   //     $scope.showErrorMessage = true;
                   // });
            }
            else
            {
              alert("Out");
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
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
        };
    }]);