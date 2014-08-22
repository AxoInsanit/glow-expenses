'use strict';

angular.module('InvoiceExpenseImage').factory('invoiceImageRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'expensesUrl',

    function($resource, baseUrlMockeyWeb, imagesUrl) {

        return $resource(baseUrlMockeyWeb + imagesUrl,
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