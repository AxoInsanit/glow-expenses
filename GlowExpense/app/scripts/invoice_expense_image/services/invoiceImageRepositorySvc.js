'use strict';

angular.module('InvoiceExpenseImage').factory('invoiceImageRepositorySvc', ['baseUrlMockeyWeb', 'imagesUrl',
    'expensesUrl',
    function(baseUrlMockeyWeb, imagesUrl, expensesUrl) {
      return {
        getImage: function (token, expenseId) {
          return baseUrlMockeyWeb + expensesUrl + imagesUrl +'?expenseId=' + expenseId + '&token=' + token;
        }
      };
    }
]);