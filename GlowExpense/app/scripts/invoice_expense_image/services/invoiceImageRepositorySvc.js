'use strict';

angular.module('InvoiceExpenseImage').factory('invoiceImageRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'expensesUrl',
    'localStorageSvc', 'sessionToken',
    function($resource, baseUrlMockeyWeb, imagesUrl, localStorageSvc, sessionToken) {

        return $resource(baseUrlMockeyWeb + imagesUrl + '/?token='+ localStorageSvc.getItem(sessionToken),
            {},
            {
                'getImage': {
                    'method': 'GET',
                    'isArray': false
                },
                'saveImage': {
                    'method': 'POST',
                    'isArray': false
                }
            }
        );
    }
]);