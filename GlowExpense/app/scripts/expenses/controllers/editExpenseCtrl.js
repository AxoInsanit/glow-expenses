'use strict';

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', 'editExpensesTitle', 'editExpensesButtonLabel', 'editExpenseSvc', 'cameraSvc', 'reportsRepositorySvc',
        function ($scope, editExpensesTitle, editExpensesButtonLabel, editExpenseSvc, cameraSvc, reportsRepositorySvc) {
            $scope.title = editExpensesTitle;
            $scope.buttonLabel = editExpensesButtonLabel;

            $scope.expense = editExpenseSvc.getExpenseForEdit();
            //debugger;
            $scope.report = null;
            $scope.reportCollection = null;

            $scope.haveReport = (editExpenseSvc.getReport() != undefined);
            
            function onSuccess(reports) {
                $scope.reportCollection = reports;
                //debugger;                
            };

            function onFail(message) {
                alert('Failed because: ' + message);
            };

            $scope.createReport = function() {
                $location.path('/create-report');
            };

            //debugger;
            $scope.date = $scope.expense.date;
            $scope.isEdit = true;
            $scope.imageSelectedPath = "";
            
            // if ($scope.expense.imageType !== 'void'){
            //     $scope.imageSelectedPath = './scripts/expenses/views/img.jpg';
            // }

            //set the report to undefined after we show the view so if we go 
            //back to expenses list and click on expense we wont see old report 
            //and we can see the full list.

            //and we check are we looking in expense that is in report or we look at 
            //free one in the list
            if($scope.haveReport)
            {
                $scope.report = editExpenseSvc.getReport();
                editExpenseSvc.setReport(undefined);
            }
            else
            {
                reportsRepositorySvc.getReports(onSuccess,onFail);
            }


            $scope.takePhoto = function() {
                cameraSvc.takePhoto().then(function(result){
                    $scope.imageSelectedPath = result;
                });
            };
        }
]);