'use strict';

angular.module('InvoiceExpenseImage').factory('invoiceImageSvc', function(){

        var invoiceImage = null;

        function get(){
            return invoiceImage;
        }

        function set(invoiceImageData){
            invoiceImage = invoiceImageData;
        }

        return {
            get: get,
            set: set
        };
    }
);