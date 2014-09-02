'use strict';

angular.module('Expenses').factory('lastShownExpenseSvc', [function() {

        var index = 0;
        var expenses = [];

        function setIndex(value){
            index = value;
        }

        function getIndex(){
            return index;
        }

        function setLastVisibleExpenses(value){
            expenses = value;
        }

        function getLastVisibleExpenses(){
            return expenses;
        }

        return {
            setIndex: setIndex,
            getIndex: getIndex,
            setLastVisibleExpenses: setLastVisibleExpenses,
            getLastVisibleExpenses: getLastVisibleExpenses
        };
    }
]);
