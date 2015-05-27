'use strict';

angular.module('Expenses')
    .controller('ExpenseFormCtrl', function ($scope, $rootScope, $state, $stateParams, expenseResource, reportResource, currencyResource,
                                             cameraSelectDialog, cameraSvc, currencySelectDialogSvc, $filter, $timeout,
                                             contableCodeSelectDialogSvc, ExpenseModel, itemsSelectionDialogSvc, localStorageSvc,
                                             filterReportByStateSvc, transitionService, contableCodeResource, errorDialogSvc) {

        var expenseId = $stateParams.expenseId,
            reportId = $stateParams.reportId,
            localImagePath = localStorageSvc.getItem('localImagePath'),
            expenseObject = JSON.parse(localStorageSvc.getItem('expenseObject')),
            reportObject = JSON.parse(localStorageSvc.getItem('reportObject')),
            dateObject = localStorageSvc.getItem('dateObject'),
            setExpense;

        $scope.$on('$destroy', function () {
            var expenseObject,
                reportObject,
                dateFormat;
            if ($state.current.name !== 'viewExpenseImage' && $state.current.name !== 'viewExpenseLocalImage') {
                localStorageSvc.removeItem('localImagePath');
                localStorageSvc.removeItem('expenseObject');
                localStorageSvc.removeItem('reportObject');
                localStorageSvc.removeItem('dateObject');
            } else {
                if ($scope.expense.date) {
                    dateFormat = $scope.expense.date;
                    localStorageSvc.setItem('dateObject', dateFormat);
                    $scope.expense.date = null;
                }
                expenseObject = JSON.stringify($scope.expense);
                reportObject = JSON.stringify($scope.report);
                localStorageSvc.setItem('expenseObject', expenseObject);
                localStorageSvc.setItem('reportObject', reportObject);
            }
        });

        $scope.removeWhiteSpaces = function () {
            if ($scope.expense && $scope.expense.description) {
                //remove consecutive spaces
                $scope.expense.description = $scope.expense.description.replace(/\s+/g, ' ');

                //remove whitespace from start of string
                if ($scope.expense.description.charAt(0) === ' ') {
                  $scope.expense.description = $scope.expense.description.slice(1);
                }
            }
        };

        function parseCurrency(currency) {
            return currency && Number(currency.replace(/[^0-9\.]+/g,''));
        }

        $scope.report = reportObject ? reportObject : {};
        $scope.buttonLabel = expenseId ? 'Save' : 'Create';
        $scope.showErrorMessage = false;
        $scope.expenseId = $stateParams.expenseId;
        $scope.reportId = reportId;
        $scope.minDate = '2001-01-01';
        $scope.maxDate = new Date().toISOString().substring(0, 10);

        if ($scope.$parent) {
            $scope.$parent.title = expenseId ? 'Edit expense': 'Create expense';

            if(!reportId) {
                // override layout back path
                $scope.$parent.backStateName = 'home';
                $scope.$parent.backStateParams = {view: 'expenses'};
            }
        }

        $scope.save = function () {
            // associate to report
            if ($scope.report.expenseReportId) {
                $scope.expense.expenseReportId = $scope.report.expenseReportId;
            }
            // save the expense
            $scope.expense.save().then(function (expenseSaveResults) {
                // upload the image to the expense
                expenseResource.uploadImage($scope.expense.localImagePath, expenseSaveResults.expenseId).then(function () {
                    // if there was any associated report involved in the transaction then go to it
                    localStorageSvc.removeItem('localImagePath');
                    $rootScope.$broadcast('global::updateExpenses');
                    if (expenseSaveResults.reportId) {
                        transitionService.go({
                            name: 'viewReport',
                            params: {
                                reportId: expenseSaveResults.reportId
                            },
                            replace: true
                        });
                        // if no report associated then go to the home
                    } else {
                        transitionService.go({
                            name: 'home',
                            params: {
                                views: 'expenses'
                            },
                            replace: true
                        });
                    }
                }, function () {
                    transitionService.go({
                        name: 'home',
                        params: {
                            views: 'expenses'
                        },
                        replace: true
                    });
                    errorDialogSvc.open('Expense created but image upload failed!');
                });

            }, function () {
                errorDialogSvc.open('Review your fields!');
            });
        };

        $scope.selectReport = function(){
            reportResource.getReports().then(function(reports){
                $scope.reports = reports.filter(filterReportByStateSvc.checkIfInState);
                itemsSelectionDialogSvc.open($scope.reports, 'report', 'description').then(function(selectedReport){
                    if (selectedReport){
                        $scope.report =  selectedReport;
                    }
                });
            });
        };

        $scope.takePhoto = function() {
            cameraSelectDialog.open().then(function() {
                cameraSvc.takePhoto().then(function(result){
                    $timeout(function () {
                        $scope.expense.localImagePath = result;
                        localStorageSvc.setItem('localImagePath', result);
                    }, 0);
                });
            });
        };

        // fetch currencies and popup modal
        $scope.selectCurrency = function( currency ) {
            if (!$scope.expense.amex) {
                currencyResource.getCurrencies().then(function (currencies) {
                    currencySelectDialogSvc.open(currency, currencies).then(function(selectedCurrency){
                        $scope.expense.currency = selectedCurrency;
                    });
                });
            }
        };

        // fetch contable codes and popup modal
        $scope.selectContableCode = function( contableCode ) {
            if (!$scope.expense.amex) {
                contableCodeResource.getContableCodes().then(function (contableCodes) {
                    contableCodeSelectDialogSvc.open(contableCode, contableCodes).then(function(selectedContableCode){
                        $scope.expense.contableCode = selectedContableCode;
                    });
                });
            }
        };

        $scope.formatCurrency = function (valueKey) {
            var value = $filter('currency')(parseCurrency($scope.expense[valueKey]), '', 2);
            if (value && value.indexOf('NaN') !== -1) {
                value = $filter('currency')(parseCurrency($scope.expense[valueKey].slice(0,$scope.expense[valueKey].length - 3)), '', 2);
            }
            $scope.expense[valueKey] = value;
        };

        $scope.viewImage = function (expense) {
            if (expense.imagePath) {
                transitionService.go({
                    name: 'viewExpenseImage',
                    params: {
                        expenseId: expense.expenseId,
                        reportId: $scope.reportId
                    },
                    direction: 'forward'
                });
            } else {
                // View local image
                $scope.viewLocalImage();
            }
        };

        $scope.viewLocalImage = function (expense) {
            transitionService.go({
                name: 'viewExpenseLocalImage',
                params: {
                    expenseId: expense.expenseId,
                    reportId: $scope.reportId,
                    localImagePath: $scope.expense.localImagePath
                },
                direction: 'forward'
            });
        };

        setExpense = function(expense) {
            $scope.expense.amex = expense.amex;
            $scope.expense.contableCode = expense.contableCode;
            $scope.expense.contableCodeId = expense.contableCodeId;
            $scope.expense.date = dateObject ? new Date(dateObject) : null;
            $scope.expense.currency = expense.currency;
            $scope.expense.description = expense.description;
            $scope.expense.exchangeRate = expense.exchangeRate;
            $scope.expense.localImagePath = expense.localImagePath;
            $scope.expense.imageType = expense.imageType;
            $scope.expense.originalAmount = expense.originalAmount;
            $scope.expense.originalCurrencyId = expense.originalCurrencyId;
        };

        // this should be done with transitionend on the sliding ng-view
        if ($stateParams.imageModal) {
            $scope.takePhoto();
        }

        // if it is within a report then fetch through report resource manager
        if (reportId) {
            reportResource.getReport(reportId).then(function (report) {
                $scope.report = report;
            });
            if (expenseId) {
                reportResource.getExpense(expenseId, reportId).then(function (expense) {
                    expense.originalExpenseReportId = parseInt(reportId, 10);
                    $scope.expense = new ExpenseModel(expense);
                    if (expenseObject) {
                        setExpense(expenseObject);
                    }
                    $scope.expense.localImagePath = localImagePath ? localImagePath : $scope.expense.localImagePath;
                });
            } else {
                $scope.expense = new ExpenseModel();
                if (expenseObject) {
                    setExpense(expenseObject);
                }
                $scope.expense.localImagePath = localImagePath ? localImagePath : $scope.expense.localImagePath;
            }
            // if not attached to any report then fetch through expense resource manager
        } else if (expenseId) {
            expenseResource.getExpense(expenseId).then(function (expense) {
                $scope.expense = new ExpenseModel(expense);
                if (expenseObject) {
                    setExpense(expenseObject);
                }
                $scope.expense.localImagePath = localImagePath ? localImagePath : $scope.expense.localImagePath;
            });
            // if none of the above matches (reportId nor expenseId exist) then create new expense
        } else {
            $scope.expense = new ExpenseModel();
            if (expenseObject) {
                setExpense(expenseObject);
            }
            $scope.expense.localImagePath = localImagePath ? localImagePath : $scope.expense.localImagePath;
        }
    }
);
