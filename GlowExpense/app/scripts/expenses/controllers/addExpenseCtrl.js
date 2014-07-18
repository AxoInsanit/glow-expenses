'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpenseErrorMsg',

        function ($scope, $location, addExpenseErrorMsg) {

        $scope.errorMessage = addExpenseErrorMsg;
        $scope.showErrorMessage = false;
        $scope.imageSelectedPath = '';

        $scope.goBack = function(){
            $location.path('/expenses');
        }

        $scope.date = new Date();

        $scope.add = function(expense) {

//            var Expense = new AddExpensesSvc();
//            Expense.title = expense.title;
//            Expense.description = expense.description;
//            Expense.date = expense.date;
//            Expense.amount = expense.amount;
//            Expense.currency = expense.currency;
//            Expense.rate = expense.rate;
//
//            Expense.$save()
//                .then(function(response) {
//                    $scope.showErrorMessage = false;
//
//                    $location.path('/expenses');
//
//                },
//                function(){
//                    $scope.showErrorMessage = true;
//                    $scope.expense.title = '';
//                    $scope.expense.description = '';
//                    $scope.expense.date = '';
//                    $scope.expense.amount = '';
//                    $scope.expense.currency = '';
//                    $scope.expense.rate = '';
//                });
        };

        // TODO Mitko move this to a service
        $scope.takePhoto = function() {
            function onSuccess(imageURI) {
                $scope.imageSelectedPath = imageURI;
            }

            function onFail(message) {
                //not defined into the jslint ;( have to find other way to say that there is error
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
    }]);