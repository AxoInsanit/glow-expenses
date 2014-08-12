'use strict';

angular.module('Reports')
    .factory('reportsSharingSvc', ['$q', 'reportsRepositorySvc', function($q, reportsRepositorySvc) {

        var reports = [];
        var report = null;

        // lazy load reports on demand
        function getReports(){
            var deferred = $q.defer();

            if (reports.length === 0){
                reportsRepositorySvc.getReports().$promise.then(function(response){
                    reports = response;
                    deferred.resolve(reports);
                });
            }
            else {
                deferred.resolve(reports);
            }

            return deferred.promise;
        }

        return {
            setReport: function(value) {
                report = value;
            },
            getReport: function() {
                return report;
            },
            getReports: getReports
        };
    }
]);