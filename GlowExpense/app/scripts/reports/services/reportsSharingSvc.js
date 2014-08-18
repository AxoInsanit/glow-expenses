'use strict';

angular.module('Reports')
    .factory('reportsSharingSvc', ['$q', 'reportsRepositorySvc', function($q, reportsRepositorySvc) {

        var reports = [];
        var report = {};

        // lazy load reports on demand
        function getReports(){

            function reportsSuccess(response){
                response.forEach(function(item){
                    item.title = item.description;
                    reports.push(item);
                });
                deferred.resolve(reports);
            }

            var deferred = $q.defer();

            if (reports.length === 0){
                reportsRepositorySvc.getReports({}, reportsSuccess)
            }
            else {
                deferred.resolve(reports);
            }

            return deferred.promise;
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
            getReports: getReports
        };
    }
]);