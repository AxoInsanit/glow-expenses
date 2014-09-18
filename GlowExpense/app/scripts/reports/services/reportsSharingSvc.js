'use strict';

angular.module('Reports')
    .factory('reportsSharingSvc', ['$q', 'reportsRepositorySvc', 'localStorageSvc', 'sessionToken',
        'errorHandlerDefaultSvc', 'expenseSharingSvc', 'infiniteScrollEnabled',
        function($q, reportsRepositorySvc, localStorageSvc, sessionToken, errorHandlerDefaultSvc, expenseSharingSvc,
                 infiniteScrollEnabled) {

        var reports = [];

        var lastShownReport = 0;

        var reportsPerPage = 5;

        function getNextFiveReports(){
            var reportsToShow = [];

            var condition = lastShownReport + reportsPerPage;

            if (reports.length < condition){
                reportsToShow = reports;
//                var remainingReports = reports.length - lastShownReport;
//
//                var reportCopy = angular.copy(reports);
//                reportsToShow = reportCopy.splice(lastShownReport, remainingReports);
//
//                for (var i = 0; i < reportsToShow; i++){
//                    reportsToShow.push(reports[i]);
//                }
//
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

            function reportsSuccess(response){
                var responseArray = response.expenses;
                responseArray.sort(function(a,b) {
                    return new Date(b.creationDate) - new Date(a.creationDate);
                });
                responseArray.forEach(function(item){
                    item.title = item.description;
                    //check is it draft or rejected and if it is its locked. Else it is not.
                    if((item.state.indexOf('Draft')>=0)||(item.state.indexOf('Reject')>=0))
                    {
                        item.locked = false;
                    }
                    else
                    {
                        item.locked = true;
                    }
                    reports.push(item);
                });

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
                    expenseSharingSvc.test();
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

            if (reportToDeleteIndex !== null){
               reports.splice(reportToDeleteIndex, 1);
               expenseSharingSvc.deleteReportMapping(reportId);
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
            expenseSharingSvc: expenseSharingSvc,
            getReportById: getReportById,
            addReport: addReport,
            resetReports: resetReports,
            getNextFiveReports: getNextFiveReports
        };
    }
]);