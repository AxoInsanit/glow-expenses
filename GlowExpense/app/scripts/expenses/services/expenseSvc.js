'use strict';

angular.module('Expenses')
    .factory('expenseSvc',
        ['currenciesSvc', 'reportable',
            function(currenciesSvc, reportable) {

    function Expense(initData){
        var self = this;

        self.expenseId = initData.expenseId;
        self.submiter = initData.submiter;
        self.owner = initData.owner;
        self.description = initData.description;
        self.invoiceNumber = initData.invoiceNumber;
        self.date = initData.date;
        self.originalCurrencyId = initData.originalCurrencyId;
        self.originalAmount = initData.originalAmount;
        self.exchangeRate = initData.exchangeRate;
        self.expenseTypeName = initData.type;
        self.imageType = initData.imageType;
        self.contableCodeId = initData.contableCodeId;
        self.provider = initData.provider;
        self.type = initData.type;

        self.currency = null;
        self.expenseType = reportable;
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

        function initialize(){
            setCurrency();
        }

        initialize();
    }

    function create(initData){
            return new Expense(initData);
        }

    return {
        create: create
    };
}]);


