'use strict';

angular.module('Services').factory('errorMessageSvc', ['unauthorized', 'badRequest', 'notFound', 'generalError',

    function(unauthorized, badRequest, notFound, generalError){

        function getErrorMessage(errorCode){
            var errorMessage = null;

            switch (errorCode) {
                case 400:
                    errorMessage = badRequest;
                    break;
                case 401:
                    errorMessage = unauthorized;
                    break;
                case 404:
                    errorMessage = notFound;
                    break;
                default:
                    errorMessage = generalError;
            }

            return errorMessage;
        }

        return {
            getErrorMessage: getErrorMessage
        };
    }
]);
