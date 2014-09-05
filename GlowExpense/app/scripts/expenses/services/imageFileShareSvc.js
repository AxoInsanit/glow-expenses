'use strict';

angular.module('Expenses').factory('imageFileShareSvc', [function() {

        var file = {};

        function setFile(value){
            file = value;
        }

        function getFile(){
            return file;
        }

        return {
            setFile: setFile,
            getFile: getFile,
            
        };
    }
]);
