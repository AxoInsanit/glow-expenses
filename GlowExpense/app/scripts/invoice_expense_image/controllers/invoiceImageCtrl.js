'use strict';

angular.module('InvoiceExpenseImage').controller('InvoiceImageCtrl', ['$scope', 'invoiceImageRepositorySvc',
    'errorHandlerDefaultSvc',
    function($scope, invoiceImageRepositorySvc, errorHandlerDefaultSvc){
		$scope.viewImage = false;
		
		$scope.tabImage = function(){
			$scope.viewImage = !$scope.viewImage;
		};

        function getImageSuccess(result){
            $scope.invoiceImage = result.invoiceImage;
        }

        invoiceImageRepositorySvc.getImage(
            {},
            getImageSuccess,
            errorHandlerDefaultSvc.handleError
        );
    }
]);