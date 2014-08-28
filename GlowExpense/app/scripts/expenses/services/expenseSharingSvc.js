'use strict';

angular.module('Expenses').factory('expenseSharingSvc', ['$q', 'expensesRepositorySvc', 'errorHandlerDefaultSvc',
    'localStorageSvc', 'sessionToken', 'expenseSvc',

    function($q, expensesRepositorySvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc) {

        var expenseForEdit = null;

        var reportExpensesMapper =
        {
            0: []
        };

        var expenseIdsReadyToBeAssigned = [];

        // lazy load expenses on demand
        function getExpenses(reportId){
            var reportKey = reportId || 0;
            reportExpensesMapper[reportKey] = reportExpensesMapper[reportKey] || [];

            function getExpensesSuccess(response){
                response.expenses.forEach(function(item){
                    item.title = item.description;
                    var expense = expenseSvc.create(item);
                    reportExpensesMapper[reportKey].push(expense);
                });
                deferred.resolve(reportExpensesMapper[reportKey]);
            }

            var deferred = $q.defer();

            if (reportExpensesMapper[reportKey].length === 0){
                var paramsObj = reportKey > 0 ?
                { 'token': localStorageSvc.getItem(sessionToken), 'expenseReportId': reportId } :
                { 'token': localStorageSvc.getItem(sessionToken) };

                expensesRepositorySvc.getExpenses(
                    paramsObj,
                    getExpensesSuccess,
                    errorHandlerDefaultSvc.handleError
                );
            }
            else {
                deferred.resolve(reportExpensesMapper[reportKey]);
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
            reportExpensesMapper[0].forEach(function(expense){
                if (expense.imageType !== 'void'){
                    expenseIdsReadyToBeAssigned.push(expense.expenseId);
                }
            });

            return expenseIdsReadyToBeAssigned;
        }

        function getExpenseById(expenseId, reportId){
            var reportKey = reportId || 0;
            var result = null;
            reportExpensesMapper[reportKey].some(function(item){
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

        function updateExpense(expense, reportId){
            var reportKey = reportId || 0;
            reportExpensesMapper[reportKey].some(function(item){
                if(item.expenseId === expense.expenseId){
                    item = expense;
                    return true;
                }
            });
        }

        function deleteExpense(expenseId, reportId){
            debugger;
            var reportKey = reportId || 0;
            var expenseToDeleteIndex = null;
            reportExpensesMapper[reportKey].some(function(item, index){
                if (item.expenseId === expenseId){
                    debugger;
                    expenseToDeleteIndex = index;
                    return true;
                }
            });

            if (expenseToDeleteIndex !== null){
                reportExpensesMapper[reportKey].splice(expenseToDeleteIndex, 1);
            }
        }

        function addExpense(expense, reportId){
            var reportKey = reportId || 0;
            reportExpensesMapper[reportKey] = reportExpensesMapper[reportKey] || [];
            reportExpensesMapper[reportKey].push(expense);
        }

        function addReport(reportId){
            reportExpensesMapper[reportId] = [];

            reportExpensesMapper[0].map(function(item, index){
                if (item.imageType !== 'void'){
                    reportExpensesMapper[0].splice(index, 1);
                    return true;
                }
            });
        }

        return {
            getExpenseForEdit: getExpenseForEdit,
            setExpenseForEdit: setExpenseForEdit,
            getExpenseIdsForReportAssign: getExpenseIdsForReportAssign,
            getExpenses: getExpenses,
            getExpenseById: getExpenseById,
            updateExpense: updateExpense,
            deleteExpense: deleteExpense,
            addExpense: addExpense,
            addReport: addReport
        };
    }
]);
