'use strict';

angular.module('Expenses')
    .factory('expenseSvc',
        ['currenciesSvc', 'contableCodesSvc', 'reportable',
            function(currenciesSvc, contableCodesSvc, reportable) {

    function Expense(initData){
        var self = this;

        self.expenseId = initData.expenseId || 0;
        self.submiter = initData.submiter || null;
        self.owner = initData.owner || null;
        self.description = initData.description || null;
        self.invoiceNumber = initData.invoiceNumber || 0;
        self.date = initData.date || null;
        self.originalCurrencyId = initData.originalCurrencyId || 0;
        self.originalAmount = parseFloat(initData.originalAmount) || 0;
        self.exchangeRate = initData.exchangeRate || 1;
        self.expenseTypeName = initData.type || null;
        self.imageType = initData.imageType || 'void';
        self.contableCodeId = initData.contableCodeId || 0;
        self.provider = initData.provider || null;
        self.type = initData.type || null;

        self.currency = null;
        self.contableCode = null;
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

        function setContableCode(){
            var contableCodes = contableCodesSvc.get();
            contableCodes.some(function(contableCode){
                if (contableCode.id === self.originalCurrencyId){
                    self.contableCode = contableCode;
                    return true;
                }
            });
            if (!self.contableCode){
                // TODO how we handle errors in the app
                // throw exception
            }
        }

        function initialize(){
            setCurrency();
            setContableCode();
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


