'use strict';

angular.module('Reports')
    .factory('reportsSharingSvc', ['$q', 'reportsRepositorySvc', 'localStorageSvc', 'sessionToken',
        'errorHandlerDefaultSvc', 'infiniteScrollEnabled',
        function($q, reportsRepositorySvc, localStorageSvc, sessionToken, errorHandlerDefaultSvc,
                 infiniteScrollEnabled) {

        var reports = [];

        var lastShownReport = 0;

        var reportsPerPage = 5;

        function getNextFiveReports(){
            var reportsToShow = [];

            var condition = lastShownReport + reportsPerPage;

            if (reports.length < condition){
                reportsToShow = reports;
                lastShownReport += reportsToShow.length;

            }
            else {
                for (var i = 0; i < condition; i++){
                    reportsToShow.push(reports[i]);
                }

                lastShownReport += reportsPerPage;
            }

            return reportsToShow;
        }

        // lazy load reports on demand
        function getReports(){

            var result = null;

            function sortByDate(arr) {
                if (!arr || (arr.length === 0)) {
                    // console.warn('Cannot sort array, because array is empty.');
                    return false;
                }

                arr.sort(function (a, b) {
                    return new Date(b.creationDate) - new Date(a.creationDate);
                });
            }

            function reportsSuccess(response){
                var responseArray = response.expenses,
                    rejected      = [],
                    otherReports  = [];

                responseArray.forEach(function(item){

                    item.title = item.description;

                    item.locked = (item.state.indexOf('Draft') >= 0 || item.state.indexOf('Reject') >= 0) ? false : true;

                    if (item.state.indexOf('Rejected') >= 0) {
                        rejected.push(item);
                    } else {
                        otherReports.push(item);
                    }

                });

                sortByDate(rejected);
                sortByDate(otherReports);

                reports = rejected.concat(otherReports);

                if (infiniteScrollEnabled){
                    if (lastShownReport !== 0){
                        var reportsMapperCopy = angular.copy(reports);
                        result = reportsMapperCopy.splice(0, lastShownReport);
                    }
                    else {
                        result = getNextFiveReports();
                    }

                    deferred.resolve(result);
                }
                else {
                    deferred.resolve(reports);
                }

                //
                // Unset variables
                //
                rejected      = null;
                otherReports  = null;
                responseArray = null;
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
                if(infiniteScrollEnabled){
                    var reportsMapperCopy = angular.copy(reports);

                    var resultReports = reportsMapperCopy.splice(0, lastShownReport);
                    deferred.resolve(resultReports);
                }
                else {
                    deferred.resolve(reports);
                }

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

            if (reportToDeleteIndex !== null) {
               reports.splice(reportToDeleteIndex, 1);
            }
        }

        function updateReport(report){
            reports.some(function(item){
                if(item.expenseReportId === report.expenseReportId){

                    item.description = report.description;
                    item.title = report.title;
                    item.entityId = report.entityId;
                    return true;
                }
            });
        }

        function updateReportTotal(reportId, amount){
            getReportById(reportId).total += amount;
        }

        function getReportById(reportId){
            if (reportId !== undefined) {
                reportId = parseInt(reportId, 10);
            }

            return getReports().then(function () {
                var result = false;

                reports.some(function(item){
                    if(item.expenseReportId === reportId){
                        result = item;
                        return true;
                    }
                });

                return result;
            });
        }

        function addReport(){
           // lastShownReport = lastShownReport + 1;
          //  expenseSharingSvc.addReport(reportId);
        }

        function resetReports(){
            reports = [];
        }

        return {
            getReports: getReports,
            deleteReport: deleteReport,
            updateReport: updateReport,
            updateReportTotal: updateReportTotal,
            getReportById: getReportById,
            addReport: addReport,
            resetReports: resetReports,
            getNextFiveReports: getNextFiveReports
        };
    }
]);
