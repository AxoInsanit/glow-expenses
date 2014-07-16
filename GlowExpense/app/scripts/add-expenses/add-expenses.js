'use strict';

angular.module('AddExpenses', [])
  	.config(function () {})
  	.constant('errorMsg', 'Please complete all fields!')
	.constant('addExpensesUrl', 'https://esb.dev.corp.globant.com/system/add-expenses')
	.constant('addExpensesUrlMockWeb', 'http://127.0.0.1:8080/service/add-expenses')
	.constant('addExpensesUrlMockEmulate', 'http://10.0.2.2:8080/service/add-expenses')
	.constant('addExpensesUrlMockEmulateWebMocky', '');