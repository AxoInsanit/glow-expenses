"use strict";var isSafari=/constructor/i.test(window.HTMLElement);if(isSafari){var file=location.pathname.split("/").pop(),link=document.createElement("link");link.href=file.substr(0,file.lastIndexOf("."))+"styles/safari.css",link.type="text/css",link.rel="stylesheet",link.media="screen,print",document.getElementsByTagName("head")[0].appendChild(link)}var _mainModules=["Services","Directives","ngRoute","ngResource","ngAnimate","ngTouch","pasvaz.bindonce","Header","Login","Expenses","Reports","infinite-scroll","InvoiceExpenseImage","Api","Modals","ui.bootstrap"];angular.module("app",_mainModules).config(["$routeProvider","$httpProvider",function(a,b){a.otherwise({redirectTo:"/login"});var c=[];c.push({name:"/login",params:{templateUrl:"./scripts/login/views/login.html",controller:"LoginCtrl"}}),c.push({name:"/expenses",params:{templateUrl:"scripts/expenses/views/expenses.html",controller:"ExpensesListCtrl"}}),c.push({name:"/invoice-expense-image",params:{templateUrl:"scripts/invoice_expense_image/views/invoice-image-details.html",controller:"InvoiceImageCtrl"}}),c.push({name:"/report-details/:reportId/expense",params:{templateUrl:"scripts/expenses/views/add-edit-expense.html",controller:"AddExpenseCtrl"}}),c.push({name:"/expense/:id",params:{templateUrl:"scripts/expenses/views/add-edit-expense.html",controller:"EditExpenseCtrl"}}),c.push({name:"/reports",params:{templateUrl:"scripts/reports/views/reports-list.html",controller:"ReportsListCtrl"}}),c.push({name:"/report",params:{templateUrl:"scripts/reports/views/create-edit-report.html",controller:"CreateEditReportCtrl"}}),c.push({name:"/report/:id",params:{templateUrl:"scripts/reports/views/create-edit-report.html",controller:"CreateEditReportCtrl"}}),c.push({name:"/report-details/:id",params:{templateUrl:"scripts/reports/views/report-details.html",controller:"ReportDetailsCtrl"}}),c.push({name:"/report-details/:reportId/expense/:expenseId",params:{templateUrl:"scripts/reports/views/report-details-expense.html",controller:"EditReportExpenseCtrl"}}),c.push({name:"/settings",params:{templateUrl:"scripts/expenses/views/settings.html",controller:"LoginCtrl"}}),c.forEach(function(b){a.when(b.name,b.params)});var d,e=["$q","$injector",function(a,b){function c(a){return d=d||b.get("$http"),d.pendingRequests.length<1&&(f=f||b.get("requestNotificationChannelSvc"),f.requestEnded()),a}function e(c){return d=d||b.get("$http"),d.pendingRequests.length<1&&(f=f||b.get("requestNotificationChannelSvc"),f.requestEnded()),a.reject(c)}var f;return function(a){return f=f||b.get("requestNotificationChannelSvc"),f.requestStarted(),a.then(c,e)}}];b.responseInterceptors.push(e)}]).constant("serverErrorMsg","Server error!").constant("sessionToken","session-token").run(["currenciesRepositorySvc","currenciesSvc","errorHandlerDefaultSvc",function(a,b,c){function d(a){b.set(a.currencies)}a.getCurrencies({},d,c.handleError)}]),angular.module("Login",["ngResource"]).config(function(){}).constant("errorMsg","Please try again! Username or password is wrong!").constant("userName","userName"),angular.module("Login").factory("UserSvc",["$resource","baseUrlMockeyWeb","loginUrl",function(a,b,c){return a(b+c,{},{login:{method:"POST"}})}]),angular.module("Header",[]).config(function(){}).constant("loginPath","/login"),angular.module("Expenses",[]).config(function(){}).constant("addExpenseErrorMsg","Please complete all fields!").constant("addExpensesTitle","Create Expense").constant("addExpensesButtonLabel","Create").constant("editExpensesTitle","Edit Expense").constant("editExpensesButtonLabel","Save").constant("reportEntity","Expense").constant("reportable","REPORTABLE").constant("reportEntityName","report"),angular.module("Reports",[]).config(function(){}).constant("addReportErrorMsg","Please complete all fields!").constant("entityName","Report").constant("reportDetailsPath","/report-details").constant("reportsPath","/reports").constant("editExpensePath","/edit-expense").constant("projectEntityName","project").constant("createReportTitle","Create Report").constant("editReportTitle","Edit Report").constant("createReportBtnLabel","Create").constant("editReportBtnLabel","Save").constant("projectAssigned","Project Assigned").constant("allProjects","All Projects").constant("emptyReportErrorMsg","Cannot send a report with no expenses!"),angular.module("InvoiceExpenseImage",[]).config(function(){}),angular.module("Api",[]).config(function(){}).constant("baseUrlMockeyWeb","http://10.10.10.123:8080").constant("loginUrl","/system/login").constant("expensesUrl","/expense").constant("currenciesUrl","/currency").constant("expenseTypesUrl","/expenseTypes").constant("reportsUrl","/expense/report").constant("projectsUrl","/project").constant("imagesUrl","/image").constant("reportExpensesUrl","/expense/report/expenses").constant("expensesPath","/expenses").constant("reportsPath","/reports").constant("expensePath","/expense"),angular.module("Modals",[]).config(function(){}),angular.module("Header").controller("HeaderCtrl",["$scope","$location","$modal","editModeNotificationChannelSvc","signOutDialogSvc",function(a,b,c,d,e){a.isEditMode=!1,a.isActive=function(a){return a===b.path()},a.openEditMode=function(){a.isEditMode=!a.isEditMode,d.toggleEditMode(a.isEditMode)},a.signOut=function(){e.open().then(function(a){b.path(a)})}}]),angular.module("Login").controller("LoginCtrl",["$scope","$location","UserSvc","errorMsg","localStorageSvc","currenciesRepositorySvc","currenciesSvc","sessionToken","userName","errorHandlerDefaultSvc","expenseSharingSvc",function(a,b,c,d,e,f,g,h,i,j,k){a.errorMessage=d,a.showErrorMessage=!1,a.loginPage=!0,a.login=function(d){function f(c){e.localStorageExists()?(a.showErrorMessage=!1,e.setItem(h,c.session_token),e.setItem(i,a.user.username),k.getExpenses().then(function(){b.path("/expenses")})):g()}function g(b){j.handleError(b).then(function(){a.showErrorMessage=!0,a.user.username="",a.user.password=""})}c.login({username:d.username,password:d.password},f,g)}}]),angular.module("Expenses").controller("AddEditExpenseCtrl",["$scope","addExpenseErrorMsg","currenciesSvc","currencySelectDialogSvc",function(a,b,c,d){a.errorMessage=b,a.currencies=c.get(),a.selectCurrency=function(b){d.open(b,a.currencies).then(function(b){a.expense.currency=b})}}]),angular.module("Expenses").controller("ExpensesListCtrl",["$scope","$location","cameraSvc","expenseSvc","expenseSharingSvc","editModeNotificationChannelSvc","reportsSharingSvc","expensePath","reportsPath","cameraSelectDialogListenerSvc",function(a,b,c,d,e,f,g,h,i,j){function k(b){a.isEditMode=b}a.expenses=[],a.selectedExpenseIndex=e.selectedExpense,a.isEditMode=!1,f.onEditModeToggled(a,k),a.goToReports=function(){b.path(i)},e.getExpenses().then(function(b){a.expenses=b}),a.takePhoto=function(c){a.isEditMode||(j.openCameraSelectDlg=!0,b.path(h+"/"+c.expenseId))},a.editExpense=function(c,d){a.isEditMode||(e.selectedExpense=d,b.path(h+"/"+c.expenseId))},a.getMoreExpenses=function(){var b=e.getNextFiveExpenses();b.forEach(function(b){a.expenses.push(b)})}}]),angular.module("Expenses").controller("EditExpenseCtrl",["$scope","$location","editExpensesTitle","editExpensesButtonLabel","expenseSharingSvc","cameraSvc","reportsRepositorySvc","currencySelectDialogSvc","expensesRepositorySvc","editSaveExpenseDialogSvc","expenseViewImageSvc","reportsSharingSvc","reportEntityName","filterReportByStateSvc","itemsSelectionDialogSvc","reportExpensesRepositorySvc","localStorageSvc","sessionToken","reportDetailsPath","expensesPath","invoiceImageRepositorySvc","errorHandlerDefaultSvc","getIdFromLocationSvc","expenseSvc","baseUrlMockeyWeb","validateNumbersSvc","cameraSelectDialog","expenseIdShareSvc","cameraSelectDialogListenerSvc",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C){function D(){return b.path().indexOf("report-details")>-1}function E(){l.expenseSharingSvc.addExpense(a.expense,a.report.expenseReportId),b.path(s+"/"+a.report.expenseReportId)}function F(){l.expenseSharingSvc.updateExpense(a.expense,a.report.expenseReportId),b.path(s+"/"+a.report.expenseReportId)}function G(a){v.handleError(a).then(function(){H()})}function H(){a.expense=angular.copy(J)}a.title=c,a.buttonLabel=d,a.showErrorMessage=!1,a.expenseId=w.getLastIdFromLocation(b.path()),a.token=q.getItem(r),a.path=y,C.openCameraSelectDlg&&(C.openCameraSelectDlg=!1,A.open().then(function(){f.takePhoto().then(function(b){a.imageSelectedPath=b})}));var I=w.getLastIdFromLocation(b.path());a.expense=angular.copy(e.getExpenseById(I,a.reportId));var J=angular.copy(a.expense),K=0;D()&&(K=w.getFirstIdFromLocation(b.path())),a.report=l.getReportById(K);var L=a.report.description;a.imageSelectedPath="","void"!==a.expense.imageType&&(u.getImage({token:q.getItem(r),expenseId:I}),a.imageSelectedPath="image"),a.save=function(c,d){function f(){function c(){l.expenseSharingSvc.deleteExpense(a.expense.expenseId,K),p.addExpensesToReport({token:q.getItem(r)},h,E,G)}function f(a){v.handleError(a).then(function(){H()})}e.updateExpense(d,K),!L&&a.report.description?p.addExpensesToReport({token:q.getItem(r)},h,E,G):L!==a.report.description?p.deleteExpense({token:q.getItem(r),expenseId:a.expense.expenseId},c,f):a.report.description?F():b.path(t)}function g(a){v.handleError(a).then(function(){H()})}var h={expenseReportId:a.report.expenseReportId,expenseIds:[a.expense.expenseId]};if(c.$valid&&z.validate(d)){d.date=a.expense.date;var j=x.create(d),k={token:q.getItem(r)};i.saveExpense(k,j,f,g)}else a.showErrorMessage=!0},a.selectReport=function(){l.getReports().then(function(b){a.reports=b.filter(n.checkIfInState),o.open(a.reports,m).then(function(b){b&&(a.report=b)})})},a.date=a.expense.date,a.isEdit=!0,a.cancelPhoto=function(){a.imageSelectedPath=""},a.takePhoto=function(){A.open().then(function(){f.takePhoto().then(function(b){a.imageSelectedPath=b})})},a.viewImage=function(){B.setId(a.expenseId),k.open().then(function(){a.takePhoto()},{})}}]),angular.module("Expenses").controller("AddExpenseCtrl",["$scope","$location","addExpensesTitle","addExpensesButtonLabel","reportsSharingSvc","expensesRepositorySvc","editSaveExpenseDialogSvc","getIdFromLocationSvc","reportExpensesRepositorySvc","errorDialogSvc","errorMessageSvc","errorHandlerDefaultSvc","localStorageSvc","sessionToken","expenseSvc","cameraSvc","invoiceImageRepositorySvc","cameraSelectDialog","validateNumbersSvc","$http","baseUrlMockeyWeb","expensesUrl","imagesUrl",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){a.title=c,a.buttonLabel=d,a.showErrorMessage=!1,a.imagePath=null,a.expense={};var x=h.getFirstIdFromLocation(b.path());a.report=e.getReportById(x),a.takePhoto=function(){r.open().then(function(){p.takePhoto().then(function(b){a.imageSelectedPath=b})})},a.save=function(c,d){function j(c,f){function j(){d.expenseId=o,e.expenseSharingSvc.addExpense(d,a.report.expenseReportId),g.openSuccessSaveExpenseDialog().then(function(c){b.path(c+"/"+a.report.expenseReportId)})}var k=f(),o=h.getLastIdFromLocation(k.location),p=new FormData;p.append("file",a.imagePath),t.post(u+v+w+"?expenseId="+o+"&token="+m.getItem(n),p,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(){alert("Happens"),addExpenseToReport()}).error(function(){alert("Sry")}),i.addExpensesToReport({token:m.getItem(n)},{expenseReportId:a.report.expenseReportId,expenseIds:[o]},j,l.handleError)}if(c.$valid&&s.validate(d)){d.date=new Date;var k=o.create(d);k.originalCurrency=1,f.createExpense({token:m.getItem(n)},k,j,l.handleError)}else a.showErrorMessage=!0}}]),angular.module("Modals").factory("editSaveExpenseDialogSvc",["$modal","expensesPath","reportsPath","reportDetailsPath",function(a,b,c,d){function e(d){var e=a.open({templateUrl:"scripts/modals/views/edit-expense-dialog.html",controller:["$scope","$modalInstance",function(a,e){a.reportName=d,a.navigateToReports=function(){e.close(c)},a.navigateToExpensesList=function(){e.close(b)}}]});return e.result.then(function(a){return a})}function f(){var b=a.open({templateUrl:"scripts/modals/views/save-expense-dialog.html",controller:["$scope","$modalInstance",function(a,b){a.navigateToReport=function(){b.close(d)}}]});return b.result.then(function(a){return a})}return{openSuccessEditExpenseDialog:e,openSuccessSaveExpenseDialog:f}}]),angular.module("Modals").factory("expenseReportsDialogSvc",["$modal","reportsSharingSvc","filterReportByStateSvc",function(a,b,c){function d(){var d=a.open({templateUrl:"scripts/modals/views/expense-reports-dialog.html",controller:["$scope","$modalInstance",function(a,d){a.reports=[],a.searchedReport=null,b.getReports().then(function(b){a.reports=b.filter(c.checkIfInState)}),a.selectReport=function(a){d.close(a)}}]});return d.result.then(function(a){return a})}return{open:d}}]),angular.module("Modals").factory("sendReportDialogSvc",["$modal",function(a){function b(b){var c=a.open({templateUrl:"scripts/modals/views/send-report-dialog.html",controller:["$scope","$modalInstance",function(a,c){a.reportName=b,a.ok=function(){c.close("ok")}}]});return c.result.then(function(a){return a})}return{open:b}}]),angular.module("Reports").controller("ReportsListCtrl",["$scope","$location","reportsSharingSvc","editModeNotificationChannelSvc","reportsRepositorySvc","filterReportByStateSvc","entityName","confirmDeleteDialogSvc","reportDetailsPath","sessionToken","errorHandlerDefaultSvc","localStorageSvc",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(b){a.isEditMode=b}a.sort=function(a){return new Date(a.creationDate)},a.selectedExpenseIndex=c.selectedReport,a.reports=[],c.getReports().then(function(b){a.reports=b}),a.isEditMode=!1,d.onEditModeToggled(a,m),a.createReport=function(){b.path("/report")},a.deleteReport=function(b){function d(){c.deleteReport(b);var d=0;a.reports.some(function(a,c){return a.expenseReportId===b?(d=c,!0):void 0}),null!==d&&a.reports.splice(d,1)}h.open(g).then(function(){e.deleteReport({token:l.getItem(j),expenseReportId:b},d,k.handleError)})},a.viewReport=function(d,e){c.selectedReport=e,a.isEditMode||d.locked||!f.checkIfInState(d)||b.path(i+"/"+d.expenseReportId)},a.goToExpenses=function(){b.path("/expenses")},a.getMoreReports=function(){var b=c.getNextFiveReports();a.reports=b}}]),angular.module("Reports").controller("ReportDetailsCtrl",["$scope","$location","addReportErrorMsg","reportsSharingSvc","expensesRepositorySvc","confirmDeleteDialogSvc","entityName","sendReportDialogSvc","expensePath","expenseSvc","editModeNotificationChannelSvc","getIdFromLocationSvc","localStorageSvc","sessionToken","reportSendRepositorySvc","errorHandlerDefaultSvc","errorDialogSvc","emptyReportErrorMsg",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){a.errorMessage=c,a.showErrorMessage=!1,a.expenses=[],a.isEditMode=!1,a.selectedExpenseIndex=d.expenseSharingSvc.selectedExpense;var s=l.getLastIdFromLocation(b.path());a.report=d.getReportById(s),d.expenseSharingSvc.getExpenses(a.report.expenseReportId).then(function(b){a.expenses=b}),a.openEditMode=function(){a.isEditMode=!a.isEditMode,k.toggleEditMode(a.isEditMode)},a.sendReport=function(){h.open(a.report.description)},a.editExpense=function(c){a.isEditMode||(a.selectedExpenseIndex=d.expenseSharingSvc.selectedExpense,b.path("/report-details/"+a.report.expenseReportId+"/expense/"+c.expenseId))},a.createExpense=function(){b.path("/report-details/"+a.report.expenseReportId+"/expense")},a.editReport=function(){b.path("/report/"+s)},a.sendReport=function(){function c(){d.resetReports(),b.path("/reports")}0===a.expenses.length?q.open(r).then(function(){}):o.sendReport({token:m.getItem(n),expenseReportId:a.report.expenseReportId},c,p.handleError)},a.getMoreExpenses=function(){var b=d.expenseSharingSvc.getNextFiveExpenses();b.forEach(function(b){a.expenses.push(b)})}}]),angular.module("Reports").controller("CreateEditReportCtrl",["$scope","$location","addReportErrorMsg","reportsSharingSvc","reportsRepositorySvc","itemsSelectionDialogSvc","projectsSharingSvc","projectEntityName","projectAssigned","allProjects","serverErrorMsg","editReportTitle","editReportBtnLabel","createReportTitle","createReportBtnLabel","reportsPath","expenseSharingSvc","errorHandlerDefaultSvc","getIdFromLocationSvc","localStorageSvc","sessionToken",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){a.projectAssigned=i,a.allProjects=j,a.errorMessage=c,a.showErrorMessage=!1;var v=[],w=s.getLastIdFromLocation(b.path());w?(a.report=angular.copy(d.getReportById(w)),a.title=l,a.buttonLabel=m,v=a.report.expenseIds):(a.report={},a.title=n,a.buttonLabel=o),a.save=function(c,f){function h(){d.resetReports(),d.expenseSharingSvc.addReport(),b.path(p)}function i(){d.updateReport(f),b.path(p)}if(c.$valid){var j=0;if(f.project&&(j=g.getProjectIdByName(f.project.name)),v=q.getExpenseIdsForReportAssign(),w){var k={expenseReportId:f.expenseReportId,description:f.title,applyTo:"",entityId:j,owner:t.getItem("userName"),expenseIds:v};e.saveReport({token:t.getItem(u)},k,i,r.handleError)}else{var l={description:f.title,applyTo:f.project.name,entityId:j,owner:t.getItem("userName"),expenseIds:v};e.createReport({token:t.getItem(u)},l,h,r.handleError)}}else a.showErrorMessage=!0},a.selectProject=function(){g.getProjects().then(function(b){f.open(b,h).then(function(b){b&&(a.report.project=b)})})}}]),angular.module("Reports").controller("EditReportExpenseCtrl",["$scope","$location","getIdFromLocationSvc",function(a,b,c){a.reportId=c.getFirstIdFromLocation(b.path())}]),angular.module("InvoiceExpenseImage").controller("InvoiceImageCtrl",["$scope","invoiceImageRepositorySvc","errorHandlerDefaultSvc","baseUrlMockeyWeb","expenseIdShareSvc","localStorageSvc","sessionToken",function(a,b,c,d,e,f,g){a.viewImage=!1,a.path=d,a.expenseId=e.getId(),a.token=f.getItem(g),a.tabImage=function(){a.viewImage=!a.viewImage}}]),angular.module("AppConfig",[]).constant("foo","stagingFoo"),angular.module("Services",[]).config(function(){}).constant("editModeToggled","TOGGLE_EDIT_MODE").constant("reportAssigned","REPORT_ASSIGNED").constant("expenseEdited","EXPENSE_EDITED").constant("unauthorized","Wrong username or password!").constant("badRequest","Invalid parameters!").constant("notFound","The requested resource is not available!").constant("generalError","An error has occured!"),angular.module("Services").factory("localStorageSvc",[function(){function a(){return window.localStorage}function b(a,b){localStorage.setItem(a,b)}function c(a){return localStorage.getItem(a)}return{localStorageExists:a,setItem:b,getItem:c}}]),angular.module("Services").factory("requestNotificationChannelSvc",["$rootScope",function(a){var b="_START_REQUEST_",c="_END_REQUEST_",d=function(){a.$broadcast(b)},e=function(){a.$broadcast(c)},f=function(a,c){a.$on(b,function(){c()})},g=function(a,b){a.$on(c,function(){b()})};return{requestStarted:d,requestEnded:e,onRequestStarted:f,onRequestEnded:g}}]),angular.module("Services").factory("editModeNotificationChannelSvc",["$rootScope","editModeToggled",function(a,b){var c=function(a,c){a.$on(b,function(a,b){c(b.isEditMode)})},d=function(c){a.$broadcast(b,{isEditMode:c})};return{onEditModeToggled:c,toggleEditMode:d}}]),angular.module("Modals").factory("expenseViewImageSvc",["$modal","$location",function(a,b){function c(){var c=a.open({templateUrl:"scripts/modals/views/expense-view-image.html",controller:["$scope","$modalInstance",function(a,c){a.profileName=localStorage.getItem("userName"),a.selectNew=function(){c.close()},a.view=function(){b.path("/invoice-expense-image"),c.dismiss()}}]});return c.result.then(function(a){return a})}return{open:c}}]),angular.module("Modals").factory("confirmDeleteDialogSvc",["$modal",function(a){function b(b){var c=a.open({templateUrl:"scripts/modals/views/confirm-delete-dialog.html",controller:["$scope","$modalInstance",function(a,c){a.entityName=b,a.ok=function(){c.close("true")},a.cancel=function(){c.dismiss("false")}}]});return c.result.then(function(a){return a})}return{open:b}}]),angular.module("Modals").factory("currencySelectDialogSvc",["$modal",function(a){function b(b,c){var d=a.open({templateUrl:"scripts/modals/views/currency-select-dialog.html",controller:["$scope","$modalInstance",function(a,d){a.currencies=c,a.currencies.forEach(b?function(a){a.selected=b.id===a.id?!0:!1}:function(a){a.selected=!1}),a.select=function(a){b&&(b.selected=!1),a.selected=!0,d.close(a)}}]});return d.result.then(function(a){return a})}return{open:b}}]),angular.module("Services").factory("filterReportByStateSvc",[function(){function a(a){var c=b.indexOf(a.state)>-1;return c}var b=["Draft Expense","Rejected by Finance","Rejected by Manager","Rejected to Submitter"];return{checkIfInState:a}}]),angular.module("Modals").factory("signOutDialogSvc",["$modal","loginPath",function(a,b){function c(){var c=a.open({templateUrl:"scripts/modals/views/sign-out-dialog.html",controller:["$scope","$modalInstance",function(a,c){a.profileName=localStorage.getItem("userName"),a.ok=function(){c.close(b)}}]});return c.result.then(function(a){return a})}return{open:c}}]),angular.module("Modals").factory("itemsSelectionDialogSvc",["$modal",function(a){function b(b,c){var d=a.open({templateUrl:"scripts/modals/views/items-selection-dialog.html",controller:["$scope","$modalInstance",function(a,d){a.entities=b,a.searchedEntity=null,a.selectedEntity={title:"Search"},a.entityName=c,a.selectEntity=function(b){a.selectedEntity=b,d.close(a.selectedEntity)},a.close=function(){d.close(a.selectedEntity)}}]});return d.result.then(function(a){return a})}return{open:b}}]),angular.module("Modals").factory("errorDialogSvc",["$modal",function(a){function b(b){var c=a.open({templateUrl:"scripts/modals/views/error-dialog.html",controller:["$scope","$modalInstance",function(a,c){a.errorMessage=b,a.ok=function(){c.close("ok")}}]});return c.result.then(function(a){return a})}return{open:b}}]),angular.module("Services").factory("errorMessageSvc",["unauthorized","badRequest","notFound","generalError",function(a,b,c,d){function e(e){var f=null;switch(e){case 400:f=b;break;case 401:f=a;break;case 404:f=c;break;default:f=d}return f}return{getErrorMessage:e}}]),angular.module("Services").factory("errorHandlerDefaultSvc",["errorDialogSvc","errorMessageSvc",function(a,b){function c(c){var d=b.getErrorMessage(c.status);return a.open(d)}return{handleError:c}}]),angular.module("Services").factory("expenseReportStatesSvc",[function(){function a(){return b}var b=["Approved by Finance","Approved by Manager","Approved by Owner","Cancelled Expense","Draft Expense","Paid","Pending Approval","Pending Owner Approval","Preparing Payment","Rejected by Finance","Rejected by Manager","Rejected to Submitter"];return{getReportStates:a}}]),angular.module("Services").factory("currenciesRepositorySvc",["$resource","baseUrlMockeyWeb","currenciesUrl",function(a,b,c){return a(b+c,{},{getCurrencies:{method:"GET",isArray:!1}})}]),angular.module("Services").factory("currenciesSvc",[function(){function a(){return c}function b(a){a.map(function(a){a.selected=!1}),c=a}var c=[];return{get:a,set:b}}]),angular.module("Services").factory("expenseTypesRepositorySvc",["$resource","baseUrlMockeyWeb","expenseTypesUrl",function(a,b,c){return a(b+c,{},{getExpenseTypes:{method:"GET",isArray:!1}})}]),angular.module("Services").factory("expenseTypesSvc",[function(){function a(){return c}function b(a){c=a}var c=[];return{get:a,set:b}}]),angular.module("Services").factory("cameraSvc",["$q",function(a){function b(a){d="camera"===a?Camera.PictureSourceType.CAMERA:Camera.PictureSourceType.PHOTOLIBRARY}function c(){function b(a){confirm("Upload image to expense?")?e.resolve(a):e.reject()}function c(){e.reject()}var e=a.defer();return navigator.camera.getPicture(b,c,{quality:50,targetWidth:100,targetHeight:100,destinationType:Camera.DestinationType.DATA_URL,sourceType:d,saveToPhotoAlbum:!1}),e.promise}var d=null;return{takePhoto:c,setSource:b}}]),angular.module("Services").factory("projectsRepositorySvc",["$resource","baseUrlMockeyWeb","projectsUrl","localStorageSvc","sessionToken",function(a,b,c,d,e){return a(b+c+"?token="+d.getItem(e)+"&scope=expenses",{},{getProjects:{method:"GET",isArray:!1}})}]),angular.module("Services").factory("projectsSharingSvc",["$q","projectsRepositorySvc",function(a,b){function c(){function c(a){a.projects.forEach(function(a){a.title=a.client.name+" - "+a.name,e.push(a)}),d.resolve(e)}var d=a.defer();return 0===e.length?b.getProjects({},c):d.resolve(e),d.promise}function d(a){var b=null;return e.some(function(c){return c.name===a?(b=c.id,!0):void 0}),b}var e=[];return{getProjects:c,getProjectIdByName:d}}]),angular.module("Reports").factory("reportsRepositorySvc",["$resource","baseUrlMockeyWeb","reportsUrl",function(a,b,c){return a(b+c+"?token=:token",{token:"token"},{getReports:{method:"GET"},createReport:{method:"POST"},saveReport:{method:"PUT"},deleteReport:{method:"DELETE"}})}]),angular.module("Reports").factory("reportsSharingSvc",["$q","reportsRepositorySvc","localStorageSvc","sessionToken","errorHandlerDefaultSvc","expenseSharingSvc",function(a,b,c,d,e,f){function g(){var a=[],b=o+p;if(n.length<b)a=n,o+=a.length;else{for(var c=0;b>c;c++)a.push(n[c]);o+=p}return a}function h(){function f(a){var b=a.expenses;if(b.sort(function(a,b){return new Date(b.creationDate)-new Date(a.creationDate)}),b.forEach(function(a){a.title=a.description,a.locked=a.state.indexOf("Draft")>=0||a.state.indexOf("Reject")>=0?!1:!0,n.push(a)}),0!==o){var c=angular.copy(n);h=c.splice(0,o)}else h=g();i.resolve(h)}var h=null,i=a.defer();if(0===n.length)b.getReports({token:c.getItem(d)},f,e.handleError);else{var j=angular.copy(n),k=j.splice(0,o);i.resolve(k)}return i.promise}function i(a){var b=null;n.some(function(c,d){return c.expenseReportId===a?(b=d,!0):void 0}),null!==b&&(n.splice(b,1),f.deleteReportMapping(a))}function j(a){n.some(function(b){return b.expenseReportId===a.expenseReportId?(b.description=a.description,b.title=a.title,b.entityId=a.entityId,!0):void 0})}function k(a){var b=null;return n.some(function(c){return c.expenseReportId===a?(b=c,!0):void 0}),b||(b={}),b}function l(){}function m(){n=[]}var n=[],o=0,p=5;return{getReports:h,deleteReport:i,updateReport:j,expenseSharingSvc:f,getReportById:k,addReport:l,resetReports:m,getNextFiveReports:g}}]),angular.module("Reports").factory("reportSendRepositorySvc",["$resource","baseUrlMockeyWeb","reportsUrl",function(a,b,c){return a(b+c+"/send?expenseReportId=:expenseReportId&token=:token",{expenseReportId:"expenseReportId",token:"token"},{sendReport:{method:"GET"}})}]),angular.module("Modals").factory("cameraSelectDialog",["$modal","cameraSvc",function(a,b){function c(){var c=a.open({templateUrl:"scripts/modals/views/camera-select-dialog.html",controller:["$scope","$modalInstance",function(a,c){a.camera=function(){b.setSource("camera"),c.close("true")},a.galery=function(){b.setSource("library"),c.close("true")}}]});return c.result.then(function(a){return a})}return{open:c}}]),angular.module("Expenses").factory("expenseSvc",["currenciesSvc","reportable",function(a,b){function c(c){function d(){var b=a.get();b.some(function(a){return a.id===f.originalCurrencyId?(f.currency=a,!0):void 0}),!f.currency}function e(){d()}var f=this;f.expenseId=c.expenseId||0,f.submiter=c.submiter||null,f.owner=c.owner||null,f.description=c.description||null,f.invoiceNumber=c.invoiceNumber||0,f.date=c.date||null,f.originalCurrencyId=c.originalCurrencyId||0,f.originalAmount=c.originalAmount||0,f.exchangeRate=c.exchangeRate||0,f.expenseTypeName=c.type||null,f.imageType=c.imageType||"void",f.contableCodeId=c.contableCodeId||0,f.provider=c.provider||null,f.type=c.type||null,f.currency=null,f.expenseType=b,f.showDetails=!1,f.selected=!1,f.enabled=!0,e()}function d(a){return new c(a)}return{create:d}}]),angular.module("Expenses").factory("expensesRepositorySvc",["$resource","baseUrlMockeyWeb","expensesUrl",function(a,b,c){return a(b+c+"?token=:token",{token:"token"},{getExpenses:{method:"GET",isArray:!1},getImage:{method:"GET",isArray:!1},createExpense:{method:"POST"},saveExpense:{method:"PUT"},deleteExpense:{method:"DELETE"}})}]),angular.module("Expenses").factory("expenseSharingSvc",["$q","expensesRepositorySvc","errorHandlerDefaultSvc","localStorageSvc","sessionToken","expenseSvc",function(a,b,c,d,e,f){function g(a){var b=a||0;t[b]=t[b]||0;var c=t[b],d=[],e=c+q;if(s[b].length<e){var f=s[b].length,g=angular.copy(s[b]);d=g.splice(c,f),t[b]+=f-c}else for(var h=c;e>h;h++)d.push(s[b][h]),t[b]=e;return d}function h(h){function i(a){a.expenses.forEach(function(a){a.title=a.description;var b=f.create(a);s[j].push(b)});var b=g(h);k.resolve(b)}var j=h||0;s[j]=s[j]||[];var k=a.defer();if(0===s[j].length){var l=j>0?{token:d.getItem(e),expenseReportId:h}:{token:d.getItem(e)};b.getExpenses(l,i,c.handleError)}else{var m=angular.copy(s[j]),n=null;t[j]&&0!==t[j]?(n=m.splice(0,t[j]),k.resolve(n)):(n=m,k.resolve(n))}return k.promise}function i(){return s[0].forEach(function(a){"void"!==a.imageType&&u.push(a.expenseId)}),u}function j(a,b){var c=b||0,d=null;if(s[c].some(function(b){return b.expenseId===a?(d=b,!0):void 0}),!d)throw new Error("Expense not found");return d}function k(a,b){var c=b||0;s[c].some(function(b){return b.expenseId===a.expenseId?(b.currency=a.currency,b.date=a.date,b.description=a.description,b.exchangeRate=a.exchangeRate,b.expenseId=a.expenseId,b.originalAmount=a.originalAmount,b.expense=a.expense,!0):void 0})}function l(a,b){var c=b||0,d=null;s[c].some(function(b,c){return b.expenseId===a?(d=c,!0):void 0}),null!==d&&s[c].splice(d,1)}function m(a,b){var c=b||0;s[c]=s[c]||[],s[c].push(a)}function n(){s[0].map(function(a,b){return"void"!==a.imageType?(s[0].splice(b,1),!0):void 0})}function o(a){var b=[];s[a]?b=s[a]:p(a).then(function(a){b=a}),b.forEach(function(a){s[0].push(a)}),s[a]=void 0}function p(c){function g(a){s[c]=[],a.expenses.forEach(function(a){a.title=a.description;var b=f.create(a);s[c].push(b)}),i.resolve(s[c])}function h(){}var i=a.defer();return b.getExpenses({token:d.getItem(e),expenseReportId:c},g,h),i.promise}var q=5,r=0,s={0:[]},t={0:0},u=[];return{getExpenseIdsForReportAssign:i,getExpenses:h,getExpenseById:j,updateExpense:k,deleteExpense:l,addExpense:m,addReport:n,getNextFiveExpenses:g,selectedExpense:r,deleteReportMapping:o,getAllExpensesForReport:p}}]),angular.module("Expenses").factory("expenseIdShareSvc",[function(){function a(a){c=a}function b(){return c}var c=0;return{setId:a,getId:b}}]),angular.module("Expenses").factory("expensePostImageSvc",["$resource","baseUrlMockeyWeb","imagesUrl","expensesUrl","$http","imageFileShareSvc","expenseIdShareSvc","localStorageSvc","sessionToken","$q",function(a,b,c,d,e,f,g,h,i,j){function k(){var a=j.defer(),k=f.getFile();return e.post(b+d+c+"?expenseId="+g.getId()+"&token="+h.getItem(i),k,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(){a.resolve()}).error(function(){a.reject()}),a.promise}return{saveImage:k}}]),angular.module("Expenses").factory("imageFileShareSvc",[function(){function a(a){c=a}function b(){return c}var c={};return{setFile:a,getFile:b}}]),angular.module("Services").factory("getIdFromLocationSvc",[function(){function a(a){var b=a.substring(a.lastIndexOf("/")+1);return parseInt(b,10)}function b(a){var b=a.match(/\d+/);return b?Number(b[0]):null}return{getLastIdFromLocation:a,getFirstIdFromLocation:b}}]),angular.module("Reports").factory("reportExpensesRepositorySvc",["$resource","baseUrlMockeyWeb","reportExpensesUrl",function(a,b,c){return a(b+c+"?token=:token",{token:"token"},{addExpensesToReport:{method:"POST"},deleteExpense:{method:"DELETE"},saveExpensesToReport:{method:"PUT"}})}]),angular.module("InvoiceExpenseImage").factory("invoiceImageRepositorySvc",["$resource","baseUrlMockeyWeb","imagesUrl","expensesUrl",function(a,b,c,d){return a(b+d+c+"?expenseId=:expenseId&token=:token",{expenseId:"expenseId",token:"token"},{getImage:{method:"GET",isArray:!1},saveImage:{method:"POST",isArray:!1}})}]),angular.module("Expenses").factory("lastShownExpenseSvc",[function(){function a(a){e=a}function b(){return e}function c(a){f=a}function d(){return f
}var e=0,f=[];return{setIndex:a,getIndex:b,setLastVisibleExpenses:c,getLastVisibleExpenses:d}}]),angular.module("Services").factory("validateNumbersSvc",[function(){function a(a){var b=!1,c=parseFloat(a.exchangeRate),d=parseFloat(a.originalAmount);return c&&c>0&&d&&d>0&&(b=!0),b}return{validate:a}}]),angular.module("Expenses").factory("cameraSelectDialogListenerSvc",[function(){var a=!1;return{openCameraSelectDlg:a}}]),angular.module("Filters",[]).config(function(){}),angular.module("Directives",[]).config(function(){}).constant("expensesListTemplateUrl","scripts/directives/views/expenses-list.html").constant("editExpenseTemplateUrl","scripts/directives/views/edit-expense.html"),angular.module("Directives").directive("loading",["requestNotificationChannelSvc",function(a){return{restrict:"E",replace:!0,template:'<div class="loader"><div tabindex="-1" role="dialog" class="transparent-background modal fade ng-isolate-scope in" style="z-index: 1060;display: block; z-index: 1050 , display: block"><div class="modal-dialog"><div class="modal-content"><div class="modal-body no-padding"><div class="message"><p><img src="resources/images/ajax-loader.gif"/></p></div></div></div></div></div></div>',link:function(b,c){c.hide();var d=function(){c.show()},e=function(){c.hide()};a.onRequestStarted(b,d),a.onRequestEnded(b,e)}}}]),angular.module("Directives").directive("stopEvent",function(){return{restrict:"A",link:function(a,b,c){b.bind(c.stopEvent,function(a){a.stopPropagation()})}}}),angular.module("Directives").directive("backButton",function(){return{restrict:"A",link:function(a,b){b.on("click",function(){history.back();var a=document.getElementsByTagName("body")[0];a.className=a.className+" backAnimation",setTimeout(function(){document.getElementsByTagName("body")[0].className="ng-scope"},1500)})}}}),angular.module("Directives").directive("expensesList",["expensesListTemplateUrl",function(a){return{restrict:"E",replace:!0,controller:["$scope","$location","expenseSvc","expensesRepositorySvc","confirmDeleteDialogSvc","reportEntity","sessionToken","errorHandlerDefaultSvc","expenseSharingSvc","getIdFromLocationSvc",function(a,b,c,d,e,f,g,h,i,j){a.sort=function(a){return new Date(a.date)},a.deleteExpense=function(c){function k(){var d=j.getLastIdFromLocation(b.path());i.deleteExpense(c,d);var e=0;a.expenses.some(function(a,b){return a.expenseId===c?(e=b,!0):void 0}),null!==e&&a.expenses.splice(e,1)}e.open(f).then(function(){d.deleteExpense({expenseId:c,token:localStorage.getItem(g)},k,h.handleError)})}}],templateUrl:a}}]),angular.module("Directives").directive("currency",function(){function a(a){return angular.isUndefined(a)||""===a||null===a||a!==a}String.prototype.splice=function(a,b,c){return this.slice(0,a)+c+this.slice(a+Math.abs(b))};var b=function(a,b){b=void 0!==b?b:!0;var c=a.toString().split("."),d=c[0],e=c[1];if(d=""===d&&b?"0":d,d=d.replace(/[^\d]/g,""),d.length>3)for(var f=Math.floor(d.length/3);f>0;){var g=d.indexOf(",");0>g&&(g=d.length),g-3>0&&(d=d.splice(g-3,0,",")),f--}if(void 0===e)e=b?".00":"";else{if(b)for(e.length>2&&(e=e.slice(0,2));e.length<2;)e+="0";e="."+e}return[d,e].join("")};return{require:"?ngModel",restrict:"A",link:function(c,d,e,f){c.$watch(function(){return{min:e.min}},function(){f.$setViewValue(f.$viewValue)},!0),c.$watch(function(){return{max:e.max}},function(){f.$setViewValue(f.$viewValue)},!0);var g=function(b){var d=c.$eval(e.min)||0;return!a(b)&&d>b?void f.$setValidity("min",!1):(f.$setValidity("min",!0),b)},h=function(b){var d=c.$eval(e.max)||1/0;return!a(b)&&b>d?void f.$setValidity("max",!1):(f.$setValidity("max",!0),b)};d.bind("keypress",function(a){var b="number"==typeof a.which?a.which:a.keyCode,c=$(this).val(),d=this.selectionStart,e=this.selectionEnd,f=0!==b?String.fromCharCode(b):"",g=e-d,h=c.splice(d,g,f);return 0!==b&&8!==b?String.fromCharCode(b).match(/[^\d.]/g)?void a.preventDefault():0===c.search(/(.*)\.[0-9][0-9]/)&&c.length-3<d?void a.preventDefault():h.split(".").length>2&&46===b?void a.preventDefault():void 0:void 0}),$(d).bind("blur paste",function(){d.val(b($(this).val()))}),$(d).bind("keyup",function(){d.val(b($(this).val(),!1))}),f.$parsers.unshift(b),f.$formatters.unshift(b),f.$parsers.push(g),f.$formatters.push(g),f.$parsers.push(h),f.$formatters.push(h)}}}),angular.module("Directives").directive("floatingDecimal",function(){function a(a){return angular.isUndefined(a)||""===a||null===a||a!==a}var b=function(a,b){b=void 0!==b?b:!0;var c=a.toString().split("."),d=c[0],e=c[1];d=d.replace(/[^\d]/g,""),void 0===e&&(e=b?"00":"");var f=2-e.length,g=0;if(0>f?(e.length>f&&(g=Math.abs(f)),d+=e.slice(0,g),e=e.slice(g)):f>0&&(d.length>f&&(g=d.length-f),e=d.slice(g)+e,d=d.slice(0,g)),d.length>3)for(var h=Math.floor(d.length/3);h>0;){var i=d.indexOf(",");0>i&&(i=d.length),i-3>0&&(d=d.splice(i-3,0,",")),h--}return[d,".",e].join("")};return{require:"?ngModel",restrict:"A",link:function(c,d,e,f){c.$watch(function(){return{min:e.min}},function(){f.$setViewValue(f.$viewValue)},!0),c.$watch(function(){return{max:e.max}},function(){f.$setViewValue(f.$viewValue)},!0);var g=function(b){var d=c.$eval(e.min)||0;return!a(b)&&d>b?void f.$setValidity("min",!1):(f.$setValidity("min",!0),b)},h=function(b){var d=c.$eval(e.max)||1/0;return!a(b)&&b>d?void f.$setValidity("max",!1):(f.$setValidity("max",!0),b)};d.bind("keypress",function(a){var b="number"==typeof a.which?a.which:a.keyCode,c=$(this).val(),d=this.selectionStart,e=this.selectionEnd,f=0!==b?String.fromCharCode(b):"",g=e-d,h=c.splice(d,g,f);return 0!==b&&8!==b?String.fromCharCode(b).match(/[^\d.]/g)?void a.preventDefault():h.split(".").length>2&&46===b?void a.preventDefault():void 0:void 0}),String.prototype.splice=function(a,b,c){return this.slice(0,a)+c+this.slice(a+Math.abs(b))},$(d).bind("blur paste",function(){d.val(b($(this).val()))}),$(d).bind("keyup",function(){d.val(b($(this).val(),!1))}),f.$parsers.unshift(b),f.$formatters.unshift(b),f.$parsers.push(g),f.$formatters.push(g),f.$parsers.push(h),f.$formatters.push(h)}}}),angular.module("Directives").directive("getFocus",function(){return{restrict:"A",link:function(a,b){a.$index===a.selectedReportIndex&&b.focus()}}});