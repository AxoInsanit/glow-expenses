'use strict';

angular.module('Expenses')
    .controller('AddExpenseCtrl', ['$scope', '$location', 'addExpensesTitle', 'addExpensesButtonLabel', 'reportsSharingSvc',
        'expensesRepositorySvc', 'editSaveExpenseDialogSvc',
        function ($scope, $location, addExpensesTitle, addExpensesButtonLabel, reportsSharingSvc,
          expensesRepositorySvc, editSaveExpenseDialogSvc) {

            $scope.title = addExpensesTitle;
            $scope.buttonLabel = addExpensesButtonLabel;
            $scope.showErrorMessage = false;

            $scope.expense = {};
            $scope.report = reportsSharingSvc.getReport();

            $scope.save = function(form, expense) {
                if(form.$valid)
                {
                    expense.date = new Date();
                    // TODO Uncomment this when services are ready
//                    expensesRepositorySvc.createExpense(expense).then(function(){
//                        editSaveExpenseDialogSvc.openSaveExpenseDialog().then(function(){
//                            $location.path(url);
//                        });
//                    });

                    editSaveExpenseDialogSvc.openSuccessSaveExpenseDialog().then(function(url){
                        $location.path(url);
                    });
                }
                else
                {
                    $scope.showErrorMessage = true;
                }
            };
    }
]);