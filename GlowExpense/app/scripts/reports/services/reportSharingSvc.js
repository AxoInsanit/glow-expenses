'use strict';

angular.module('Reports')
    .factory('reportSharingSvc', function() {

    var report = null;

    return {
        setReport: function(value) {
            report = value;
        },
        getReport: function() {
            return report;
        }
    };
});