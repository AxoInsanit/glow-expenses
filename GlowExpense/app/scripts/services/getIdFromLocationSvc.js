'use strict';

angular.module('Services').factory('getIdFromLocationSvc', [function(){

        function getIdFromLocation(url){
            var id = url.substring(url.lastIndexOf('/') + 1);
            return parseInt(id);
        }

        return {
            getIdFromLocation: getIdFromLocation
        };
    }
]);
