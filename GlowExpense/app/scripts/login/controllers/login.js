'use strict';

angular.module('Login').controller('LoginCtrl', ['$scope', '$location', 'UserSvc', 'errorMsg',
    function ($scope, $location, UserSvc, errorMsg) {

    $scope.errorMessage = errorMsg;
    $scope.showErrorMessage = false;

    $scope.login=function(user){

        var User = new UserSvc();
        User.username = user.username;
        User.password = user.password;

        User.$save()
            .then(function(response) {
                $scope.showErrorMessage = false;

                if( window.localStorage ){
                    localStorage.setItem('session-token', response.session_token);
                }

                $location.path('/expenses');

            },
            function(result){
                $scope.showErrorMessage = true;
                $scope.user.username = '';
                $scope.user.password = '';
            });
    };
}]);