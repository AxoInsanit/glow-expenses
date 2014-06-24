/* global app:true */

'use strict';

var app = angular.module('loginSampleApp', ['ngRoute', 'repositoryBaseSvc']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/login'
        });
});
