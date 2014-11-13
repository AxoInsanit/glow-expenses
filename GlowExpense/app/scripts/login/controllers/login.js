'use strict';

angular.module('Login').controller('LoginCtrl', ['$scope', '$location', 'UserSvc', 'errorMsg', 'localStorageSvc',
    'currenciesRepositorySvc', 'currenciesSvc', 'sessionToken', 'userName', 'errorHandlerDefaultSvc', 'expenseSharingSvc',
    function ($scope, $location, UserSvc, errorMsg, localStorageSvc, currenciesRepositorySvc, currenciesSvc,
              sessionToken, userName, errorHandlerDefaultSvc, expenseSharingSvc) {

        $scope.errorMessage = errorMsg;
        $scope.showErrorMessage = false;
        $scope.loginPage = true;
        $scope.login = function(){

            function getCurrenciesSuccess(result){
                currenciesSvc.set(result.currencies);
            }

//            function loginSuccess(response) {
//                if( localStorageSvc.localStorageExists() ){
//                    $scope.showErrorMessage = false;
//                    localStorageSvc.setItem(sessionToken, response.session_token);
//                    localStorageSvc.setItem(userName, $scope.user.username);
//
//                    currenciesRepositorySvc.getCurrencies(
//                        { 'token': localStorageSvc.getItem(sessionToken) },
//                        getCurrenciesSuccess,
//                        errorHandlerDefaultSvc.handleError
//                    );
//
//
//                    expenseSharingSvc.getExpenses().then(function(){
//                        $location.path('/expenses');
//                    });
//
//                } else {
//                    loginError();
//                }
//            }
//
//            function loginError(errorResponse){
//                errorHandlerDefaultSvc.handleError(errorResponse).then(function(){
//                    $scope.showErrorMessage = true;
//                    $scope.user.password = '';
//                });
//            }

            //We have to use the actions this way
            UserSvc.login().then(function (sessionToken) {
                if( localStorageSvc.localStorageExists() ){
                    $scope.showErrorMessage = false;
                    localStorageSvc.setItem('session-token', sessionToken);

                    currenciesRepositorySvc.getCurrencies(
                        { 'token': sessionToken },
                        getCurrenciesSuccess,
                        errorHandlerDefaultSvc.handleError
                    );

                    expenseSharingSvc.getExpenses().then(function(){
                        $location.path('/expenses');
                    });

                }
            }, function (){
              errorHandlerDefaultSvc.handleError({});
            });
        };
    }]);