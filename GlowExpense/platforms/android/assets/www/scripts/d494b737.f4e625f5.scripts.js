'use strict';
var _mainModules = [
    'Services',
    'Directives',
    'ngRoute',
    'ngResource',
    'Login',
    'Expenses',
    'AddImage',
    'infinite-scroll'
  ];
angular.module('app', _mainModules).config([
  '$routeProvider',
  '$httpProvider',
  function (a, b) {
    a.otherwise({ redirectTo: '/login' });
    var c = [];
    c.push({
      name: '/login',
      params: {
        templateUrl: './scripts/login/views/login.html',
        controller: 'LoginCtrl'
      }
    }), c.push({
      name: '/expenses',
      params: {
        templateUrl: 'scripts/expenses/views/expenses.html',
        controller: 'ExpensesListCtrl'
      }
    }), c.push({
      name: '/add-image',
      params: {
        templateUrl: 'scripts/add-image/views/add-image.html',
        controller: 'AddImageCtrl'
      }
    }), c.push({
      name: '/addexpenses',
      params: {
        templateUrl: 'scripts/add-expenses/views/add-expenses.html',
        controller: 'AddExpenses'
      }
    }), c.push({
      name: '/sendexpenses',
      params: {
        templateUrl: 'scripts/expenses/views/send-expenses-report.html',
        controller: 'ExpensesCtrl'
      }
    }), c.forEach(function (b) {
      a.when(b.name, b.params);
    });
    var d, e = [
        '$q',
        '$injector',
        function (a, b) {
          function c(a) {
            return d = d || b.get('$http'), d.pendingRequests.length < 1 && (f = f || b.get('requestNotificationChannelSvc'), f.requestEnded()), a;
          }
          function e(c) {
            return d = d || b.get('$http'), d.pendingRequests.length < 1 && (f = f || b.get('requestNotificationChannelSvc'), f.requestEnded()), a.reject(c);
          }
          var f;
          return function (a) {
            return f = f || b.get('requestNotificationChannelSvc'), f.requestStarted(), a.then(c, e);
          };
        }
      ];
    b.responseInterceptors.push(e);
  }
]), angular.module('Login', ['ngResource']).config(function () {
}).constant('loginUrl', 'https://esb.dev.corp.globant.com/system/login').constant('loginUrlMockWeb', 'http://127.0.0.1:8080/service/login').constant('loginUrlMockEmulate', 'http://10.0.2.2:8080/service/login'), angular.module('Login').factory('UserSvc', [
  '$resource',
  'loginUrlMockEmulate',
  function (a, b) {
    return a(b, {}, {});
  }
]), angular.module('Expenses', []).config(function () {
}).constant('defaultMode', '_DEFAULT_').constant('selectMode', '_SELECT_').constant('selectModeActivated', '_SELECT_MODE_ACTIVATED').constant('expensesUrl', 'https://esb.dev.corp.globant.com/expense').constant('expensesUrlMockWeb', 'http://127.0.0.1:8080/service/expense').constant('expensesUrlMockEmulate', 'http://10.0.2.2:8080/service/expense'), angular.module('Login').controller('LoginCtrl', [
  '$scope',
  '$location',
  'UserSvc',
  function (a, b, c) {
    a.errorMessage = 'Please try again! Username or password is wrong!', a.showErrorMessage = !1, a.login = function (d) {
      var e = new c();
      e.username = d.username, e.password = d.password, e.$save().then(function (c) {
        a.showErrorMessage = !1, window.localStorage && localStorage.setItem('session-token', c.session_token), b.path('/expenses');
      }, function () {
        a.showErrorMessage = !0, a.user.username = '', a.user.password = '';
      });
    };
  }
]), angular.module('Expenses').controller('ExpensesListCtrl', [
  '$scope',
  '$filter',
  '$location',
  'expenseSvc',
  'expensesBufferingSvc',
  'defaultMode',
  'selectMode',
  'expensesRequestNotificationChannelSvc',
  function (a, b, c, d, e, f, g, h) {
    function i(b, c) {
      a.expenses = l(a.expenses, b, c);
    }
    var j = f, k = !0;
    a.expenses = [], a.searchedExpense = {}, a.showSorting = !1, a.reverseSorting = !0, a.showSearch = !1, a.showDeleteMode = !1, a.selectMode = function () {
      return j === g;
    }, a.select = function () {
    }, a.toggleExpenseDetails = function (b) {
      a.showDetails = b;
    }, a.getMoreExpenses = function () {
      return k ? void (k = !1) : void e.getMoreExpenses(a).then(function (b) {
        b.forEach(function (b) {
          a.expenses.push(d.getExpense(a, b));
        });
      });
    }, a.enableSorting = function () {
      a.showSorting = !0;
    }, a.sort = function (b) {
      a.reverseSorting = b, i('date', b), a.showSorting = !1;
    }, a.toggleSearching = function (b) {
      a.showSearch = b;
    }, a.toggleSelectMode = function (a) {
      a ? (j = g, h.activateSelectMode()) : j = f;
    }, a.triggerThick = function (a) {
      a.selected = !a.selected;
    }, a.addphoto = function () {
      c.path('/add-image');
    };
    var l = b('orderBy');
    e.getExpenses(a).then(function (b) {
      b.forEach(function (b) {
        a.expenses.push(b);
      });
    });
  }
]), angular.module('Expenses').controller('ExpensesListDefaultCtrl', [
  '$scope',
  '$filter',
  function (a, b) {
    function c(b, c) {
      a.expenses = d(a.expenses, b, c);
    }
    a.showSorting = !1, a.reverseSorting = !0, a.showSearch = !1, a.showDeleteMode = !1, a.enableSorting = function () {
      a.showSorting = !0;
    }, a.sort = function (b) {
      a.reverseSorting = b, c('date', b), a.showSorting = !1;
    }, a.toggleSearching = function (b) {
      a.showSearch = b;
    };
    var d = b('orderBy');
  }
]), angular.module('Expenses').controller('ExpensesListSelectCtrl', [
  '$scope',
  function (a) {
    a.test = 'test';
  }
]), angular.module('AppConfig', []).constant('foo', 'stagingFoo'), angular.module('Services', []).config(function () {
}), angular.module('Services').factory('requestNotificationChannelSvc', [
  '$rootScope',
  function (a) {
    var b = '_START_REQUEST_', c = '_END_REQUEST_', d = function () {
        a.$broadcast(b);
      }, e = function () {
        a.$broadcast(c);
      }, f = function (a, c) {
        a.$on(b, function () {
          c();
        });
      }, g = function (a, b) {
        a.$on(c, function () {
          b();
        });
      };
    return {
      requestStarted: d,
      requestEnded: e,
      onRequestStarted: f,
      onRequestEnded: g
    };
  }
]), angular.module('Expenses').factory('expenseSvc', [
  'expensesRequestNotificationChannelSvc',
  function (a) {
    function b(b, c) {
      function d() {
        a.onSelectModeActivated(b, function () {
          e.showDetails = !1;
        });
      }
      var e = this;
      e.expenseId = c.expenseId, e.submiter = c.submiter, e.owner = c.owner, e.description = c.description, e.invoiceNumber = c.invoiceNumber, e.date = c.date, e.originalCurrencyId = c.originalCurrencyId, e.originalAmount = c.originalAmount, e.exchangeRate = c.exchangeRate, e.imageType = c.imageType, e.showDetails = !1, e.selected = !1, d();
    }
    function c(a, c) {
      return new b(a, c);
    }
    return b.prototype.toggleDetails = function () {
      this.showDetails = !this.showDetails;
    }, b.prototype.toggleSelect = function () {
      this.selected = !this.selected;
    }, { getExpense: c };
  }
]), angular.module('Expenses').factory('expensesBufferingSvc', [
  'expensesRepositorySvc',
  '$q',
  'expenseSvc',
  function (a, b, c) {
    function d(d) {
      var e = b.defer();
      return a.query().$promise.then(function (a) {
        f = a.map(function (a) {
          return c.getExpense(d, a);
        }), f = f.splice(0, 5), e.resolve(f);
      }), e.promise;
    }
    function e(a) {
      var c = b.defer();
      return f.length > 0 ? (g = f.splice(0, 5), c.resolve(g)) : d(a).then(function (a) {
        c.resolve(a);
      }), c.promise;
    }
    var f = [], g = [];
    return {
      getExpenses: d,
      getMoreExpenses: e
    };
  }
]), angular.module('Expenses').factory('expensesRepositorySvc', [
  '$resource',
  'expensesUrlMockEmulate',
  function (a, b) {
    return a(b, {}, {});
  }
]), angular.module('Expenses').factory('expensesRequestNotificationChannelSvc', [
  '$rootScope',
  'selectModeActivated',
  function (a, b) {
    var c = function () {
        a.$broadcast(b);
      }, d = function (a, c) {
        a.$on(b, function () {
          c();
        });
      };
    return {
      activateSelectMode: c,
      onSelectModeActivated: d
    };
  }
]), angular.module('Filters', []).config(function () {
}), angular.module('Directives', []).config(function () {
}), angular.module('Directives').directive('loading', [
  'requestNotificationChannelSvc',
  function (a) {
    return {
      restrict: 'E',
      replace: !0,
      template: '<div class="msg errorMsg loader"><img src="resources/images/ajax-loader.gif" />LOADING...</div>',
      link: function (b, c) {
        c.hide();
        var d = function () {
            c.show();
          }, e = function () {
            c.hide();
          };
        a.onRequestStarted(b, d), a.onRequestEnded(b, e);
      }
    };
  }
]);