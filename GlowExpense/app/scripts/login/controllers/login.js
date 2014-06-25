'use strict';

angular.module('Login').controller('LoginCtrl', ['$scope', '$location', 'loginRepositorySvc', function ($scope, $location, loginRepositorySvc) {

    $scope.loading = false;

    $scope.errorMessage = 'Please try again username or password is wrong';
    $scope.showErrorMessage = false;

    $scope.login=function(user){

        $scope.loading = true;

        loginRepositorySvc.login(user.username, user.password)
            .then(function(data){
                $scope.showErrorMessage = false;
                if( window.localStorage ){
                    localStorage.setItem('session-token', data.session_token);
                }
            },
            function(){
                $scope.showErrorMessage = true;
            }
        );

        $scope.loading = false;
    };
}]);