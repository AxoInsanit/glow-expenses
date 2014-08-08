'use strict';

angular.module('Reports')
    .factory('reportSharingSvc', function() {
    var report = {
        data: 'test object value'
    };
    
    return {
        setReport: function(value) {
            report.data = value;
        },
        getReport: function() {
            return report;
        }
    };
});