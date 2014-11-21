'use strict';

/* global Camera: false */
/* global confirm: false */

angular.module('Services').factory('cameraSvc', ['$q', function($q){

        var source = null;

        function setSource(type)
        {
            if(type === 'camera')
            {
                source = Camera.PictureSourceType.CAMERA;
            }
            else
            {
                source = Camera.PictureSourceType.PHOTOLIBRARY;
            }
        }

        function takePhoto() {
            var deferred = $q.defer();
            function onSuccess(imageURI) {
                if (confirm('Upload image to expense?')) {
                    deferred.resolve(imageURI);
                } else {
                    deferred.reject();
                }
            }

            function onFail() {
                deferred.reject();
            }
            navigator.camera.getPicture(onSuccess, onFail, {
              quality: 100,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: source,
              saveToPhotoAlbum: false
            });
            return deferred.promise;
        }
        return {
            takePhoto: takePhoto,
            setSource: setSource
        };
    }
]);
