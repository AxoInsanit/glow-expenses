'use strict';

angular.module('Expenses').factory('expenseIdShareSvc', [function() {

        var id = 0;

        function setId(value){
            id = value;
        }

        function getId(){
            return id;
        }

        return {
            setId: setId,
            getId: getId,
            
        };
    }
]);
