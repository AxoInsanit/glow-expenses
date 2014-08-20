'use strict';

angular.module('Reports').factory('reportsRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportsUrl',
    'localStorageSvc',
    function($resource, baseUrlMockeyWeb, reportsUrl, localStorageSvc) {


        return $resource(baseUrlMockeyWeb + reportsUrl + '?token='+ localStorageSvc.getItem('session-token'), {}, {
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
                'deleteReports': {
                    'method': 'DELETE'
                }
            }
        );
    }
]);