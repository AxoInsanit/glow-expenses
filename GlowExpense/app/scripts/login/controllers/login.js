'use strict';

angular.module('Login')
  .controller('LoginCtrl', function ($scope, $location, UserSvc, errorMsg, localStorageSvc,
                                                          currenciesRepositorySvc, currenciesSvc, sessionToken,
                                                          userName, errorHandlerDefaultSvc, expenseSharingSvc,
                                                          requestNotificationChannelSvc) {

      function getExpenses() {
        expenseSharingSvc.getExpenses().then(function() {
          $location.path('/expenses');
        }).finally(function() {
          requestNotificationChannelSvc.requestEnded();
        });
      }

      $scope.login = function(){
          var sessionToken = localStorageSvc.getItem('session-token');
          function getCurrenciesSuccess(result){
              currenciesSvc.set(result.currencies);
          }

          // start loader
          requestNotificationChannelSvc.requestStarted();

          if (sessionToken) {
            getExpenses();
          } else {
            // init login flow
            UserSvc.login().then(function (sessionToken) {
              if (localStorageSvc.localStorageExists()) {
                $scope.showErrorMessage = false;
                localStorageSvc.setItem('session-token', sessionToken);

                currenciesRepositorySvc.getCurrencies(
                  { 'token': sessionToken },
                  getCurrenciesSuccess,
                  errorHandlerDefaultSvc.handleError
                );
                
                getExpenses();

              } else {
                requestNotificationChannelSvc.requestEnded();
              }
            }, function (){
              errorHandlerDefaultSvc.handleError({});
              requestNotificationChannelSvc.requestEnded();
            });
          }

      };
  });