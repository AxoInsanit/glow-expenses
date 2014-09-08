'use strict';

angular.module('InvoiceExpenseImage').controller('InvoiceImageCtrl', ['$scope', 'invoiceImageRepositorySvc',
    'errorHandlerDefaultSvc', 'baseUrlMockeyWeb', 'expenseIdShareSvc', 'localStorageSvc', 'sessionToken',
    function($scope, invoiceImageRepositorySvc, errorHandlerDefaultSvc, baseUrlMockeyWeb,
        expenseIdShareSvc, localStorageSvc ,sessionToken){
        
		$scope.viewImage = false;
        $scope.path = baseUrlMockeyWeb;
        $scope.expenseId = expenseIdShareSvc.getId();
        $scope.token = localStorageSvc.getItem(sessionToken);

		
		$scope.tabImage = function(){
			$scope.viewImage = !$scope.viewImage;
		};
    }
]);