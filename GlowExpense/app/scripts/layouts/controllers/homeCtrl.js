'use strict';

angular.module('Layouts').controller('HomeCtrl', function ($scope, $state, $timeout, signOutDialogSvc) {


    var views = ['expenses', 'reports'],
        stateParams = $state.$current.locals.globals.$stateParams;


    $scope.viewChanged = function (activeView) {
        $timeout(function () {
            $scope.activeView = activeView;
            if ($scope.editMode) {
                $scope.toggleEditMode();
            }
        }, 0);
    };

    $scope.goToView = function (view) {
        $scope.activeView = views.indexOf(view);
        $scope.$broadcast('swipeAndSnap::changeView', $scope.activeView);
        if ($scope.editMode) {
            $scope.toggleEditMode();
        }
    };

    $scope.signOut = function () {
        signOutDialogSvc.open();
    };

    $scope.toggleEditMode = function () {
        $scope.editMode = !$scope.editMode;
    };

    if ($scope.activeView) {
        $scope.$broadcast('swipeAndSnap::changeView', $scope.activeView);
    }

    if (stateParams.view === 'expenses') {
        $scope.activeView = views.indexOf('expenses');
    } else if (stateParams.view === 'reports') {
        $scope.activeView = views.indexOf('reports');
    } else {
        $scope.activeView = 0;
    }

});
