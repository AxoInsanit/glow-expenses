'use strict';

angular.module('Modals').factory('currencySelectDialogSvc', ['$modal',  function($modal){

        function open(lastSelectedCurrency, currencies) {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/currency-select-dialog.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    var importantSelected;

                    $scope.showOption = true;
                    $scope.currencies = currencies;

                    if (lastSelectedCurrency) {
                        $.each($scope.currencies, function(index, item){
                            if (lastSelectedCurrency.id === item.id){
                                importantSelected = (index < 10) ? true : false;
                                item.selected = true;
                                item.important = true;
                            } else {
                                item.selected = false;
                                if (index < 10) {
                                    item.important = true;
                                } else {
                                    item.important = importantSelected ? false : true;
                                    $scope.showOption = importantSelected ? true : false;
                                }
                            }
                        });
                    }
                    else
                    {
                        $.each($scope.currencies, function(index, item){
                            item.selected = false;
                            if (index < 10) {
                                item.important = true;
                            } else {
                                item.important = false;
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

                    $scope.showAllCurrencies = function(){
                        $scope.showOption = false;
                        $.each($scope.currencies, function(index, item){
                            item.important = true;
                        });
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
