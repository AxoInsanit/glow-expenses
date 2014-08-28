'use strict';

angular.module('Services').factory('filterReportByStateSvc', [function(){

        var statesWhiteList = [
           // 'Draft Expense',
            'Draft',
            'Rejected by Finance',
            'Rejected by Manager',
            'Rejected to Submitter'
        ];

        function checkIfInState(report){
            var result = statesWhiteList.indexOf(report.state) > -1;
            return result;
        }

        return {
            checkIfInState: checkIfInState
        };
    }
]);
