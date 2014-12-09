'use strict';

angular.module('Modals').factory('currencySelectDialogSvc', ['$modal',  function($modal){

        function open(lastSelectedCurrency, currencies) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/currency-select-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.currencies = currencies;

                    $scope.$on('$locationChangeStart', function() {
                        $modalInstance.close('true');
                    });

                    if (lastSelectedCurrency) {
                        $scope.currencies.forEach(function(item){
                            if (lastSelectedCurrency.id === item.id){
                                item.selected = true;
                            } else {
                                item.selected = false;
                            }
                        });
                    }
                    else
                    {
                        $scope.currencies.forEach(function(item){
                            item.selected = false;
                        });
                    }

                    $scope.select = function(currency) {
                        if (lastSelectedCurrency){
                            lastSelectedCurrency.selected = false;
                        }

                        currency.selected = true;
                        $modalInstance.close(currency);
                    };

                    // handle device's back button, close modal
                    function backButtonHandler() {
                        $modalInstance.dismiss('canceled');
                    }

                    document.addEventListener('backbutton', backButtonHandler);

                    // on modal close remove handler
                    $scope.$on('$destroy', function () {
                        document.removeEventListener('backbutton', backButtonHandler);
                    });
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
