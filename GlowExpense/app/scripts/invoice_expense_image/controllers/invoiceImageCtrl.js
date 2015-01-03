'use strict';

angular.module('InvoiceExpenseImage').controller('InvoiceImageCtrl', function($scope, invoiceImageRepositorySvc, errorHandlerDefaultSvc,
        expenseIdShareSvc, localStorageSvc ,sessionToken, $routeParams){

      $scope.imageUrl = invoiceImageRepositorySvc.getImage(localStorageSvc.getItem(sessionToken), $routeParams.expenseId);

      $scope.tabImage = function(){
        $scope.viewImage = !$scope.viewImage;
      };
    }
);
