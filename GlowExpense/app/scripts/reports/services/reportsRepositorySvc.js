'use strict';

angular.module('Reports').factory('reportsRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportsUrl',
    function($resource, baseUrlMockeyWeb, reportsUrl) {
        return $resource(baseUrlMockeyWeb + reportsUrl + "?token="+ localStorage.getItem("session-token"), {}, {
                'getReports': {
                    'method': 'GET',
                    'isArray': true
                },
                'saveReports': {
                    'method': 'POST',
                    'isArray': true
                },
                'editReports': {
                    'method': 'PUT',
                    'isArray': true
                },
                'deleteReports': {
                    'method': 'DELETE',
                    'isArray': true
                }
            }
        );
    }
]);