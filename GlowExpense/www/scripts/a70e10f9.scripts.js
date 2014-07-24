"use strict";var _mainModules=["Services","Directives","ngRoute","ngResource","Login","Expenses","infinite-scroll","InvoiceExpenseImage"];angular.module("app",_mainModules).config(["$routeProvider","$httpProvider",function(a,b){a.otherwise({redirectTo:"/login"});var c=[];c.push({name:"/login",params:{templateUrl:"./scripts/login/views/login.html",controller:"LoginCtrl"}}),c.push({name:"/expenses",params:{templateUrl:"scripts/expenses/views/expenses.html",controller:"ExpensesListCtrl"}}),c.push({name:"/invoice-expense-image",params:{templateUrl:"scripts/invoice_expense_image/views/invoice-image-details.html",controller:"InvoiceImageCtrl"}}),c.push({name:"/add-expense",params:{templateUrl:"scripts/expenses/views/add-expense.html",controller:"AddExpenseCtrl"}}),c.push({name:"/edit-expense",params:{templateUrl:"scripts/expenses/views/editExpense.html",controller:"EditExpensesCtrl"}}),c.push({name:"/sendexpenses",params:{templateUrl:"scripts/expenses/views/send-expenses-report.html",controller:"ExpensesCtrl"}}),c.forEach(function(b){a.when(b.name,b.params)});var d,e=["$q","$injector",function(a,b){function c(a){return d=d||b.get("$http"),d.pendingRequests.length<1&&(f=f||b.get("requestNotificationChannelSvc"),f.requestEnded()),a}function e(c){return d=d||b.get("$http"),d.pendingRequests.length<1&&(f=f||b.get("requestNotificationChannelSvc"),f.requestEnded()),a.reject(c)}var f;return function(a){return f=f||b.get("requestNotificationChannelSvc"),f.requestStarted(),a.then(c,e)}}];b.responseInterceptors.push(e)}]).run(["currenciesRepositorySvc","currenciesSvc",function(a,b){a.getCurrencies().$promise.then(function(a){b.set(a.currencies)})}]),angular.module("Login",["ngResource"]).config(function(){}).constant("errorMsg","Please try again! Username or password is wrong!").constant("loginUrl","https://esb.dev.corp.globant.com/system/login").constant("loginUrlMockWeb","http://127.0.0.1:8080/service/login").constant("loginUrlMockEmulate","http://10.0.3.2:8080/service/login").constant("loginUrlMockEmulateWebMocky","http://www.mocky.io/v2/53bfa053ea38ea64070472b2"),angular.module("Login").factory("UserSvc",["$resource","loginUrlMockEmulate",function(a,b){return a(b,{},{})}]),angular.module("Expenses",[]).config(function(){}).constant("defaultMode","_DEFAULT_").constant("selectMode","_SELECT_").constant("selectModeActivated","_SELECT_MODE_ACTIVATED").constant("detailsModeActivated","_DETAILS_MODE_ACTIVATED").constant("addExpenseErrorMsg","Please complete all fields!").constant("expensesUrl","https://esb.dev.corp.globant.com/expense/:image").constant("expensesUrlMockWeb","http://127.0.0.1:8080/service/expense/:image").constant("expensesUrlMockEmulate","http://10.0.3.2:8080/service/expense/:image").constant("expensesUrlMockEmulateWebMocky","http://www.mocky.io/v2/53bfa698ea38eada070472b5").constant("editExpensesUrlMockEmulateWebMocky","http://www.mocky.io/v2/53bfa698ea38eada070472b5"),angular.module("InvoiceExpenseImage",[]).config(function(){}),angular.module("Login").controller("LoginCtrl",["$scope","$location","UserSvc","errorMsg",function(a,b,c,d){a.errorMessage=d,a.showErrorMessage=!1,a.login=function(d){var e=new c;e.username=d.username,e.password=d.password,e.$save().then(function(c){a.showErrorMessage=!1,window.localStorage&&localStorage.setItem("session-token",c.session_token),b.path("/expenses")},function(){a.showErrorMessage=!0,a.user.username="",a.user.password=""})}}]),angular.module("Expenses").controller("ExpensesListCtrl",["$scope","$filter","$location","expenseSvc","expensesBufferingSvc","defaultMode","selectMode","expensesRequestNotificationChannelSvc",function(a,b,c,d,e,f,g,h){function i(b,c){a.expenses=l(a.expenses,b,c)}var j=f,k=!0;a.expenses=[],a.searchedExpense={},a.showSorting=!1,a.reverseSorting=!0,a.showSearch=!1,a.showDeleteMode=!1,a.addExpense=function(){c.path("/add-expense")},a.showInvoiceImage=function(){c.path("/invoice-expense-image")},a.editExpense=function(){c.path("/edit-expense")},a.selectMode=function(){return j===g},a.select=function(){},a.getMoreExpenses=function(){return k?void(k=!1):void e.getMoreExpenses(a).then(function(b){b.forEach(function(b){a.expenses.push(d.getExpense(a,b))})})},a.enableSorting=function(){a.showSorting=!0},a.sort=function(b){a.reverseSorting=b,i("date",b),a.showSorting=!1},a.toggleSearching=function(b){a.showSearch=b},a.toggleSelectMode=function(a){a?(j=g,h.activateSelectMode()):j=f};var l=b("orderBy");e.getExpenses(a).then(function(b){b.forEach(function(b){a.expenses.push(b)})})}]),angular.module("Expenses").controller("ExpensesListSelectCtrl",["$scope",function(a){a.test="test"}]),angular.module("Expenses").controller("AddExpenseCtrl",["$scope","$location","addExpenseErrorMsg",function(a,b,c){a.errorMessage=c,a.showErrorMessage=!1,a.imageSelectedPath="",a.goBack=function(){b.path("/expenses")},a.date=new Date,a.takePhoto=function(){function b(b){a.imageSelectedPath=b}function c(a){alert("Failed because: "+a)}navigator.camera.getPicture(b,c,{quality:50,destinationType:Camera.DestinationType.FILE_URI,targetWidth:50,targetHeight:50})}}]),angular.module("InvoiceExpenseImage").controller("InvoiceImageCtrl",["$scope","expensesRepositorySvc",function(a,b){b.getImage({},{image:"image"}).$promise.then(function(b){a.invoiceImage=b.invoiceImage})}]),angular.module("AppConfig",[]).constant("foo","stagingFoo"),angular.module("Services",[]).config(function(){}).constant("currenciesUrl","https://esb.dev.corp.globant.com/currency").constant("currenciesUrlMockWeb","http://127.0.0.1:8080/service/currencies"),angular.module("Services").service("cordovaService",["$document","$q",function(a,b){var c=b.defer(),d=!1;this.ready=c.promise,document.addEventListener("deviceready",function(){d=!0,c.resolve(window.cordova)}),setTimeout(function(){d||window.cordova&&c.resolve(window.cordova)},3e3)}]),angular.module("Services").factory("requestNotificationChannelSvc",["$rootScope",function(a){var b="_START_REQUEST_",c="_END_REQUEST_",d=function(){a.$broadcast(b)},e=function(){a.$broadcast(c)},f=function(a,c){a.$on(b,function(){c()})},g=function(a,b){a.$on(c,function(){b()})};return{requestStarted:d,requestEnded:e,onRequestStarted:f,onRequestEnded:g}}]),angular.module("Services").factory("currenciesRepositorySvc",["$resource","currenciesUrlMockWeb",function(a,b){return a(b,{},{getCurrencies:{method:"GET",isArray:!1}})}]),angular.module("Services").factory("currenciesSvc",[function(){function a(){return c}function b(a){c=a}var c=[];return{get:a,set:b}}]),angular.module("Expenses").factory("expenseSvc",["expensesRequestNotificationChannelSvc","currenciesSvc",function(a,b){function c(c,d){function e(){var a=b.get();a.some(function(a){return a.id===i.originalCurrencyId?(i.currency=a,!0):void 0}),!i.currency}function f(){i.showDetails=!1}function g(a,b){i.expenseId!==a&&(b?(i.showDetails=!1,i.enabled=!1):i.enabled=!0)}function h(){e(),a.onSelectModeActivated(c,f),a.onDetailsModeActivated(c,g)}var i=this;i.expenseId=d.expenseId,i.title=d.title,i.expenseId=d.expenseId,i.submiter=d.submiter,i.owner=d.owner,i.description=d.description,i.invoiceNumber=d.invoiceNumber,i.date=d.date,i.originalCurrencyId=d.originalCurrencyId,i.originalAmount=d.originalAmount,i.exchangeRate=d.exchangeRate,i.imageType=d.imageType,i.currency=null,i.showDetails=!1,i.selected=!1,i.enabled=!0,h()}function d(a,b){return new c(a,b)}return c.prototype.toggleDetails=function(){this.enabled&&(this.selected=!1,this.showDetails=!this.showDetails,a.activateDetailsMode(this.expenseId,this.showDetails))},c.prototype.toggleSelect=function(){this.enabled&&!this.showDetails&&(this.selected=!this.selected)},{getExpense:d}}]),angular.module("Expenses").factory("expensesBufferingSvc",["expensesRepositorySvc","$q","expenseSvc",function(a,b,c){function d(d){var e=b.defer();return a.getExpenses().$promise.then(function(a){f=a.expenses.map(function(a){return c.getExpense(d,a)}),f=f.splice(0,3),e.resolve(f)}),e.promise}function e(a){var c=b.defer();return f.length>0?(g=f.splice(0,5),c.resolve(g)):d(a).then(function(a){c.resolve(a)}),c.promise}var f=[],g=[];return{getExpenses:d,getMoreExpenses:e}}]),angular.module("Expenses").factory("expensesRepositorySvc",["$resource","expensesUrlMockEmulate",function(a,b){return a(b,{image:"@image"},{getExpenses:{method:"GET",isArray:!1},getImage:{method:"GET",isArray:!1}})}]),angular.module("Expenses").factory("expensesRequestNotificationChannelSvc",["$rootScope","selectModeActivated","detailsModeActivated",function(a,b,c){var d=function(){a.$broadcast(b)},e=function(a,c){a.$on(b,function(){c()})},f=function(b,d){a.$broadcast(c,{expenseId:b,isAnotherExpenseOpened:d})},g=function(a,b){a.$on(c,function(a,c){b(c.expenseId,c.isAnotherExpenseOpened)})};return{activateSelectMode:d,onSelectModeActivated:e,activateDetailsMode:f,onDetailsModeActivated:g}}]),angular.module("Filters",[]).config(function(){}),angular.module("Directives",[]).config(function(){}),angular.module("Directives").directive("loading",["requestNotificationChannelSvc",function(a){return{restrict:"E",replace:!0,template:'<div class="msg errorMsg loader"><img src="resources/images/ajax-loader.gif" />LOADING...</div>',link:function(b,c){c.hide();var d=function(){c.show()},e=function(){c.hide()};a.onRequestStarted(b,d),a.onRequestEnded(b,e)}}}]),angular.module("Directives").directive("stopEvent",function(){return{restrict:"A",link:function(a,b,c){b.bind(c.stopEvent,function(a){a.stopPropagation()})}}}),angular.module("Directives").directive("backButton",function(){return{restrict:"A",link:function(a,b){b.on("click",function(){history.back()})}}});