'use strict';

angular.module('InvoiceExpenseImage').controller('InvoiceImageCtrl', ['$scope', 'invoiceImageRepositorySvc',
    'errorHandlerDefaultSvc', 'expenseIdShareSvc', 'localStorageSvc', 'sessionToken',
    function($scope, invoiceImageRepositorySvc, errorHandlerDefaultSvc,
        expenseIdShareSvc, localStorageSvc ,sessionToken){

      $scope.imageUrl = invoiceImageRepositorySvc.getImage(localStorageSvc.getItem(sessionToken), expenseIdShareSvc.getId());
		
      $scope.tabImage = function(){
        $scope.viewImage = !$scope.viewImage;
      };
    }
]);