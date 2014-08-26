'use strict';

angular.module('Reports')
    .factory('reportsSharingSvc', ['$q', 'reportsRepositorySvc', 'localStorageSvc', 'sessionToken', 'errorHandlerDefaultSvc',
        function($q, reportsRepositorySvc, localStorageSvc, sessionToken, errorHandlerDefaultSvc) {

        var reports = [];
        var report = {};

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
            if (reportToDeleteIndex){
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

        function getReport() {
            return report;
        }

        function setReport(value) {
            report = value || {};
        }

        return {
            setReport: setReport,
            getReport: getReport,
            getReports: getReports,
            deleteReport: deleteReport,
            updateReport: updateReport
        };
    }
]);