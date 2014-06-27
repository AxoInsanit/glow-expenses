'use strict';

angular.module('Login').controller('LoginCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.loading = false;

    $scope.errorMessage = 'Please try again! Username or password is wrong!';
    $scope.showErrorMessage = false;

    // TODO uncomment when the real services are ready
    $scope.login = function(user){

        $scope.loading = true;

        if (user.username === 'rodrigo.rivas' && user.password === 'lambda'){
            $scope.loading = false;
            $scope.showErrorMessage = false;

            if( window.localStorage ){
                localStorage.setItem('session-token', 'some-complex-token-string');
            }

            $location.path('/expenses');
        }
        else {
            $scope.showErrorMessage = true;
            $scope.loading = false;
        }

    };

    // TODO uncomment when the real services are ready
//    $scope.login=function(user){
//
//        $scope.loading = true;
//
//        var User = new UserSvc();
//        User.username = user.username;
//        User.password = user.password;
//
//        User.$save()
//            .then(function(response) {
//
//                $scope.loading = false;
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
//                $scope.loading = false;
//            });
//    };
}]);