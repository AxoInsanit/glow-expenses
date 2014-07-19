'use strict';

angular.module('InvoiceExpenseImage').controller('InvoiceImageCtrl',['$scope', 'invoiceImageSvc',
    function($scope, invoiceImageSvc){

        $scope.invoiceImage = invoiceImageSvc.get();
        debugger;
    }
]);