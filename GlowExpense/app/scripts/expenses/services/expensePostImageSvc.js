'use strict';

angular.module('Expenses').factory('expensePostImageSvc', ['fileTransferSvc', 'baseUrlMockeyWeb', 'imagesUrl','expensesUrl',
    function(fileTransferSvc, baseUrlMockeyWeb, imagesUrl, expensesUrl) {

      return {
        postImages: function (file, tokenId, expenseId) {
          var url = baseUrlMockeyWeb + expensesUrl + imagesUrl + '?expenseId=' + expenseId + '&token=' + tokenId;
          return fileTransferSvc.upload(url, file);
        }
      };

    }
]);