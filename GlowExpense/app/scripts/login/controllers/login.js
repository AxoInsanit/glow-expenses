'use strict';
angular.module('Login').controller('LoginCtrl', ['$scope', '$location', 'UserSvc', 'errorMsg', 'localStorageSvc',
    'currenciesRepositorySvc', 'currenciesSvc', 'contableCodesRepositorySvc', 'contableCodesSvc', 'sessionToken',
    'userName', 'errorHandlerDefaultSvc', 'expenseSharingSvc',
    function ($scope, $location, UserSvc, errorMsg, localStorageSvc, currenciesRepositorySvc, currenciesSvc,
              contableCodesRepositorySvc, contableCodesSvc, sessionToken, userName, errorHandlerDefaultSvc, expenseSharingSvc) {

        $scope.errorMessage = errorMsg;
        $scope.showErrorMessage = false;
        $scope.loginPage = true;
        $scope.login = function(user){

            function getCurrenciesSuccess(result){
                currenciesSvc.set(result.currencies);
            }

            function getContableCodesSuccess(result){
                contableCodesSvc.set(result.contableCodes);
            }

            function loginSuccess(response) {
                if( localStorageSvc.localStorageExists() ){
                    $scope.showErrorMessage = false;
                    localStorageSvc.setItem(sessionToken, response.session_token);
                    localStorageSvc.setItem(userName, $scope.user.username);

                    currenciesRepositorySvc.getCurrencies(
                        { 'token': localStorageSvc.getItem(sessionToken) },
                        getCurrenciesSuccess,
                        errorHandlerDefaultSvc.handleError
                    );

                    contableCodesRepositorySvc.getContableCodes(
                        { 'token': localStorageSvc.getItem(sessionToken) },
                        getContableCodesSuccess(),
                        errorHandlerDefaultSvc.handleError
                    );

                    expenseSharingSvc.getExpenses().then(function(){
                        $location.path('/expenses');
                    });

                } else {
                    loginError();
                }
            }

            function loginError(errorResponse){
                errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
                    $scope.showErrorMessage = true;
                    $scope.user.password = '';
                });
            }

            //We have to use the actions this way
            UserSvc.login({
                'username': user.username,
                'password': user.password
            }, loginSuccess, loginError);
        };
    }]);
