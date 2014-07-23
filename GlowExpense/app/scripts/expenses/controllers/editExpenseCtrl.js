'use strict';

/* global Camera: false */
/* global alert: false */

angular.module('Expenses')
    .controller('EditExpenseCtrl', ['$scope', '$location', 'editExpenseErrorMsg',

        function ($scope, $location, addExpenseErrorMsg) {

        $scope.errorMessage = addExpenseErrorMsg;
        $scope.showErrorMessage = false;
        $scope.imageSelectedPath = '';


        $scope.date = new Date();

        // TODO Mitko move this to a service
        $scope.takePhoto = function() {
            function onSuccess(imageURI) {
                $scope.imageSelectedPath = imageURI;
                var x;
                if (confirm("Upload image to expense? URL is"+imageURI) == true) {
                    x = "You pressed OK!";
                } else {
                    x = "You pressed Cancel!";
                }
            }

            function onFail(message) {
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