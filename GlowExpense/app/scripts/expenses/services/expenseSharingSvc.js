'use strict';

angular.module('Expenses').factory('expenseSharingSvc', ['$q', 'expensesRepositorySvc', 'errorHandlerDefaultSvc',
    'localStorageSvc', 'sessionToken', 'expenseSvc',

    function($q, expensesRepositorySvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc) {

        var expenseForEdit = null;

        var allExpenses = [];
        var expenseIdsReadyToBeAssigned = [];

        // lazy load expenses on demand
        function getExpenses(reportId){

            function getExpensesSuccess(response){

                response.expenses.forEach(function(item){
                    item.title = item.description;
                    var expense = expenseSvc.create(item);
                    allExpenses.push(expense);
                });
                deferred.resolve(allExpenses);
            }

            var deferred = $q.defer();

            if (allExpenses.length === 0){

                var paramsObj = reportId ?
                { 'token': localStorageSvc.getItem(sessionToken), 'expenseReportId': reportId } :
                { 'token': localStorageSvc.getItem(sessionToken) };

                expensesRepositorySvc.getExpenses(
                    paramsObj,
                    getExpensesSuccess,
                    errorHandlerDefaultSvc.handleError
                );
            }
            else {
                deferred.resolve(allExpenses);
            }

            return deferred.promise;
        }

        function getExpenseForEdit() {
            return expenseForEdit;
        }

        function setExpenseForEdit(expense) {
            expenseForEdit = expense;
        }

        function getExpenseIdsForReportAssign(){
            allExpenses.forEach(function(expense){
                if (expense.imageType !== 'void'){
                    expenseIdsReadyToBeAssigned.push(expense.expenseId);
                }
            });

            return expenseIdsReadyToBeAssigned;
        }

        function getExpenseById(expenseId){

            var result = null;
            allExpenses.some(function(item){
                if(item.expenseId === expenseId){
                    result = item;
                    return true;
                }
            });

            // TODO handler errors
            if (!result){
                throw new Error('Expense not found');
            }

            return result;
        }

        function updateExpense(expense){
            allExpenses.some(function(item){
                if(item.expenseId === expense.expenseId){
                    item = expense;
                    return true;
                }
            });
        }

        function deleteExpense(expenseId){
            var expenseToDeleteIndex = null;
            allExpenses.some(function(item, index){
                if (item.expenseId === expenseId){
                    expenseToDeleteIndex = index;
                    return true;
                }
            });
            if (expenseToDeleteIndex){
                allExpenses.splice(expenseToDeleteIndex, 1);
            }
        }

        return {
            getExpenseForEdit: getExpenseForEdit,
            setExpenseForEdit: setExpenseForEdit,
            getExpenseIdsForReportAssign: getExpenseIdsForReportAssign,
            getExpenses: getExpenses,
            getExpenseById: getExpenseById,
            updateExpense: updateExpense,
            deleteExpense: deleteExpense
        };
    }
]);
