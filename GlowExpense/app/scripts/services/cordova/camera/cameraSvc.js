'use strict';

angular.module('Services').factory('cameraSvc', ['$q', function($q){

         function takePhoto() {
             var deferred = $q.defer();

            function onSuccess(imageURI) {
                if (confirm("Upload image to expense?")) {
                    deferred.resolve(imageURI);
                } else {
                    deferred.reject();
                }
            }

            function onFail(message) {
                deferred.reject();
            }

            navigator.camera.getPicture(onSuccess, onFail, { quality: 50, targetWidth: 100,
                targetHeight: 100, destinationType: Camera.DestinationType.FILE_URI });

            return deferred.promise;
        }

        return {
            takePhoto: takePhoto
        };
    }
]);
