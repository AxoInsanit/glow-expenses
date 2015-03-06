'use strict';

angular.module('Expenses')
    .factory('ExpenseModel', function(reportable, expenseResource, localStorageSvc, contableCodeStorageKey, userResource,
                                      currencyStorageKey, expensesUrl, baseUrlMockeyWeb, imagesUrl, reportResource,
                                      $filter) {

        function parseCurrency(currency) {
            return Number(currency.replace(/[^0-9\.]+/g,''));
        }

        function Expense(initData){
            var self = this;

            initData = initData || {};

            self.expenseId = initData.expenseId || 0;
            self.contableCodeId = initData.contableCodeId || 0;
            self.description = initData.description || null;
            self.invoiceNumber = initData.invoiceNumber || 0;
            self.provider = initData.provider || '';
            self.date = initData.date || Date.now();
            self.originalAmount = initData.originalAmount ? $filter('currency')(initData.originalAmount, '') : '';
            self.exchangeRate = initData.exchangeRate ? $filter('currency')(initData.exchangeRate, '') : '1.00';
            self.type = initData.type || reportable;
            self.submitter = initData.submitter || null;
            self.owner = initData.owner || null;
            self.originalCurrencyId = initData.originalCurrencyId || 0;
            self.imageType = initData.imageType || 'void';
            self.amex = initData.amex || false;
            self.originalExpenseReportId = initData.originalExpenseReportId;
            self.currency = null;
            self.contableCode = null;
            self.showDetails = false;
            self.selected = false;
            self.enabled = true;


            if (self.imageType !== 'void' && self.expenseId) {
                self.imagePath = baseUrlMockeyWeb + expensesUrl + imagesUrl + '?token=' + userResource.getToken() + '&expenseId=' + self.expenseId;
            }
            function setCurrency(){
                var storedCurrencies = localStorageSvc.getItem(currencyStorageKey);
                if (storedCurrencies) {
                    var currencies = JSON.parse(storedCurrencies);
                    currencies.some(function(currency){
                        if (currency.id === self.originalCurrencyId){
                            self.currency = currency;
                            return true;
                        }
                    });
                }
            }

            function setContableCode(){
                var storedCcontableCodes = localStorageSvc.getItem(contableCodeStorageKey);
                if (storedCcontableCodes) {
                    var contableCodes = JSON.parse(storedCcontableCodes);
                    contableCodes.some(function(contableCode){
                        if (contableCode.id === self.contableCodeId){
                            self.contableCode = contableCode;
                            return true;
                        }
                    });
                }
            }

            function initialize(){
                setCurrency();
                setContableCode();
            }

            initialize();
        }

        Expense.prototype.save = function () {
            var expensePromise,
                expense = this,
                isNew = false;
            if (this.expenseId) {
                expensePromise = expenseResource.updateExpense(expense.getData());
            } else{
                isNew = true;
                expensePromise = expenseResource.createExpense(expense.getData());
            }

            return expensePromise.then(function (expenseId) {
                var promiseResult;
                if (isNew && expense.expenseReportId) {
                    // add expense to report
                    var amount = expense.originalAmount * expense.exchangeRate;
                    promiseResult = reportResource.addExpense(expense.expenseReportId, expenseId, amount).then(function () {
                        return {
                            reportId: expense.expenseReportId,
                            expenseId: expenseId
                        };
                    });
                } else if (!isNew && expense.expenseReportId !== expense.originalExpenseReportId) {
                    // remove from original expense and add to new one
                    promiseResult = reportResource.removeExpense(expense.originalExpenseReportId, expenseId).then(function () {
                        return reportResource.addExpense(expense.expenseReportId, expenseId).then(function () {
                            return {
                                reportId: expense.originalExpenseReportId,
                                expenseId: expenseId
                            };
                        });
                    });
                } else {

                    promiseResult = {
                        expenseId: expenseId
                    };
                    if (expense.expenseReportId) {
                        // this should be a temporary fix until the API is able to return a specific report by it's id
                        reportResource.cleanCache(expense.expenseReportId);
                        promiseResult.reportId = expense.expenseReportId;
                    }
                }
                return promiseResult;
            });
        };

        Expense.prototype.remove = function () {
            return expenseResource.deleteExpense(this.expenseId);
        };

        Expense.prototype.getData = function () {
            return {
                expenseId: this.expenseId,
                contableCodeId: this.contableCode ? this.contableCode.id : null,
                originalCurrencyId: this.currency ? this.currency.id : null,
                description: this.description,
                invoiceNumber: this.invoiceNumber,
                provider: this.provider,
                date: this.date,
                originalAmount: parseCurrency(this.originalAmount),
                exchangeRate: parseCurrency(this.exchangeRate),
                type: this.type,
                owner: this.owner,
                amex: this.amex
            };
        };

        return Expense;
    });


