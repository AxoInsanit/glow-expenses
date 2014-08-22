'use strict';

angular.module('Reports').factory('reportsRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportsUrl',
    function($resource, baseUrlMockeyWeb, reportsUrl) {

        return $resource(baseUrlMockeyWeb + reportsUrl ,
            {},
            {
                'getReports': {
                    'method': 'GET',
                    'isArray': true
                },
                'createReport': {
                    'method': 'POST'
                },
                'saveReport': {
                    'method': 'PUT'
                },
                'deleteReport': {
                    'method': 'DELETE'
                }
            }
        );
    }
]);