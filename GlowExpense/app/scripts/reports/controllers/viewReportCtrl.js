'use strict';

angular.module('Reports')
    .controller('ViewReportCtrl', function ($scope, $stateParams, transitionService, reportResource, ReportModel,
                                            errorDialogSvc, sendReportDialogSvc, localStorageSvc, $filter)  {

        var reportId = $stateParams.reportId;

        if ($scope.$parent) {
            $scope.$parent.title = 'Loading...';

            // override layout back path
            $scope.$parent.backStateName = 'home';
            $scope.$parent.backStateParams = {view: 'reports'};
        }


        $scope.editExpense = function(expense) {
            transitionService.go({
                name: 'editReportExpense',
                params: {
                    expenseId: expense.expenseId,
                    reportId: reportId
                },
                direction: 'forward'
            });
        };

        $scope.addExpensesToReport = function() {
            transitionService.go({
                name: 'addExpensesToReport',
                params: {
                    reportId: reportId
                },
                direction: 'forward'
            });
        };

        $scope.createExpense = function(){
            transitionService.go({
                name: 'addReportExpense',
                params: {
                    reportId: reportId
                },
                direction: 'forward'
            });
        };

        $scope.editReport = function(){
            transitionService.go({
                name: 'editReport',
                params: {
                    reportId: reportId
                },
                direction: 'forward'
            });
        };

        $scope.sendReport = function () {
            reportResource.sendReport(reportId).then(function () {
                sendReportDialogSvc.open($scope.report.description).then(function () {
                    transitionService.go({
                        name: 'home',
                        params: {
                            view: 'reports'
                        },
                        direction: 'backward'
                    });
                });
            }, function () {
                errorDialogSvc.open('Review your expenses!');
            });
        };

        $scope.getMoreExpenses = function(){

        };

        var getCurrencyCode = function(currencyId){
            var currencies = JSON.parse(localStorageSvc.getItem('currencies')),
                currency = _.findWhere(currencies,{'id':currencyId});
            return currency.code;
        };

        reportResource.getReport(reportId).then(function (report) {
            reportResource.getExpenses(reportId).then(function (expenses) {
                _.each(expenses, function(expense){
                    //for performance improvement this data should be computed here
                    expense.currencyCode = getCurrencyCode(expense.originalCurrencyId);
                    expense.currencySocCode = getCurrencyCode(expense.societyCurrencyId);
                    expense.dateFilter = $filter('date')(expense.date, 'dd MMMM yyyy');
                    expense.originalAmountFormatted = $filter('currency')(expense.originalAmount);
                });
                $scope.expenses = expenses;
            });
            $scope.$parent.title = report.description;
            $scope.report = new ReportModel(report);
        });
    }
);
