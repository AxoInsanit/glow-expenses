'use strict';

angular.module('Expenses')
    .factory('expenseSvc',
        ['currenciesSvc', 'contableCodesSvc', 'reportable',
            function(currenciesSvc, contableCodesSvc, reportable) {

    function Expense(initData){
        var self = this;

        self.expenseId = initData.expenseId || 0;
        self.contableCodeId = initData.contableCodeId || 0;
        self.description = initData.description || null;
        self.invoiceNumber = initData.invoiceNumber || 0;
        self.provider = initData.provider || '';
        self.date = initData.date || null;
        self.originalAmount = parseFloat(initData.originalAmount) || 0;
        self.exchangeRate = parseFloat(initData.exchangeRate) || 1;
        self.type = initData.type || reportable;

        self.submitter = initData.submitter || null;
        self.owner = initData.owner || null;
        self.originalCurrencyId = initData.originalCurrencyId || 0;
        self.originalAmount = parseFloat(initData.originalAmount) || 0;
        self.imageType = initData.imageType || 'void';
        self.currency = null;
        self.contableCode = null;
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
                if (contableCode.id === self.contableCodeId){
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

    Expense.prototype.getData = function () {
      return {
        expenseId: this.expenseId,
        description: this.description,
        invoiceNumber: this.invoiceNumber,
        provider: this.provider,
        date: this.date,
        originalAmount: this.originalAmount,
        exchangeRate: this.exchangeRate,
        type: this.type
      };
    };

    function create(initData){
        return new Expense(initData);
    }

    return {
        create: create
    };
}]);


