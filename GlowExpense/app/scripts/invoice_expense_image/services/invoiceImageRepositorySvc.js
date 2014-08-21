'use strict';

angular.module('InvoiceExpenseImage').factory('invoiceImageRepositorySvc', ['$resource', 'baseUrlMockeyWeb', 'imagesUrl',
    'expenseSharingSvc', 'expensesUrl', 'localStorageSvc',
    function($resource, baseUrlMockeyWeb, imagesUrl, expenseSharingSvc, expensesUrl,localStorageSvc) {
        //debugger;
        //return $resource(baseUrlMockeyWeb + imagesUrl + '/?token='+ localStorageSvc.getItem(sessionToken),
        return $resource(baseUrlMockeyWeb + expensesUrl + imagesUrl +'?expenseId=' + expenseSharingSvc.getExpenseForEdit().expenseId + "&token="+localStorageSvc.getItem("session-token"), 
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