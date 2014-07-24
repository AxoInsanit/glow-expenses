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
                var x;
                if (confirm("Upload image to expense?") == true) {
                    alert("You pressed OK!");
                    $scope.$apply(function(){ $scope.imageSelectedPath = imageURI; })    
                } else {
                    alert("You pressed Cancel!");
                }
                
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }

            //main function for photo
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.FILE_URI });
        };
    }]);