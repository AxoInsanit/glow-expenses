'use strict';

angular.module('Modals').factory('editExRateDialogSvc', ['$modal',  function($modal){

        function parseCurrency(currency) {
            return currency && Number(currency.replace(/[^0-9\.]+/g,''));
        }

        function open() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/edit-exrate-dialog.html',
                controller: ['$scope', '$modalInstance', '$filter', function($scope, $modalInstance, $filter) {
                    $scope.ok = function() {
                        $modalInstance.close($scope.expense.exchangeRate);
                    };

                    $scope.cancel = function() {
                        $modalInstance.dismiss('false');
                    };

                    $scope.formatCurrency = function (valueKey) {
                        var value = $filter('currency')(parseCurrency($scope.expense[valueKey]), '', 2);
                        if (value && value.indexOf('NaN') !== -1) {
                            value = $filter('currency')(parseCurrency($scope.expense[valueKey].slice(0,$scope.expense[valueKey].length - 3)), '', 2);
                        }
                        $scope.expense[valueKey] = value;
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