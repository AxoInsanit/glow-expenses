'use strict';

angular.module('Services', [])
    .config(function () {})
    .constant('currenciesUrl', 'https://esb.dev.corp.globant.com/currency')
    .constant('currenciesUrlMockWeb', 'http://127.0.0.1:8080/service/currencies');
