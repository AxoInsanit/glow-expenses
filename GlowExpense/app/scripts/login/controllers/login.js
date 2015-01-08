'use strict';
angular.module('Login')
  .controller('LoginCtrl', function ($scope, $location, UserSvc, errorMsg, localStorageSvc, currenciesRepositorySvc,
                                     currenciesSvc, contableCodesRepositorySvc, contableCodesSvc, sessionToken,
                                     userName, errorHandlerDefaultSvc, expenseSharingSvc, requestNotificationChannelSvc) {

      var savedToken = localStorageSvc.getItem('session-token');

      function getExpenses() {
        expenseSharingSvc.getExpenses().then(function() {
          $location.path('/expenses');
        }).finally(function() {
          requestNotificationChannelSvc.requestEnded();
        });
      }

      function getCurrencies(token) {
          currenciesRepositorySvc.getCurrencies({
                  token: token
              },
              function (result) {
                  currenciesSvc.set(result.currencies);
              },
              errorHandlerDefaultSvc.handleError
          );
      }
      function getContableCodes(token) {
          contableCodesRepositorySvc.getContableCodes({
                  token: token
              },
              function (result) {
                  contableCodesSvc.set(result.contableCodes);
              },
              errorHandlerDefaultSvc.handleError
          );
      }
      
      $scope.login = function() {
          // start loader
          requestNotificationChannelSvc.requestStarted();
                   

          // init login flow
          UserSvc.login().then(function (token) {
              if (localStorageSvc.localStorageExists()) {
                  $scope.showErrorMessage = false;
                  localStorageSvc.setItem(sessionToken, token);

                  getCurrencies(token);
                  getExpenses();
                  getContableCodes(token);

              } else {
                  requestNotificationChannelSvc.requestEnded();
              }
          }, function (){
              errorHandlerDefaultSvc.handleError({});
              requestNotificationChannelSvc.requestEnded();
          });
      };

      // if token exists then proceed
      if (savedToken) {
          getCurrencies(savedToken);
          getExpenses();
          getContableCodes(savedToken);
      }

  });