'use strict';

angular.module('InvoiceExpenseImage').controller('InvoiceImageCtrl', ['$scope', 'invoiceImageRepositorySvc',
    function($scope, invoiceImageRepositorySvc){
		$scope.viewImage = false;
		
		$scope.tabImage = function(){
			$scope.viewImage = !$scope.viewImage;
		};

        function getImageSuccess(result){
            $scope.invoiceImage = result.invoiceImage;
        }

        function getImageFail(){

        }
        //debugger;
        invoiceImageRepositorySvc.getImage(
            {},
            getImageSuccess,
            getImageFail
        );
    }
]);