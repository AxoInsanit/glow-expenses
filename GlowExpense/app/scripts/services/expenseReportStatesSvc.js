'use strict';

angular.module('Services').factory('expenseReportStatesSvc', [function(){

        var reportStates = [
            'Approved by Finance',
            'Approved by Manager',
            'Approved by Owner',
            'Cancelled Expense',
            'Draft Expense',
            'Paid',
            'Pending Approval',
            'Pending Owner Approval',
            'Preparing Payment',
            'Rejected by Finance',
            'Rejected by Manager',
            'Rejected to Submitter'
        ];

        function getReportStates(){
            return reportStates;
        }

        return {
            getReportStates: getReportStates
        };
    }
]);
