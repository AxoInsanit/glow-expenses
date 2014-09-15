'use strict';

/* global Camera: false */
/* global confirm: false */

angular.module('Services').factory('cameraSvc', ['$q', function($q){

        var source = null;
        // if(typeof(Camera) != 'undefined')
        // {
        //     source = Camera.PictureSourceType.CAMERA;
        // }
        // else
        // {
        //     var Camera = {'PictureSourceType':{}};
        // }

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
                var imagePrefix = "data:image/jpeg;base64,";

                if (confirm('Upload image to expense?')) {
                    deferred.resolve(imagePrefix + imageURI);
                } else {
                    deferred.reject();
                }
            }

            function onFail() {
                deferred.reject();
            }
            navigator.camera.getPicture(onSuccess, onFail, { quality: 100, destinationType : Camera.DestinationType.DATA_URL, sourceType: source, saveToPhotoAlbum: false });
            return deferred.promise;
        }
        return {
            takePhoto: takePhoto,
            setSource: setSource
        };
    }
]);
