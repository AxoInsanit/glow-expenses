'use strict';

angular.module('Reports')
    .factory('reportResource', function ($http, userResource, reportsUrl, baseUrlMockeyWeb, $q, $rootScope, expensesUrl,
                                         reportExpensesUrl, reportsSendUrl) {

        var cachedReports = false,
            lastPageFetched = 0,
            cachedReportExpenses = {},
            maxPage = false,
            limit = 8;

        $rootScope.$on('global::signOut', function () {
            cachedReports = false;
            cachedReportExpenses = {};
        });

        return {
            getReport: function (reportId) {
                var foundReport = false;
                return this.getReports().then(function (reports) {
                    reports.some(function (report) {
                        if (report.expenseReportId === parseInt(reportId, 10)) {
                            foundReport = report;
                            return false;
                        }
                    });
                    return foundReport;
                });
            },
            getReports: function (getMoreReports) {
                var promise,
                    params = {
                        limit: limit,
                        token: userResource.getToken()
                    },
                    notCache = false;

                if (getMoreReports) {
                    if (maxPage !== lastPageFetched) {
                        lastPageFetched += 1;
                        params.page = (lastPageFetched * limit);
                        notCache = true;
                    }
                }

                // !notCache is true if I called the function without getMoreReports parameter
                // cachedReports is true if I have cached reports :P
                if (cachedReports && !notCache) {
                    // Empty response?
                    if (maxPage === lastPageFetched) {
                        promise = $q.when(angular.copy(cachedReports));
                    }

                } else {
                    // I want more reports or is the first call
                    // In the first case, params: {limit = 8}
                    // In the second case, params: {limit = 8, page = limit*lastPageFectched}
                    promise = $http.get(baseUrlMockeyWeb + reportsUrl, {params: params}).then(function (response) {
                        if (!cachedReports) {
                            // The first call
                            cachedReports = response.data.expenses;
                        } else {
                            // Push all the reports in the cached reports
                            $.each(response.data.expenses, function(index, report) {
                                if(!(_.findWhere(cachedReports,{'expenseReportId':report.expenseReportId}))){
                                    cachedReports.push(report);
                                }
                            });
                        }

                        // If empty response
                        if (response.data.expenses.length === 0) {
                            maxPage = lastPageFetched;
                        }

                        return cachedReports;
                    });
                }
                return promise;

            },
            createReport: function (reportData) {
                var reportResource = this;

                return $http({
                    method: 'POST',
                    url: baseUrlMockeyWeb + reportsUrl,
                    data: reportData,
                    params: {
                        token: userResource.getToken()
                    }
                }).then(function(response) {
                    var createdReportId = false,
                        createdReportLocation = response.headers('location');

                    if (createdReportLocation) {
                        createdReportId = createdReportLocation.substring(createdReportLocation.lastIndexOf('/') + 1);
                    }

                    reportResource.cleanCache(createdReportId);
                    return createdReportId;
                });
            },
            updateReport: function (reportData) {
                var reportResource = this;

                return $http({
                    method: 'PUT',
                    url: baseUrlMockeyWeb + reportsUrl,
                    data: reportData,
                    params: {
                        token: userResource.getToken()
                    }
                }).then(function() {
                    reportResource.cleanCache(reportData.expenseReportId);
                    return reportData.expenseReportId;
                });
            },
            removeReport: function (reportId) {
                var reportResource = this;

                return $http({
                    method: 'DELETE',
                    url: baseUrlMockeyWeb + reportsUrl,
                    params: {
                        expenseReportId: reportId,
                        token: userResource.getToken()
                    }
                }).then(function(response) {
                    reportResource.cleanCache(reportId);
                    $rootScope.$broadcast('global::expensesRemoved');
                    return response;
                });
            },
            sendReport: function (reportId) {
                return $http.get(baseUrlMockeyWeb + reportsSendUrl, {params: {token: userResource.getToken(), expenseReportId: reportId}}).then(function () {
                    cachedReports = false;
                    lastPageFetched = 0;
                });
            },
            getExpense: function (expenseId, reportId) {
                var foundExpense = false;
                return this.getExpenses(reportId).then(function (expenses) {
                    expenses.some(function (expense) {
                        if (expense.expenseId === parseInt(expenseId, 10)) {
                            foundExpense = expense;
                            return false;
                        }
                    });
                    return foundExpense;
                });
            },
            getExpenses: function (reportId) {
                var promise;
                if (cachedReportExpenses[reportId]) {
                    promise = $q.when(cachedReportExpenses[reportId]);
                } else {
                    promise = $http.get(baseUrlMockeyWeb + expensesUrl, {
                        params: {
                            expenseReportId: reportId,
                            token: userResource.getToken()
                        }
                    }).then(function(response) {
                        cachedReportExpenses[reportId] = response.data.expenses;
                        return cachedReportExpenses[reportId];
                    });
                }

                return promise;
            },
            addExpense: function (reportId, expenseId) {
                var reportResource = this;

                return $http({
                    method: 'POST',
                    url: baseUrlMockeyWeb + reportExpensesUrl,
                    data: {
                        expenseReportId: reportId,
                        expenseIds: [parseInt(expenseId, 10)]
                    },
                    params: {
                        token: userResource.getToken()
                    }
                }).then(function(response) {
                    reportResource.cleanCache(reportId);
                    return response;
                });
            },
            updateExpenses: function (reportId, expenseIds) {
                var reportResource = this;

                return $http({
                    method: 'PUT',
                    url: baseUrlMockeyWeb + reportExpensesUrl,
                    data: {
                        expenseReportId: reportId,
                        expenseIds: expenseIds
                    },
                    params: {
                        token: userResource.getToken()
                    }
                }).then(function(response) {
                    reportResource.cleanCache(reportId);
                    return response;
                });
            },
            removeExpense: function (reportId, expenseId) {
                var reportResource = this;

                return $http({
                    method: 'DELETE',
                    url: baseUrlMockeyWeb + reportExpensesUrl,
                    params: {
                        token: userResource.getToken(),
                        expenseId: expenseId
                    }
                }).then(function(response) {
                    reportResource.cleanCache(reportId);
                    $rootScope.$broadcast('global::expensesRemoved');
                    return response;
                });
            },
            cleanCache: function (reportId) {
                if (cachedReportExpenses[reportId]) {
                    delete cachedReportExpenses[reportId];
                }
                cachedReports = false;
                lastPageFetched = 0;
            }
        };
    });