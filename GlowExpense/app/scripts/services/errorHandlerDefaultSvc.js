'use strict';

angular.module('Services').factory('errorHandlerDefaultSvc', ['errorDialogSvc', 'errorMessageSvc',
    function(errorDialogSvc, errorMessageSvc){

        function handleError(errorResponse){
            var errorMessage = errorMessageSvc.getErrorMessage(errorResponse.status);
            errorDialogSvc.open(errorMessage);
        }

        return {
            handleError: handleError
        };
    }
]);
