'use strict';

angular.module('AddExpenses')
    .controller('AddExpensesCtrl', ['$scope', '$location', 'AddExpensesSvc', 'errorMsg', function ($scope, $location, AddExpensesSvc, errorMsg) {

    	$scope.errorMessage = errorMsg;
        $scope.showErrorMessage = false;

        $scope.goBack = function(){
            $location.path('/expenses');
        }

        $scope.todayDate = function(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            } 

            if(mm<10) {
                mm='0'+mm
            } 
            today = "";
            today = mm+'/'+dd+'/'+yyyy;
            return today;
        }

        $scope.add=function(expense){

            var Expense = new AddExpensesSvc();
            Expense.title = expense.title;
            Expense.description = expense.description;
            Expense.date = expense.date;
            Expense.amount = expense.amount;
            Expense.currency = expense.currency;
            Expense.rate = expense.rate;


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

        $scope.takePhoto = function() {
            function onSuccess(imageURI) {
                var image = {};
                image.src = imageURI;
                alert(imageURI);
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