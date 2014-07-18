'use strict';

angular.module('Expenses')
    .factory('expensesRequestNotificationChannelSvc',
        ['$rootScope', 'selectModeActivated', 'detailsModeActivated',
            function($rootScope, selectModeActivated, detailsModeActivated){

    // publish
    var activateSelectMode = function() {
        $rootScope.$broadcast(selectModeActivated);
    };

    // subscribe
    var onSelectModeActivated = function($scope, handler){
        $scope.$on(selectModeActivated, function(){
            handler();
        });
    };

    // publish
    var activateDetailsMode = function(expenseId, isAnotherExpenseOpened) {
        $rootScope.$broadcast(detailsModeActivated, {
                expenseId: expenseId,
                isAnotherExpenseOpened: isAnotherExpenseOpened
            }
        );
    };

    // subscribe
    var onDetailsModeActivated = function($scope, handler){
        $scope.$on(detailsModeActivated, function(event, args){
            handler(args.expenseId, args.isAnotherExpenseOpened);
        });
    };

    return {
        activateSelectMode:  activateSelectMode,
        onSelectModeActivated: onSelectModeActivated,
        activateDetailsMode: activateDetailsMode,
        onDetailsModeActivated: onDetailsModeActivated
    };
}]);
