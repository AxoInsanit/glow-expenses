'use strict';

angular.module('Reports').factory('reportsRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportsUrl',
    function($resource, baseUrlMockeyWeb, reportsUrl) {

        return $resource(baseUrlMockeyWeb + reportsUrl + '?token=:token',
            {
                token: 'token'
            },
            {
                'getReports': {
                    'method': 'GET'
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