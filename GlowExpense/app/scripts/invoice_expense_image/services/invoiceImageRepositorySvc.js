'use strict';

angular.module('InvoiceExpenseImage').factory('invoiceImageRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'imagesUrl',
    'expensesUrl',
    function($resource, baseUrlMockeyWeb, imagesUrl, expensesUrl) {


        return $resource(baseUrlMockeyWeb + expensesUrl + imagesUrl +'?expenseId=:expenseId' + '&token=:token',
            {
                expenseId: 'expenseId',
                token: 'token'
            },
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