'use strict';

angular.module('Layouts').controller('HomeCtrl', function ($scope, $state, $timeout, signOutDialogSvc, transitionService, reportResource, expenseResource, localStorageSvc, $filter) {

    var views = ['expenses', 'reports'],
        stateParams = $state.$current.locals.globals.$stateParams;

    var viewTransition = function (view){
        transitionService.go({
                name: 'home',
                params: {
                    view: view
                }
        });
    };

    $scope.setActiveview = function(view) {
        $scope.$apply(function(){
            $scope.activeView = view;
        });
    };

    $scope.viewChanged = function (activeView) {
        $timeout(function () {
            $scope.activeView = activeView;
            if (activeView === 0){
                viewTransition('expenses');
            }
            else {
                if (activeView === 1) {
                    viewTransition('reports');
                }
            }
            if ($scope.editMode) {
                $scope.toggleEditMode();
            }
        }, 0);
    };

    $scope.goToView = function (view) {
        $scope.activeView = views.indexOf(view);
        $scope.$broadcast('swipeAndSnap::changeView', $scope.activeView);
        if ($scope.editMode) {
            $scope.toggleEditMode();
        }
        //viewTransition(view);
    };

    $scope.signOut = function () {
        signOutDialogSvc.open();
    };

    $scope.toggleEditMode = function () {
        $scope.editMode = !$scope.editMode;
    };

    var getCurrencyCode = function(currencyId){
        var currencies = JSON.parse(localStorageSvc.getItem('currencies')),
            currency = _.findWhere(currencies,{'id':currencyId});
        return currency.code;
    };

    if ($scope.activeView) {
        $scope.$broadcast('swipeAndSnap::changeView', $scope.activeView);
    }

    if (stateParams.view === 'expenses') {
        $scope.goToView('expenses');
    } else if (stateParams.view === 'reports') {
        $scope.goToView('reports');
    } else {
        $scope.activeView = 0;
    }

    reportResource.getReports().then(function (reports) {
        $scope.reports = reports;
    });

    expenseResource.getExpenses().then(function (expenses) {
        _.each(expenses, function(expense){
            expense.currencyCode = getCurrencyCode(expense.originalCurrencyId);
            expense.currencySocCode = getCurrencyCode(expense.societyCurrencyId);
            expense.dateFilter = $filter('date')(expense.date, 'dd MMMM yyyy');
            expense.originalAmountFormatted = $filter('currency')(expense.originalAmount);
        });
        $scope.expenses = expenses;
    });

});
