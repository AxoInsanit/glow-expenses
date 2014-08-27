'use strict';

angular.module('Expenses').factory('expenseSharingSvc', ['$q', 'expensesRepositorySvc', 'errorHandlerDefaultSvc',
    'localStorageSvc', 'sessionToken', 'expenseSvc',

    function($q, expensesRepositorySvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc) {
        //full expenses collection. Used to mark and controll the expenses placed on screen
        var expensesCollection = {}
        var expensesCollection.shown = 0;
        //this variable controll how many expenses are on screen
        var counter = 5;

        function setMoreExpenses(){
            //we save the code from error if we go over the array length
            if($scope.expensesCollection.items.length < $scope.expensesCollection.shown +$scope.counter)
            {
                $scope.expensesCollection.shown = $scope.expensesCollection.items.length - $scope.counter;
            }

            for(var counter = $scope.expensesCollection.shown; counter < $scope.expensesCollection.shown +$scope.counter; counter++)
            {
                $scope.expenses[counter] = $scope.expensesCollection.items[counter];
            }

            $scope.expensesCollection.shown += $scope.counter;
        }

        function setCollection(result){
            expensesCollection = result.sort(function(a,b){
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.date) - new Date(a.date);
            });
        }
    }
]);
