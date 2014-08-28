'use strict';

angular.module('Reports')
    .factory('reportsSharingSvc', ['$q', 'reportsRepositorySvc', 'localStorageSvc', 'sessionToken',
        'errorHandlerDefaultSvc', 'expenseSharingSvc',
        function($q, reportsRepositorySvc, localStorageSvc, sessionToken, errorHandlerDefaultSvc, expenseSharingSvc) {

        var reports = [];

        // lazy load reports on demand
        function getReports(){

            function reportsSuccess(response){
                var responseArray = response.expenses;
                responseArray.forEach(function(item){
                    item.title = item.description;
                    reports.push(item);
                });
                deferred.resolve(reports);
            }

            var deferred = $q.defer();

            if (reports.length === 0){
                reportsRepositorySvc.getReports(
                    { 'token': localStorageSvc.getItem(sessionToken) },
                    reportsSuccess,
                    errorHandlerDefaultSvc.handleError
                );
            }
            else {
                deferred.resolve(reports);
            }

            return deferred.promise;
        }

        // TODO service that is called from within delete and update expense/report as the logic is the same
        function deleteReport(reportId){
            var reportToDeleteIndex = null;
            reports.some(function(item, index){
                if (item.expenseReportId === reportId){
                    reportToDeleteIndex = index;
                    return true;
                }
            });

            if (reportToDeleteIndex !== null){
               reports.splice(reportToDeleteIndex, 1);
            }
        }

        function updateReport(report){
            reports.some(function(item){
                if(item.expenseReportId === report.expenseReportId){
                    item = report;
                    return true;
                }
            });
        }

        function getReportById(reportId){
            var result = null;
            reports.some(function(item){
                if(item.expenseReportId === reportId){
                    result = item;
                    return true;
                }
            });

            // TODO handler errors
            if (!result){
              //  throw new Error('Report not found');
                result = {};
            }

            return result;
        }

        function addReport(report){
            reports.push(report);
            expenseSharingSvc.addReport(report.expenseReportId);
        }

        function resetReports(){
            reports = [];
        }

        return {
            getReports: getReports,
            deleteReport: deleteReport,
            updateReport: updateReport,
            expenseSharingSvc: expenseSharingSvc,
            getReportById: getReportById,
            addReport: addReport,
            resetReports: resetReports
        };
    }
]);