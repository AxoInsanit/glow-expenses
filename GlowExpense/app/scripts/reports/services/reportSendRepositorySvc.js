'use strict';

angular.module('Reports').factory('reportSendRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'reportsUrl',
    function($resource, baseUrlMockeyWeb, reportsUrl) {

        return $resource(baseUrlMockeyWeb + reportsUrl + '/send?expenseReportId=:expenseReportId' + '&token=:token',
            {
                expenseReportId: 'expenseReportId',
                token: 'token'
            },
            {
                'sendReport': {
                    'method': 'GET'
                }
            }
        );
    }
]);