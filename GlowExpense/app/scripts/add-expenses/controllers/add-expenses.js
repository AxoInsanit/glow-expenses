'use strict';

angular.module('AddExpenses')
    .controller('AddExpensesCtrl', ['$scope', '$location', function ($scope, $location) {

    	$scope.errorMessage = 'Please try again! Something get wrong!';
        $scope.showErrorMessage = false;
        
        $scope.takePhoto = function() {
            function onSuccess(imageURI) {

                var image = {};
                image.src = imageURI;

                $scope.images.push(image);
            }

            function onFail(message) {
                //not defined into the jslint ;( have to find other way to say that there is error
                alert('Failed because: ' + message);
            }

            //main function for photo
            navigator.camera.getPicture(onSuccess, onFail,
                {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    targetWidth: 50,
                    targetHeight: 50
                }
            );
        };
}]);