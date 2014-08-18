'use strict';

angular.module('Login').controller('LoginCtrl', ['$scope', '$location', 'UserSvc', 'errorMsg', 'localStorageSvc',
    'currenciesRepositorySvc', 'currenciesSvc', 'sessionToken', 'userName',
    function ($scope, $location, UserSvc, errorMsg, localStorageSvc, currenciesRepositorySvc, currenciesSvc,
              sessionToken, userName) {

        $scope.errorMessage = errorMsg;
        $scope.showErrorMessage = false;
        $scope.loginPage = true;
        $scope.login = function(user){

            function loginSuccess(response) {

                if( localStorageSvc.localStorageExists() ){
                    $scope.showErrorMessage = false;
                    localStorageSvc.setItem(sessionToken, response.session_token);
                    localStorageSvc.setItem(userName, $scope.user.username);
                    $location.path('/expenses');
                } else {
                    loginError();
                }
            }

            function loginError(){
                $scope.showErrorMessage = true;
                $scope.user.username = '';
                $scope.user.password = '';
            }

            //We have to use the actions this way
            UserSvc.login({
                'username': user.username,
                'password': user.password
            }, loginSuccess, loginError);
        };
    }]);