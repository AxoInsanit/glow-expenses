"use strict";var _mainModules=["Services","Directives","ngRoute","ngResource","ngAnimate","ngTouch","pasvaz.bindonce","Header","Login","Expenses","Reports","infinite-scroll","InvoiceExpenseImage","Api","Modals","ui.bootstrap"];angular.module("app",_mainModules).config(["$routeProvider","$httpProvider",function(a,b){a.otherwise({redirectTo:"/login"});var c=[];c.push({name:"/login",params:{templateUrl:"./scripts/login/views/login.html",controller:"LoginCtrl"}}),c.push({name:"/expenses",params:{templateUrl:"scripts/expenses/views/expenses.html",controller:"ExpensesListCtrl"}}),c.push({name:"/invoice-expense-image",params:{templateUrl:"scripts/invoice_expense_image/views/invoice-image-details.html",controller:"InvoiceImageCtrl"}}),c.push({name:"/add-expense",params:{templateUrl:"scripts/expenses/views/add-edit-expense.html",controller:"AddExpenseCtrl"}}),c.push({name:"/edit-expense",params:{templateUrl:"scripts/expenses/views/add-edit-expense.html",controller:"EditExpenseCtrl"}}),c.push({name:"/reports",params:{templateUrl:"scripts/reports/views/reports-list.html",controller:"ReportsListCtrl"}}),c.push({name:"/create-report",params:{templateUrl:"scripts/reports/views/create-edit-report.html",controller:"CreateEditReportCtrl"}}),c.push({name:"/edit-report",params:{templateUrl:"scripts/reports/views/create-edit-report.html",controller:"CreateEditReportCtrl"}}),c.push({name:"/report-details",params:{templateUrl:"scripts/reports/views/report-details.html",controller:"ReportDetailsCtrl"}}),c.push({name:"/settings",params:{templateUrl:"scripts/expenses/views/settings.html",controller:"LoginCtrl"}}),c.forEach(function(b){a.when(b.name,b.params)});var d,e=["$q","$injector",function(a,b){function c(a){return d=d||b.get("$http"),d.pendingRequests.length<1&&(f=f||b.get("requestNotificationChannelSvc"),f.requestEnded()),a}function e(c){return d=d||b.get("$http"),d.pendingRequests.length<1&&(f=f||b.get("requestNotificationChannelSvc"),f.requestEnded()),a.reject(c)}var f;return function(a){return f=f||b.get("requestNotificationChannelSvc"),f.requestStarted(),a.then(c,e)}}];b.responseInterceptors.push(e)}]).constant("serverErrorMsg","Server error!").constant("sessionToken","session-token").run(["currenciesRepositorySvc","currenciesSvc","errorHandlerDefaultSvc",function(a,b,c){function d(a){b.set(a.currencies)}a.getCurrencies({},d,c.handleError)}]),angular.module("Login",["ngResource"]).config(function(){}).constant("errorMsg","Please try again! Username or password is wrong!").constant("userName","userName"),angular.module("Login").factory("UserSvc",["$resource","baseUrlMockeyWeb","loginUrl",function(a,b,c){return a(b+c,{},{login:{method:"POST"}})}]),angular.module("Header",[]).config(function(){}).constant("loginPath","/login"),angular.module("Expenses",[]).config(function(){}).constant("addExpenseErrorMsg","Please complete all fields!").constant("addExpensesTitle","Create Expenses").constant("addExpensesButtonLabel","Create").constant("editExpensesTitle","Edit Expense").constant("editExpensesButtonLabel","Save").constant("reportEntity","Expense").constant("reportable","REPORTABLE").constant("reportEntityName","report"),angular.module("Reports",[]).config(function(){}).constant("addReportErrorMsg","Please complete all fields!").constant("entityName","Report").constant("reportDetailsPath","/report-details").constant("reportsPath","/reports").constant("editExpensePath","/edit-expense").constant("projectEntityName","project").constant("createReportTitle","Create Report").constant("editReportTitle","Edit Report").constant("createReportBtnLabel","Create").constant("editReportBtnLabel","Save").constant("projectAssigned","Project Assigned").constant("allProjects","All Projects"),angular.module("InvoiceExpenseImage",[]).config(function(){}),angular.module("Api",[]).config(function(){}).constant("baseUrl","https://esb.dev.corp.globant.com").constant("baseUrlMockeyWeb","http://esb.dev.corp.globant.com:8080").constant("loginUrl","/system/login").constant("expensesUrl","/expense/:image").constant("currenciesUrl","/currency").constant("expenseTypesUrl","/expenseTypes").constant("reportsUrl","/expense/report").constant("projectsUrl","/project").constant("imagesUrl","/image").constant("reportExpensesUrl","/expense/report/expenses").constant("expensesPath","/expenses").constant("reportsPath","/reports"),angular.module("Modals",[]).config(function(){}),angular.module("Header").controller("HeaderCtrl",["$scope","$location","$modal","editModeNotificationChannelSvc","signOutDialogSvc",function(a,b,c,d,e){a.isEditMode=!1,a.isActive=function(a){return a===b.path()},a.openEditMode=function(){a.isEditMode=!a.isEditMode,d.toggleEditMode(a.isEditMode)},a.signOut=function(){e.open().then(function(a){b.path(a)})}}]),angular.module("Login").controller("LoginCtrl",["$scope","$location","UserSvc","errorMsg","localStorageSvc","currenciesRepositorySvc","currenciesSvc","sessionToken","userName","errorHandlerDefaultSvc",function(a,b,c,d,e,f,g,h,i,j){a.errorMessage=d,a.showErrorMessage=!1,a.loginPage=!0,a.login=function(d){function f(c){e.localStorageExists()?(a.showErrorMessage=!1,e.setItem(h,c.session_token),e.setItem(i,a.user.username),b.path("/expenses")):g()}function g(b){j.handleError(b).then(function(){a.showErrorMessage=!0,a.user.username="",a.user.password=""})}c.login({username:d.username,password:d.password},f,g)}}]),angular.module("Expenses").controller("AddEditExpenseCtrl",["$scope","$location","expensesRepositorySvc","addExpenseErrorMsg","$modal","currenciesSvc","reportsSharingSvc","currencySelectDialogSvc",function(a,b,c,d,e,f,g,h){a.errorMessage=d,a.currencies=f.get(),a.selectCurrency=function(b){h.open(b,a.currencies).then(function(b){a.expense.currency=b})}}]),angular.module("Expenses").controller("ExpensesListCtrl",["$scope","$location","cameraSvc","expensesBufferingSvc","expenseSvc","expenseSharingSvc","editModeNotificationChannelSvc","reportsSharingSvc",function(a,b,c,d,e,f,g,h){function i(b){a.isEditMode=b}a.expenses=[],a.isEditMode=!1,g.onEditModeToggled(a,i),a.getMoreExpenses=function(){d.getMoreExpenses().then(function(b){b.forEach(function(b){a.expenses.push(e.getExpense(b))})})},a.goToReports=function(){b.path("/reports")},d.getExpenses().then(function(b){b.forEach(function(b){a.expenses.push(b)}),f.setExpenses(a.expenses)}),a.takePhoto=function(b){a.isEditMode||c.takePhoto().then(function(){b.imageType="jpg"})},a.editExpense=function(c){a.isEditMode||(f.setExpenseForEdit(c),h.setReport(),b.path("/edit-expense"))}}]),angular.module("Expenses").controller("EditExpenseCtrl",["$scope","$location","editExpensesTitle","editExpensesButtonLabel","expenseSharingSvc","cameraSvc","reportsRepositorySvc","currencySelectDialogSvc","expensesRepositorySvc","editSaveExpenseDialogSvc","expenseViewImageSvc","reportsSharingSvc","reportEntityName","filterReportByStateSvc","itemsSelectionDialogSvc","reportExpensesRepositorySvc","localStorageSvc","sessionToken","reportDetailsPath","expensesPath","invoiceImageRepositorySvc","errorHandlerDefaultSvc",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v){function w(b){a.imageSelectedPath=b.invoiceImage}function x(a){v.handleError(a).then(function(){A()})}function y(){l.setReport(a.report),b.path(s)}function z(a){v.handleError(a).then(function(){A()})}function A(){a.expense=angular.copy(B)}a.title=c,a.buttonLabel=d,a.showErrorMessage=!1,a.showServerErrorMessage=!1,a.expense=e.getExpenseForEdit();var B=angular.copy(a.expense);a.report=l.getReport();var C=a.report.description;a.imageSelectedPath="","void"!==a.expense.imageType&&(u.getImage({},w,x),a.imageSelectedPath="image");var D={expenseReportId:a.report.expenseReportId,expenseIds:[a.expense.expenseId]};a.save=function(c,d){function e(){function c(){p.addExpensesToReport(D,y,z)}function d(a){v.handleError(a).then(function(){A()})}!C&&a.report.description?p.addExpensesToReport(D,y,z):C!==a.report.description?p.deleteExpense({token:q.setItem(r),expenseId:a.expense.expenseId},c,d):a.report.description?y():b.path(t),j.openSuccessEditExpenseDialog(a.report.description).then(function(a){b.path(a)})}function f(a){v.handleError(a).then(function(){A()})}c.$valid?(d.date=a.expense.date,i.saveExpense(d,e,f)):a.showErrorMessage=!0},a.selectReport=function(){l.getReports().then(function(b){a.reports=b.filter(n.checkIfInState),o.open(a.reports,m).then(function(b){b&&(a.report=b)})})},a.date=a.expense.date,a.isEdit=!0,a.cancelPhoto=function(){a.imageSelectedPath=""},a.takePhoto=function(){f.takePhoto().then(function(b){a.imageSelectedPath=b})},a.viewImage=function(){k.open().then(function(){a.takePhoto()},{})}}]),angular.module("Expenses").controller("AddExpenseCtrl",["$scope","$location","addExpensesTitle","addExpensesButtonLabel","reportsSharingSvc","expensesRepositorySvc","editSaveExpenseDialogSvc","getIdFromLocationSvc","reportExpensesRepositorySvc","errorDialogSvc","errorMessageSvc","errorHandlerDefaultSvc",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(c,d){function e(){g.openSuccessSaveExpenseDialog().then(function(a){b.path(a)})}var f=d(),j=h.getIdFromLocation(f.Location);i.addExpensesToReport({expenseReportId:a.report.expenseReportId,expenseIds:[j]},e,l.handleError)}a.title=c,a.buttonLabel=d,a.showErrorMessage=!1,a.expense={},a.report=e.getReport(),a.save=function(b,c){b.$valid?(c.date=new Date,f.createExpense({token:localStorage.getItem("session-token")},c,m,l.handleError)):a.showErrorMessage=!0}}]),angular.module("Modals").factory("editSaveExpenseDialogSvc",["$modal","expensesPath","reportsPath","reportDetailsPath",function(a,b,c,d){function e(d){var e=a.open({templateUrl:"scripts/modals/views/edit-expense-dialog.html",controller:["$scope","$modalInstance",function(a,e){a.reportName=d,a.navigateToReports=function(){e.close(c)},a.navigateToExpensesList=function(){e.close(b)}}]});return e.result.then(function(a){return a})}function f(){var b=a.open({templateUrl:"scripts/modals/views//save-expense-dialog.html",controller:["$scope","$modalInstance",function(a,b){a.navigateToReport=function(){b.close(d)}}]});return b.result.then(function(a){return a})}return{openSuccessEditExpenseDialog:e,openSuccessSaveExpenseDialog:f}}]),angular.module("Modals").factory("expenseReportsDialogSvc",["$modal","reportsSharingSvc","filterReportByStateSvc",function(a,b,c){function d(){var d=a.open({templateUrl:"scripts/modals/views/expense-reports-dialog.html",controller:["$scope","$modalInstance",function(a,d){a.reports=[],a.searchedReport=null,b.getReports().then(function(b){a.reports=b.filter(c.checkIfInState)}),a.selectReport=function(a){d.close(a)}}]});return d.result.then(function(a){return a})}return{open:d}}]),angular.module("Modals").factory("sendReportDialogSvc",["$modal",function(a){function b(b){var c=a.open({templateUrl:"scripts/modals/views/send-report-dialog.html",controller:["$scope","$modalInstance",function(a,c){a.reportName=b,a.ok=function(){c.close("ok")}}]});return c.result.then(function(a){return a})}return{open:b}}]),angular.module("Reports").controller("ReportsListCtrl",["$scope","$location","reportsSharingSvc","editModeNotificationChannelSvc","reportsRepositorySvc","filterReportByStateSvc","entityName","confirmDeleteDialogSvc","reportDetailsPath","sessionToken","errorHandlerDefaultSvc",function(a,b,c,d,e,f,g,h,i,j,k){function l(b){a.isEditMode=b}c.getReports().then(function(b){a.reports=b}),a.isEditMode=!1,d.onEditModeToggled(a,l),a.createReport=function(){c.setReport(),b.path("/create-report")},a.deleteReport=function(b){function c(){a.reports=a.reports.filter(function(a){return a.expenseReportId!==b.expenseReportId})}h.open(g).then(function(){e.deleteReport({expenseReportId:b.expenseReportId},c,k.handleError)})},a.viewReport=function(d){a.isEditMode||d.locked||!f.checkIfInState(d)||(c.setReport(d),b.path(i))},a.goToExpenses=function(){b.path("/expenses")}}]),angular.module("Reports").controller("ReportDetailsCtrl",["$scope","$location","addReportErrorMsg","reportsSharingSvc","reportExpensesSvc","expenseSharingSvc","expensesRepositorySvc","expensesBufferingSvc","confirmDeleteDialogSvc","entityName","sendReportDialogSvc","editExpensePath","expenseSvc","editModeNotificationChannelSvc",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){a.errorMessage=c,a.showErrorMessage=!1,a.expenses=[],a.isEditMode=!1,a.report=d.getReport(),a.report.expenseIds=[],h.getExpenses(a.report.expenseReportId).then(function(b){b.forEach(function(b){a.expenses.push(b),a.report.expenseIds.push(b.expenseId)})}),a.openEditMode=function(){a.isEditMode=!a.isEditMode,n.toggleEditMode(a.isEditMode)};var o=!0;a.getMoreExpenses=function(){return o?void(o=!1):void h.getMoreExpenses(a).then(function(b){b.forEach(function(b){a.expenses.push(m.getExpense(a,b))})})},a.sendReport=function(){k.open(a.report.description)},a.editExpense=function(c){a.isEditMode||(f.setExpenseForEdit(c),d.setReport(a.report),b.path(l))}}]),angular.module("Reports").controller("CreateEditReportCtrl",["$scope","$location","addReportErrorMsg","reportsSharingSvc","reportsRepositorySvc","itemsSelectionDialogSvc","projectsSharingSvc","projectEntityName","projectAssigned","allProjects","serverErrorMsg","editReportTitle","editReportBtnLabel","createReportTitle","createReportBtnLabel","reportsPath","expenseSharingSvc","errorHandlerDefaultSvc",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){a.projectAssigned=i,a.allProjects=j,a.errorMessage=c,a.showErrorMessage=!1;var s=[],t=d.getReport();t.expenseReportId?(a.report=t,a.title=l,a.buttonLabel=m,s=a.report.expenseIds):(a.report={},a.title=n,a.buttonLabel=o,s=q.getExpenseIdsForReportAssign()),a.save=function(c,d){function f(){b.path(p)}function h(b){r.handleError(b).then(function(){a.showErrorMessage=!1})}if(c.$valid){var i=g.getProjectIdByName(d.project.name),j={expenseReportId:d.expenseReportId,description:d.description,applyTo:d.project.name,entityId:i,expenseIds:s};a.report?e.saveReport(j,f,h):e.createReport(j,f,h)}else a.showErrorMessage=!0},a.selectProject=function(){g.getProjects().then(function(b){f.open(b,h).then(function(b){b&&(a.report.project=b)})})}}]),angular.module("InvoiceExpenseImage").controller("InvoiceImageCtrl",["$scope","invoiceImageRepositorySvc","errorHandlerDefaultSvc",function(a,b,c){function d(b){a.invoiceImage=b.invoiceImage}a.viewImage=!1,a.tabImage=function(){a.viewImage=!a.viewImage},b.getImage({},d,c.handleError)}]),angular.module("AppConfig",[]).constant("foo","stagingFoo"),angular.module("Services",[]).config(function(){}).constant("editModeToggled","TOGGLE_EDIT_MODE").constant("reportAssigned","REPORT_ASSIGNED").constant("expenseEdited","EXPENSE_EDITED").constant("unauthorized","Wrong username or password!").constant("badRequest","Invalid parameters!").constant("notFound","The requested resource is not available!").constant("generalError","An error has occured!"),angular.module("Services").factory("localStorageSvc",[function(){function a(){return window.localStorage}function b(a,b){localStorage.setItem(a,b)}function c(a){return localStorage.getItem(a)}return{localStorageExists:a,setItem:b,getItem:c}}]),angular.module("Services").factory("requestNotificationChannelSvc",["$rootScope",function(a){var b="_START_REQUEST_",c="_END_REQUEST_",d=function(){a.$broadcast(b)},e=function(){a.$broadcast(c)},f=function(a,c){a.$on(b,function(){c()})},g=function(a,b){a.$on(c,function(){b()})};return{requestStarted:d,requestEnded:e,onRequestStarted:f,onRequestEnded:g}}]),angular.module("Services").factory("editModeNotificationChannelSvc",["$rootScope","editModeToggled",function(a,b){var c=function(a,c){a.$on(b,function(a,b){c(b.isEditMode)})},d=function(c){a.$broadcast(b,{isEditMode:c})};return{onEditModeToggled:c,toggleEditMode:d}}]),angular.module("Modals").factory("expenseViewImageSvc",["$modal","$location",function(a,b){function c(){var c=a.open({templateUrl:"scripts/modals/views/expense-view-image.html",controller:["$scope","$modalInstance",function(a,c){a.profileName=localStorage.getItem("userName"),a.selectNew=function(){c.close()},a.view=function(){b.path("/invoice-expense-image"),c.dismiss()}}]});return c.result.then(function(a){return a})}return{open:c}}]),angular.module("Modals").factory("confirmDeleteDialogSvc",["$modal",function(a){function b(b){var c=a.open({templateUrl:"scripts/modals/views/confirm-delete-dialog.html",controller:["$scope","$modalInstance",function(a,c){a.entityName=b,a.ok=function(){c.close("true")},a.cancel=function(){c.dismiss("false")}}]});return c.result.then(function(a){return a})}return{open:b}}]),angular.module("Modals").factory("currencySelectDialogSvc",["$modal",function(a){function b(b,c){var d=a.open({templateUrl:"scripts/modals/views/currency-select-dialog.html",controller:["$scope","$modalInstance",function(a,d){a.currencies=c,b&&a.currencies.forEach(function(a){a.selected=b.id===a.id?!0:!1}),a.select=function(a){b&&(b.selected=!1),a.selected=!0,d.close(a)}}]});return d.result.then(function(a){return a})}return{open:b}}]),angular.module("Services").factory("filterReportByStateSvc",[function(){function a(a){var c=b.indexOf(a.state)>-1;return c}var b=["Draft Expense","Rejected by Finance","Rejected by Manager","Rejected to Submitter"];return{checkIfInState:a}}]),angular.module("Modals").factory("signOutDialogSvc",["$modal","loginPath",function(a,b){function c(){var c=a.open({templateUrl:"scripts/modals/views/sign-out-dialog.html",controller:["$scope","$modalInstance",function(a,c){a.profileName=localStorage.getItem("userName"),a.ok=function(){c.close(b)}}]});return c.result.then(function(a){return a})}return{open:c}}]),angular.module("Modals").factory("itemsSelectionDialogSvc",["$modal",function(a){function b(b,c){var d=a.open({templateUrl:"scripts/modals/views/items-selection-dialog.html",controller:["$scope","$modalInstance",function(a,d){a.entities=b,a.searchedEntity=null,a.selectedEntity=null,a.entityName=c,a.selectEntity=function(b){a.selectedEntity=b},a.close=function(){d.close(a.selectedEntity)}}]});return d.result.then(function(a){return a})}return{open:b}}]),angular.module("Modals").factory("errorDialogSvc",["$modal",function(a){function b(b){var c=a.open({templateUrl:"scripts/modals/views/error-dialog.html",controller:["$scope","$modalInstance",function(a,c){a.errorMessage=b,a.ok=function(){c.close("ok")}}]});return c.result.then(function(a){return a})}return{open:b}}]),angular.module("Services").factory("errorMessageSvc",["unauthorized","badRequest","notFound","generalError",function(a,b,c,d){function e(e){var f=null;switch(e){case 400:f=b;break;case 401:f=a;break;case 404:f=c;break;default:f=d}return f}return{getErrorMessage:e}}]),angular.module("Services").factory("errorHandlerDefaultSvc",["errorDialogSvc","errorMessageSvc",function(a,b){function c(c){var d=b.getErrorMessage(c.status);a.open(d)}return{handleError:c}}]),angular.module("Services").factory("expenseReportStatesSvc",[function(){function a(){return b}var b=["Approved by Finance","Approved by Manager","Approved by Owner","Cancelled Expense","Draft Expense","Paid","Pending Approval","Pending Owner Approval","Preparing Payment","Rejected by Finance","Rejected by Manager","Rejected to Submitter"];return{getReportStates:a}}]),angular.module("Services").factory("currenciesRepositorySvc",["$resource","baseUrlMockeyWeb","currenciesUrl",function(a,b,c){return a(b+c,{},{getCurrencies:{method:"GET",isArray:!1}})}]),angular.module("Services").factory("currenciesSvc",[function(){function a(){return c}function b(a){a.map(function(a){a.selected=!1}),c=a}var c=[];return{get:a,set:b}}]),angular.module("Expenses").factory("reportExpensesSvc",["$resource","baseUrlMockeyWeb","expensesUrl","reportsSharingSvc",function(a,b,c,d){var e=d.getReport().expenseReportId;return a(b+c+"&expenseReportId="+e,{},{getExpenses:{method:"GET",isArray:!1},saveExpense:{method:"POST"},deleteExpense:{method:"DELETE"}})}]),angular.module("Services").factory("expenseTypesRepositorySvc",["$resource","baseUrlMockeyWeb","expenseTypesUrl",function(a,b,c){return a(b+c,{},{getExpenseTypes:{method:"GET",isArray:!1}})}]),angular.module("Services").factory("expenseTypesSvc",[function(){function a(){return c}function b(a){c=a}var c=[];return{get:a,set:b}}]),angular.module("Services").factory("cameraSvc",["$q",function(a){function b(){function b(a){confirm("Upload image to expense?")?d.resolve(a):d.reject()}function c(){alert("Fail"),d.reject()}var d=a.defer();return navigator.camera.getPicture(b,c,{quality:50,targetWidth:100,targetHeight:100,destinationType:Camera.DestinationType.FILE_URI,saveToPhotoAlbum:!1}),d.promise}return{takePhoto:b}}]),angular.module("Services").factory("projectsRepositorySvc",["$resource","baseUrlMockeyWeb","projectsUrl","localStorageSvc","sessionToken",function(a,b,c,d,e){return a(b+c+"?token="+d.getItem(e),{},{getProjects:{method:"GET",isArray:!1}})}]),angular.module("Services").factory("projectsSharingSvc",["$q","projectsRepositorySvc",function(a,b){function c(){function c(a){a.projects.forEach(function(a){a.title=a.client.name+" - "+a.name,e.push(a)}),d.resolve(e)}var d=a.defer();return 0===e.length?b.getProjects({scope:"expense"},c):d.resolve(e),d.promise}function d(a){var b=null;return e.some(function(c){return c.name===a?(b=c.id,!0):void 0}),b}var e=[];return{getProjects:c,getProjectIdByName:d}}]),angular.module("Reports").factory("reportsRepositorySvc",["$resource","baseUrlMockeyWeb","reportsUrl","localStorageSvc","sessionToken",function(a,b,c,d,e){return a(b+c+"?token="+d.getItem(e),{},{getReports:{method:"GET"},createReport:{method:"POST"},saveReport:{method:"PUT"},deleteReport:{method:"DELETE"}})}]),angular.module("Reports").factory("reportsSharingSvc",["$q","reportsRepositorySvc",function(a,b){function c(){function c(a){var b=a.expenses;b.forEach(function(a){a.title=a.description,f.push(a)}),d.resolve(f)}var d=a.defer();return 0===f.length?b.getReports({},c):d.resolve(f),d.promise}function d(){return g}function e(a){g=a||{}}var f=[],g={};return{setReport:e,getReport:d,getReports:c}}]),angular.module("Expenses").factory("expenseSvc",["currenciesSvc","reportable",function(a,b){function c(c){function d(){var b=a.get();b.some(function(a){return a.id===f.originalCurrencyId?(f.currency=a,!0):void 0}),!f.currency}function e(){d()}var f=this;f.expenseId=c.expenseId,f.submiter=c.submiter,f.owner=c.owner,f.description=c.description,f.invoiceNumber=c.invoiceNumber,f.date=c.date,f.originalCurrencyId=c.originalCurrencyId,f.originalAmount=c.originalAmount,f.exchangeRate=c.exchangeRate,f.expenseTypeName=c.type,f.imageType=c.imageType,f.currency=null,f.expenseType=b,f.showDetails=!1,f.selected=!1,f.enabled=!0,e()}function d(a){return new c(a)}return{getExpense:d}}]),angular.module("Expenses").factory("expensesBufferingSvc",["$q","expensesRepositorySvc","expenseSvc","localStorageSvc","sessionToken",function(a,b,c,d,e){function f(f){function g(a){h=a.expenses.map(function(a){return c.getExpense(a)}),h=h.splice(0,4),j.resolve(h)}function i(){j.reject()}var j=a.defer();return b.getExpenses({token:d.getItem(e),expenseReportId:f},g,i),j.promise}function g(){var b=a.defer();return h.length>0?(i=h.splice(0,5),b.resolve(i)):f().then(function(a){b.resolve(a)}),b.promise}var h=[],i=[];return{getExpenses:f,getMoreExpenses:g}}]),angular.module("Expenses").factory("expensesRepositorySvc",["$resource","baseUrlMockeyWeb","expensesUrl",function(a,b,c){return a(b+c,{},{getExpenses:{method:"GET",isArray:!1},getImage:{method:"GET",isArray:!1},createExpense:{method:"POST"},saveExpense:{method:"PUT"},deleteExpense:{method:"DELETE"}})}]),angular.module("Expenses").factory("expenseSharingSvc",[function(){function a(){return e}function b(a){e=a}function c(a){f=a}function d(){return f.forEach(function(a){"void"!==a.imageType&&g.push(a.expenseId)}),g}var e=null,f=[],g=[];return{getExpenseForEdit:a,setExpenseForEdit:b,getExpenseIdsForReportAssign:d,setExpenses:c}}]),angular.module("Services").factory("getIdFromLocationSvc",[function(){function a(a){var b=a.substring(a.lastIndexOf("/")+1);return parseInt(b,10)}return{getIdFromLocation:a}}]),angular.module("Reports").factory("reportExpensesRepositorySvc",["$resource","baseUrlMockeyWeb","reportExpensesUrl","reportsSharingSvc",function(a,b,c){return a(b+c,{},{addExpensesToReport:{method:"POST"},deleteExpense:{method:"DELETE"},saveExpensesToReport:{method:"PUT"}})}]),angular.module("InvoiceExpenseImage").factory("invoiceImageRepositorySvc",["$resource","baseUrlMockeyWeb","imagesUrl","expenseSharingSvc","expensesUrl","localStorageSvc",function(a,b,c,d,e,f){return a(b+e+c+"?expenseId="+d.getExpenseForEdit().expenseId+"&token="+f.getItem("session-token"),{},{getImage:{method:"GET",isArray:!1},saveImage:{method:"POST",isArray:!1}})}]),angular.module("Filters",[]).config(function(){}),angular.module("Directives",[]).config(function(){}),angular.module("Directives").directive("loading",["requestNotificationChannelSvc",function(a){return{restrict:"E",replace:!0,template:'<div class="msg errorMsg loader"><img src="resources/images/ajax-loader.gif" />LOADING...</div>',link:function(b,c){c.hide();var d=function(){c.show()},e=function(){c.hide()};a.onRequestStarted(b,d),a.onRequestEnded(b,e)}}}]),angular.module("Directives").directive("stopEvent",function(){return{restrict:"A",link:function(a,b,c){b.bind(c.stopEvent,function(a){a.stopPropagation()})}}}),angular.module("Directives").directive("backButton",function(){return{restrict:"A",link:function(a,b){b.on("click",function(){history.back();var a=document.getElementsByTagName("body")[0];a.className=a.className+" backAnimation",setTimeout(function(){document.getElementsByTagName("body")[0].className="ng-scope"},1500)})}}}),angular.module("Directives").directive("expensesList",[function(){return{restrict:"E",replace:!0,controller:["$scope","$location","expenseSvc","expensesRepositorySvc","expensesBufferingSvc","confirmDeleteDialogSvc","reportEntity","sessionToken","errorHandlerDefaultSvc",function(a,b,c,d,e,f,g,h,i){a.sort=function(a){return new Date(a.date)},a.deleteExpense=function(b){function c(){a.expenses=a.expenses.filter(function(a){return a.expenseId!==b})}f.open(g).then(function(){d.deleteExpense({expenseId:b,token:localStorage.getItem(h)},c,i.handleError)})},a.showInvoiceImage=function(){b.path("/invoice-expense-image")}}],templateUrl:"scripts/directives/views/expenses-list.html"}}]),angular.module("Directives").directive("currency",function(){function a(a){return angular.isUndefined(a)||""===a||null===a||a!==a}String.prototype.splice=function(a,b,c){return this.slice(0,a)+c+this.slice(a+Math.abs(b))};var b=function(a,b){b=void 0!==b?b:!0;var c=a.toString().split("."),d=c[0],e=c[1];if(d=""===d&&b?"0":d,d=d.replace(/[^\d]/g,""),d.length>3)for(var f=Math.floor(d.length/3);f>0;){var g=d.indexOf(",");0>g&&(g=d.length),g-3>0&&(d=d.splice(g-3,0,",")),f--}if(void 0===e)e=b?".00":"";else{if(b)for(e.length>2&&(e=e.slice(0,2));e.length<2;)e+="0";e="."+e}return[d,e].join("")};return{require:"?ngModel",restrict:"A",link:function(c,d,e,f){c.$watch(function(){return{min:e.min}},function(){f.$setViewValue(f.$viewValue)},!0),c.$watch(function(){return{max:e.max}},function(){f.$setViewValue(f.$viewValue)},!0);var g=function(b){var d=c.$eval(e.min)||0;return!a(b)&&d>b?void f.$setValidity("min",!1):(f.$setValidity("min",!0),b)},h=function(b){var d=c.$eval(e.max)||1/0;return!a(b)&&b>d?void f.$setValidity("max",!1):(f.$setValidity("max",!0),b)};d.bind("keypress",function(a){var b="number"==typeof a.which?a.which:a.keyCode,c=$(this).val(),d=this.selectionStart,e=this.selectionEnd,f=0!==b?String.fromCharCode(b):"",g=e-d,h=c.splice(d,g,f);return 0!==b&&8!==b?String.fromCharCode(b).match(/[^\d.]/g)?void a.preventDefault():0===c.search(/(.*)\.[0-9][0-9]/)&&c.length-3<d?void a.preventDefault():h.split(".").length>2&&46===b?void a.preventDefault():void 0:void 0}),$(d).bind("blur paste",function(){d.val(b($(this).val()))}),$(d).bind("keyup",function(){d.val(b($(this).val(),!1))}),f.$parsers.unshift(b),f.$formatters.unshift(b),f.$parsers.push(g),f.$formatters.push(g),f.$parsers.push(h),f.$formatters.push(h)}}}),angular.module("Directives").directive("floatingDecimal",function(){function a(a){return angular.isUndefined(a)||""===a||null===a||a!==a}var b=function(a,b){b=void 0!==b?b:!0;var c=a.toString().split("."),d=c[0],e=c[1];d=d.replace(/[^\d]/g,""),void 0===e&&(e=b?"00":"");var f=2-e.length,g=0;if(0>f?(e.length>f&&(g=Math.abs(f)),d+=e.slice(0,g),e=e.slice(g)):f>0&&(d.length>f&&(g=d.length-f),e=d.slice(g)+e,d=d.slice(0,g)),d.length>3)for(var h=Math.floor(d.length/3);h>0;){var i=d.indexOf(",");0>i&&(i=d.length),i-3>0&&(d=d.splice(i-3,0,",")),h--}return[d,".",e].join("")};return{require:"?ngModel",restrict:"A",link:function(c,d,e,f){c.$watch(function(){return{min:e.min}},function(){f.$setViewValue(f.$viewValue)},!0),c.$watch(function(){return{max:e.max}},function(){f.$setViewValue(f.$viewValue)},!0);var g=function(b){var d=c.$eval(e.min)||0;return!a(b)&&d>b?void f.$setValidity("min",!1):(f.$setValidity("min",!0),b)},h=function(b){var d=c.$eval(e.max)||1/0;return!a(b)&&b>d?void f.$setValidity("max",!1):(f.$setValidity("max",!0),b)};d.bind("keypress",function(a){var b="number"==typeof a.which?a.which:a.keyCode,c=$(this).val(),d=this.selectionStart,e=this.selectionEnd,f=0!==b?String.fromCharCode(b):"",g=e-d,h=c.splice(d,g,f);return 0!==b&&8!==b?String.fromCharCode(b).match(/[^\d.]/g)?void a.preventDefault():h.split(".").length>2&&46===b?void a.preventDefault():void 0:void 0}),String.prototype.splice=function(a,b,c){return this.slice(0,a)+c+this.slice(a+Math.abs(b))},$(d).bind("blur paste",function(){d.val(b($(this).val()))}),$(d).bind("keyup",function(){d.val(b($(this).val(),!1))}),f.$parsers.unshift(b),f.$formatters.unshift(b),f.$parsers.push(g),f.$formatters.push(g),f.$parsers.push(h),f.$formatters.push(h)}}});