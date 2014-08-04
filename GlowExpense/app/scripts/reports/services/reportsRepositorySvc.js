'use strict';

angular.module('Reports').factory('reportsRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportsUrl',
    function($resource, baseUrlMockeyWeb, reportsUrl) {
        return $resource(baseUrlMockeyWeb + reportsUrl, {}, {
                'getReports': {
                    'method': 'GET',
                    'isArray': true
                },
                'saveReports': {
                    'method': 'POST'
                },
                'deleteReports': {
                    'method': 'DELETE',
                    'isArray': true
                }
            }
        );
    }
]);