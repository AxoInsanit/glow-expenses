'use strict';

angular.module('Expenses').factory('expenseSharingSvc', ['$q', 'reportsSharingSvc','expensesRepositorySvc', 'reportExpensesRepositorySvc', 'errorHandlerDefaultSvc',
    'localStorageSvc', 'sessionToken', 'expenseSvc', 'infiniteScrollEnabled',

    function($q, reportsSharingSvc, expensesRepositorySvc, reportExpensesRepositorySvc, errorHandlerDefaultSvc, localStorageSvc, sessionToken, expenseSvc, infiniteScrollEnabled) {

        var expensesShownPerPage = 5;

        var selectedExpenseIndex = 0;

        var reportExpensesMapper =
        {
            0: []
        };

        var reportLastShownExpenseMapper =
        {
            0: 0
        };

        var expenseIdsReadyToBeAssigned = [];

        function getNextFiveExpenses(reportId){

            var reportKey = reportId || 0;
            reportLastShownExpenseMapper[reportKey] = reportLastShownExpenseMapper[reportKey] || 0;

            var index = reportLastShownExpenseMapper[reportKey];

            var result = [];

            var condition = index + expensesShownPerPage;
            if (reportExpensesMapper[reportKey].length < condition){
                var expensesLength = reportExpensesMapper[reportKey].length; // - index

                var reportExpensesCopy = angular.copy(reportExpensesMapper[reportKey]);

                result = reportExpensesCopy.splice(index, expensesLength);
                reportLastShownExpenseMapper[reportKey] += (expensesLength - index);
            }
            else {
                for (var i = index; i < condition; i++){
                    result.push(reportExpensesMapper[reportKey][i]);
                    reportLastShownExpenseMapper[reportKey] = condition;
                }
            }
            return result;
        }

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

                if (infiniteScrollEnabled){
                    var result = getNextFiveExpenses(reportId);
                    deferred.resolve(result);
                }
                else {
                    deferred.resolve(reportExpensesMapper[reportKey]);
                }
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
               // var reportExpensesMapperCopy = angular.copy(reportExpensesMapper[reportKey]);
                if (infiniteScrollEnabled){
                    var reportExpensesMapperCopy = angular.copy(reportExpensesMapper[reportKey]);
                    var result = null;
                    if (reportLastShownExpenseMapper[reportKey] && reportLastShownExpenseMapper[reportKey] !== 0){
                        result = reportExpensesMapperCopy.splice(0, reportLastShownExpenseMapper[reportKey]);
                        deferred.resolve(result);
                    }
                    else {
                        result = reportExpensesMapperCopy;
                        deferred.resolve(result);
                    }
                }
                else {
                    deferred.resolve(reportExpensesMapper[reportKey]);
                }
            }

            return deferred.promise;
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

        function existExpenseInReport(expenseId, reportId) {
            var reportKey = reportId || 0;
            var result = {
                index: -1
            };
            reportExpensesMapper[reportKey].some(function(item, index){
                if(item.expenseId === expenseId){
                    result.index = index;
                    result.item = item;
                    return true;
                }
            });
            return result;
        }

        function updateExpense(expense, reportId){
            var reportKey = reportId || 0;
            
            reportExpensesMapper[reportKey].some(function(item){
                if(item.expenseId === expense.expenseId){
                    item.currency = expense.currency;
                    item.date = expense.date;
                    item.description = expense.description;
                    item.exchangeRate = expense.exchangeRate;
                    item.expenseId = expense.expenseId;
                    item.originalAmount = expense.originalAmount;
                    item.expense = expense.expense;
                    item.contableCode = expense.contableCode;

                    return true;
                }
            });
        }

        function deleteExpense(expenseId, reportId) {
            function deleteExpenseInReportSuccess() {
                var amount = parseFloat(currentExpense.item.originalAmount) * parseFloat(currentExpense.item.exchangeRate) * -1;
                reportsSharingSvc.updateReportTotal(reportKey, amount);
                expensesRepositorySvc.deleteExpense(paramsObj, deleteExpenseSuccess, deleteExpenseError);
            }

            function deleteExpenseSuccess() {
                reportExpensesMapper[reportKey].splice(currentExpense.index, 1);
            }

            function deleteExpenseError(errorResponse) {
                errorHandlerDefaultSvc.handleError(errorResponse);
            }

            var reportKey = reportId || 0;
            var paramsObj = {
                'token': localStorageSvc.getItem(sessionToken),
                'expenseId': expenseId
            };
            var currentExpense = existExpenseInReport(expenseId, reportKey);
            if (currentExpense.index >= 0) {
                if (reportKey !== 0) {
                    reportExpensesRepositorySvc.deleteExpense(paramsObj, deleteExpenseInReportSuccess, deleteExpenseError);
                }
                else {
                    expensesRepositorySvc.deleteExpense(paramsObj, deleteExpenseSuccess, deleteExpenseError);
                }
            }
            else {
                //TODO handle errors.
                throw new Error('Expense not found');
            }
        }

        function addExpense(expense, reportId){
            var reportKey = reportId || 0;
            reportExpensesMapper[reportKey] = reportExpensesMapper[reportKey] || [];
            reportExpensesMapper[reportKey].push(expense);

            if (reportKey > 0) {
                var amount = parseFloat(expense.originalAmount) * parseFloat(expense.exchangeRate);
                reportsSharingSvc.updateReportTotal(reportKey, amount);
            }
        }

        function addReport(){

            reportExpensesMapper[0].map(function(item, index){
                if (item.imageType !== 'void'){
                    reportExpensesMapper[0].splice(index, 1);
                    return true;
                }
            });
        }

        function deleteReportMapping(reportId){

            var reportExpenses = [];
            if (reportExpensesMapper[reportId]){
                reportExpenses = reportExpensesMapper[reportId];
            }
            else {
                getAllExpensesForReport(reportId).then(function(result){
                    reportExpenses = result;
                });
            }

            reportExpenses.forEach(function(item){
                reportExpensesMapper[0].push(item);
            });
            // way faster then delete reportExpensesMapper[reportId]
            reportExpensesMapper[reportId] = undefined;
        }

        function getAllExpensesForReport(reportId){

            var deferred = $q.defer();

            function expensesSuccess(response){
                reportExpensesMapper[reportId] = [];
                response.expenses.forEach(function(item){
                    item.title = item.description;
                    var expense = expenseSvc.create(item);
                    reportExpensesMapper[reportId].push(expense);
                });

                deferred.resolve(reportExpensesMapper[reportId]);
            }

            function error(){
            }

            expensesRepositorySvc.getExpenses(
                { 'token': localStorageSvc.getItem(sessionToken), 'expenseReportId': reportId },
                expensesSuccess,
                error
            );

            return deferred.promise;
        }

        return {
            getExpenseIdsForReportAssign: getExpenseIdsForReportAssign,
            getExpenses: getExpenses,
            getExpenseById: getExpenseById,
            updateExpense: updateExpense,
            deleteExpense: deleteExpense,
            addExpense: addExpense,
            addReport: addReport,
            getNextFiveExpenses: getNextFiveExpenses,
            selectedExpense: selectedExpenseIndex,
            deleteReportMapping: deleteReportMapping,
            getAllExpensesForReport: getAllExpensesForReport,
        };
    }
]);
