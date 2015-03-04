'use strict';

angular.module('Layouts').controller('EditDetailsCtrl', function ($scope) {


    $scope.toggleEditMode = function () {
        $scope.editMode = !$scope.editMode;
        $scope.$broadcast('editMode::expenses', $scope.editMode);
    };

});
