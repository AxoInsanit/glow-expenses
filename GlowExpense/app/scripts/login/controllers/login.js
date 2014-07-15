'use strict';

angular.module('Login').controller('LoginCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.errorMessage = 'Please try again! Username or password is wrong!';
    $scope.showErrorMessage = false;

    // TODO remove when the real services are ready
    $scope.login = function(user){

        if (user.username === 'rodrigo.rivas' && user.password === 'lambda'){

            $scope.showErrorMessage = false;

            if( window.localStorage ){
                localStorage.setItem('session-token', 'some-complex-token-string');
            }

            $location.path('/expenses');
        }
        else {
            $scope.showErrorMessage = true;
        }

    };

    // TODO uncomment when the real services are ready
//    $scope.login=function(user){
//
//
//        var User = new UserSvc();
//        User.username = user.username;
//        User.password = user.password;
//
//        User.$save()
//            .then(function(response) {
//
//                $scope.showErrorMessage = false;
//
//                if( window.localStorage ){
//                    localStorage.setItem('session-token', response.session_token);
//                }
//
//                $location.path('/expenses');
//
//            },
//            function(){
//
//                $scope.showErrorMessage = true;
//            });
//    };
}]);