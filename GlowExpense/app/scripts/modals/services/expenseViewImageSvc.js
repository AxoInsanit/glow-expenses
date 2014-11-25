'use strict';

angular.module('Modals').factory('expenseViewImageSvc', ['$modal', '$location',
    function($modal, $location){

        function open() {
            var modalInstance = $modal.open({
                templateUrl: 'scripts/modals/views/expense-view-image.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {

                    $scope.profileName = localStorage.getItem('userName');

                    $scope.$on('$locationChangeStart', function() {
                        $modalInstance.close('true');
                    });

                    $scope.selectNew = function() {
                        $modalInstance.close();
                    };

                    $scope.view = function() {
                        $location.path('/invoice-expense-image');
                        $modalInstance.dismiss();
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