'use strict';

angular.module('Services').factory('errorHandlerDefaultSvc', ['errorDialogSvc', 'errorMessageSvc',
    function(errorDialogSvc, errorMessageSvc){

        function handleError(errorResponse){
            var errorMessage = errorMessageSvc.getErrorMessage(errorResponse.status);
            return errorDialogSvc.open(errorMessage);
        }

        return {
            handleError: handleError
        };
    }
]);
