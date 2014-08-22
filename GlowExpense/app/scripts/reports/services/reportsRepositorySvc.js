'use strict';

angular.module('Reports').factory('reportsRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportsUrl', 'localStorageSvc', 'sessionToken',
    function($resource, baseUrlMockeyWeb, reportsUrl, localStorageSvc, sessionToken) {

        //return $resource(baseUrlMockeyWeb + reportsUrl + '/?token='+ localStorageSvc.getItem(sessionToken),
        return $resource(baseUrlMockeyWeb + reportsUrl + '?token=' + localStorageSvc.getItem(sessionToken) ,
            {},
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