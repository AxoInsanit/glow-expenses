'use strict';

angular.module('Expenses')
    .factory('expensesRequestNotificationChannelSvc',
        ['$rootScope', 'selectModeActivated',
            function($rootScope, selectModeActivated){

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

    return {
        activateSelectMode:  activateSelectMode,
        onSelectModeActivated: onSelectModeActivated
    };
}]);
