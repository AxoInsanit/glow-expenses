'use strict';

angular.module('Expenses')
    .factory('expenseSvc',
        ['expensesRequestNotificationChannelSvc',
            function(expensesRequestNotificationChannelSvc) {

    function Expense(scope, initData){
        var self = this;

        self.expenseId =  initData.expenseId;
        self.submiter = initData.submiter;
        self.owner = initData.owner;
        self.description = initData.description;
        self.invoiceNumber = initData.invoiceNumber;
        self.date = initData.date;
        self.originalCurrencyId = initData.originalCurrencyId;
        self.originalAmount = initData.originalAmount;
        self.exchangeRate = initData.exchangeRate;
        self.imageType = initData.imageType;

        self.showDetails = false;
        self.selected = false;

        function initialize(){
            expensesRequestNotificationChannelSvc.onSelectModeActivated(scope, function() {self.showDetails = false;});
        }

        initialize();
    }

    Expense.prototype.toggleDetails = function() {
        this.showDetails = !this.showDetails;
    };

    Expense.prototype.toggleSelect = function() {
        this.selected = !this.selected;
    };

    function getExpense(scope, initData){
            return new Expense(scope, initData);
        }

    return {
        getExpense: getExpense
    };
}]);


