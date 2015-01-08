/**
 * Created by diego.caro on 07/11/2014.
 */
'use strict';

angular.module('Modals').factory('contableCodeSelectDialogSvc', ['$modal',  function($modal){

    function open(lastSelectedContableCode, contableCodes) {
        var modalInstance = $modal.open({
            templateUrl: 'scripts/modals/views/contableCode-select-dialog.html',
            controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                $scope.contableCodes = contableCodes;

                $scope.$on('$locationChangeStart', function() {
                    $modalInstance.close('true');
                });

                if (lastSelectedContableCode) {
                    $scope.contableCodes.forEach(function(item){
                        if (lastSelectedContableCode.id === item.id){
                            item.selected = true;
                        } else {
                            item.selected = false;
                        }
                    });
                }
                else
                {
                    $scope.contableCodes.forEach(function(item){
                        item.selected = false;
                    });
                }

                $scope.select = function(contableCode) {
                    if (lastSelectedContableCode){
                        lastSelectedContableCode.selected = false;
                    }

                    contableCode.selected = true;
                    $modalInstance.close(contableCode);
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
