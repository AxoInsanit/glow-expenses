'use strict';

angular.module('Services').factory('getIdFromLocationSvc', [function(){

        function getLastIdFromLocation(url){
            var id = url.substring(url.lastIndexOf('/') + 1);
            return parseInt(id, 10);
        }

        function getFirstIdFromLocation(url){
            var match = url.match(/\d+/);
            return (match) ? Number(match[0]) : null;
        }

        return {
            getLastIdFromLocation: getLastIdFromLocation,
            getFirstIdFromLocation: getFirstIdFromLocation
        };
    }
]);
