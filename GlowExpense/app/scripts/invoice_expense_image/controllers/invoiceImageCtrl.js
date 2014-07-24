'use strict';

angular.module('InvoiceExpenseImage').controller('InvoiceImageCtrl', ['$scope', 'expensesRepositorySvc',
    function($scope, expensesRepositorySvc){

        // TODO service should get some params when backend is ready
        expensesRepositorySvc.getImage({},  {'image': 'image'}).$promise.then(function (result) {
            $scope.invoiceImage = result.invoiceImage;
        });
    }
]);