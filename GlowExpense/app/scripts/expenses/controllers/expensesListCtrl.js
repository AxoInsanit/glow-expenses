'use strict';

angular.module('Expenses')
    .controller('ExpensesListCtrl', function ($scope, transitionService, confirmDeleteDialogSvc, expenseResource, reportResource, $stateParams)  {

        $scope.reportId = $stateParams.reportId;
        var expensesSelected = {};

        if ($scope.$parent && $scope.reportId) {
            $scope.editMode = true;
            reportResource.getReport($scope.reportId).then( function(report){
                $scope.$parent.title = 'Add Expenses to ' + report.description;
            });
        }

        $scope.unselected = function (){
           return _.isEmpty(expensesSelected);
        };

        $scope.addExpenses = function(event) {
            event.stopPropagation();
            event.preventDefault();

            var expenseIds = [];
            _.each(expensesSelected, function(item){
                expenseIds.push(item);
            });
            // add expenses to report
            var promiseResult = reportResource.addExpense($scope.reportId, expenseIds).then(function () {
                transitionService.go({
                    name: 'viewReport',
                    params: {
                        reportId: $scope.reportId
                    },
                    replace: true
                });
            });
        };

        $scope.itemChecked = function (value, index, expenseId) {
            return (value) ? expensesSelected[index] = expenseId : delete expensesSelected[index];
        };

        $scope.deleteExpenses = function (event) {
            event.stopPropagation();
            event.preventDefault();

            var expenseIds = [];
            _.each(expensesSelected, function(item){
                expenseIds.push(item);
            });

            confirmDeleteDialogSvc.open('expenses').then(function(){
                _.each(expenseIds, function(expenseId){
                //temporary solution until api new release allows deleting multiple expenses at once
                    var promise;
                    if ($stateParams.reportId) {
                        promise = reportResource.removeExpense($stateParams.reportId, expenseId);
                    } else {
                        promise = expenseResource.removeExpense(expenseId);
                    }
                    promise.catch(function () {
                        return errorDialogSvc.open('Couldn\'t remove expense');
                    }).finally(function () {
                        $stateParams.view = 'expense';
                        transitionService.reload();
                    });
                });
            });
        };

        $scope.takePhoto = function(expense) {
            transitionService.go({
                name: 'editExpenseImageModal',
                params: {
                    expenseId: expense.expenseId
                },
                direction: 'forward'
            });
        };

        $scope.createExpense = function() {
            transitionService.go({
                name: 'addReportExpense',
                direction: 'forward'
            });
        };

        $scope.editExpense = function(expense) {
            transitionService.go({
                name: 'editExpense',
                params: {
                    expenseId: expense.expenseId
                },
                direction: 'forward'
            });
        };

        expenseResource.getExpenses().then(function (expenses) {
            $scope.expenses = expenses;
        });
    }
);
