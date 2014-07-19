'use strict';

angular.module('Expenses')
    .factory('expenseSvc',
        ['expensesRequestNotificationChannelSvc', 'currenciesSvc',
            function(expensesRequestNotificationChannelSvc, currenciesSvc) {

    function Expense(scope, initData){
        var self = this;

        self.expenseId = initData.expenseId;
        self.title = initData.title;
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

        self.currency = null;
        self.invoiceImage = '';
        self.showDetails = false;
        self.selected = false;
        self.enabled = true;

        function setCurrency(){
            var currencies = currenciesSvc.get();
            currencies.some(function(currency){
                if (currency.id === self.originalCurrencyId){
                    self.currency = currency;
                    return true;
                }
            });
            if (!self.currency){
                // TODO how we handle errors in the app
                // throw exception
            }
        }

        function detailsModeActivatedHandler(expenseId, isAnotherExpenseOpened) {
            if (self.expenseId !== expenseId){
                if (isAnotherExpenseOpened){
                    self.showDetails = false;
                    self.enabled = false;
                } else {
                    self.enabled = true;
                }
            }
        }

        function initialize(){
            setCurrency();

            expensesRequestNotificationChannelSvc.onSelectModeActivated(scope, function() {self.showDetails = false;});
            expensesRequestNotificationChannelSvc.onDetailsModeActivated(scope, detailsModeActivatedHandler);
        }

        initialize();
    }

    Expense.prototype.toggleDetails = function() {

        if (this.enabled) {
            this.selected = false;
            this.showDetails = !this.showDetails;
            expensesRequestNotificationChannelSvc.activateDetailsMode(this.expenseId, this.showDetails);
        }
    };

    Expense.prototype.toggleSelect = function() {
        if (this.enabled && !this.showDetails){
            this.selected = !this.selected;
        }
    };

    Expense.prototype.takeInvoiceImage = function() {
        // TODO get image with camera functionality; set invoiceImage
    };

    function getExpense(scope, initData){
            return new Expense(scope, initData);
        }

    return {
        getExpense: getExpense
    };
}]);


