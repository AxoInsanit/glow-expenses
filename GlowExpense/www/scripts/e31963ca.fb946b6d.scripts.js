'use strict';
var _mainModules = [
    'Services',
    'Directives',
    'ngRoute',
    'ngResource',
    'Login',
    'Expenses'
  ];
angular.module('app', _mainModules).config([
  '$routeProvider',
  function (a) {
    a.otherwise({ redirectTo: '/expenses' });
    var b = [];
    b.push({
      name: '/login',
      params: {
        templateUrl: './scripts/login/views/login.html',
        controller: 'LoginCtrl'
      }
    }), b.push({
      name: '/expenses',
      params: {
        templateUrl: 'scripts/expenses/views/no-expenses.html',
        controller: 'ExpensesCtrl'
      }
    }), b.forEach(function (b) {
      a.when(b.name, b.params);
    });
  }
]), angular.module('Login', ['ngResource']).config(function () {
}), angular.module('Login').factory('UserSvc', [
  '$resource',
  function (a) {
    return a('https://esb.dev.corp.globant.com/system/login', {}, {});
  }
]), angular.module('Expenses', []).config(function () {
}), angular.module('Login').controller('LoginCtrl', [
  '$scope',
  '$location',
  'UserSvc',
  function (a, b, c) {
    a.loading = !1, a.errorMessage = 'Please try again! Username or password is wrong!', a.showErrorMessage = !1, a.login = function (b) {
      a.loading = !0;
      var d = new c();
      d.username = b.username, d.password = b.password, d.$save().then(function (b) {
        a.showErrorMessage = !1, window.localStorage && localStorage.setItem('session-token', b.session_token), a.loading = !1;
      }, function () {
        a.showErrorMessage = !0, a.loading = !1;
      });
    };
  }
]), angular.module('Expenses').controller('ExpensesCtrl', function () {
}), angular.module('AppConfig', []).constant('foo', 'stagingFoo'), angular.module('Services', []).config(function () {
}), angular.module('Filters', []).config(function () {
}), angular.module('Directives', []).config(function () {
}), angular.module('Directives').directive('loading', function () {
  return {
    restrict: 'E',
    replace: !0,
    template: '<div class="msg errorMsg loader"><img src="resources/images/ajax-loader.gif" />LOADING...</div>',
    link: function (a, b) {
      a.$watch('loading', function (a) {
        a ? $(b).show() : $(b).hide();
      });
    }
  };
});