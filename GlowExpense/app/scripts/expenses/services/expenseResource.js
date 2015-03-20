'use strict';

angular.module('Expenses')
    .factory('expenseResource', function ($http, userResource, expensesUrl, baseUrlMockeyWeb, imagesUrl,
                                          fileTransferSvc, $q, $rootScope) {

        var cachedExpenses = false,
            unregisterExp;

        $rootScope.$on('global::signOut', function () {
            cachedExpenses = false;
        });

        unregisterExp = $rootScope.$on('global::updateExpenses', function () {
            cachedExpenses = false;
        });

        $rootScope.$on('$destroy', function() {
            unregisterExp();
        });

        return {
            getExpense: function (expenseId) {
                var foundExpense = false;
                return this.getExpenses().then(function (expenses) {
                    expenses.some(function (expense) {
                        if (expense.expenseId === parseInt(expenseId, 10)) {
                            foundExpense = expense;
                            return false;
                        }
                    });
                    return foundExpense;
                });
            },
            getExpenses: function () {
                var promise;
                if (cachedExpenses) {
                    promise = $q.when(angular.copy(cachedExpenses));
                } else {
                    promise = $http.get(baseUrlMockeyWeb + expensesUrl, {params: {token: userResource.getToken()}}).then(function (response) {
                        cachedExpenses = response.data.expenses;
                        return angular.copy(cachedExpenses);
                    });
                }
                return promise;

            },
            createExpense: function (expenseData) {
                return $http({
                    method: 'POST',
                    url: baseUrlMockeyWeb + expensesUrl,
                    data: expenseData,
                    params: {
                        token: userResource.getToken()
                    }
                }).then(function(response) {
                    var createdExpenseId = false,
                        createdExpenseLocation = response.headers('location');

                    if (createdExpenseLocation) {
                        createdExpenseId = createdExpenseLocation.substring(createdExpenseLocation.lastIndexOf('/') + 1);
                        cachedExpenses = false;
                    }

                    return createdExpenseId;
                });
            },
            updateExpense: function (expenseData) {
                return $http({
                    method: 'PUT',
                    url: baseUrlMockeyWeb + expensesUrl,
                    data: expenseData,
                    params: {
                        token: userResource.getToken()
                    }
                }).then(function () {
                    cachedExpenses = false;
                    return expenseData.expenseId;
                });
            },
            removeExpense: function (expenseId) {
                return $http({
                    method: 'DELETE',
                    url: baseUrlMockeyWeb + expensesUrl,
                    params: {
                        token: userResource.getToken(),
                        expenseId: expenseId
                    }
                }).then(function () {
                    cachedExpenses = false;
                });
            },
            uploadImage: function (file, expenseId) {
                var url = baseUrlMockeyWeb + expensesUrl + imagesUrl + '?expenseId=' + expenseId + '&token=' + userResource.getToken();
                return fileTransferSvc.upload(url, file);
            }
        };
    });
