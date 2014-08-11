'use strict';

angular.module('Modals').factory('currencySelectDialogSvc', ['$modal',  function($modal){

        function open(lastSelectedCurrency, currencies) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/currency-select-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.currencies = currencies;

                    if (lastSelectedCurrency) {
                        $scope.currencies.forEach(function(item){
                            if (lastSelectedCurrency.id === item.id){
                                item.selected = true;
                            } else {
                                item.selected = false;
                            }
                        });
                    }

                    $scope.select = function(currency) {
                        if (lastSelectedCurrency){
                            lastSelectedCurrency.selected = false;
                        }

                        currency.selected = true;
                        $modalInstance.close(currency);
                    };
                }]
            });

            return modalInstance.result.then(function(response) {
                return response;
            });
        }

        return {
            open: open
        };
    }
]);
