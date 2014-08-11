"use strict";var _mainModules=["Services","Directives","ngRoute","ngResource","ngTouch","Header","Login","Expenses","Reports","infinite-scroll","InvoiceExpenseImage","Api","ui.bootstrap"];angular.module("app",_mainModules).config(["$routeProvider","$httpProvider",function(a,b){a.otherwise({redirectTo:"/login"});var c=[];c.push({name:"/login",params:{templateUrl:"./scripts/login/views/login.html",controller:"LoginCtrl"}}),c.push({name:"/expenses",params:{templateUrl:"scripts/expenses/views/expenses.html",controller:"ExpensesListCtrl"}}),c.push({name:"/invoice-expense-image",params:{templateUrl:"scripts/invoice_expense_image/views/invoice-image-details.html",controller:"InvoiceImageCtrl"}}),c.push({name:"/add-expense",params:{templateUrl:"scripts/expenses/views/add-edit-expense.html",controller:"AddExpenseCtrl"}}),c.push({name:"/edit-expense",params:{templateUrl:"scripts/expenses/views/add-edit-expense.html",controller:"EditExpenseCtrl"}}),c.push({name:"/reports",params:{templateUrl:"scripts/reports/views/main-report-view.html",controller:"ReportsCtrl"}}),c.push({name:"/create-report",params:{templateUrl:"scripts/reports/views/create-report.html",controller:"CreateReportCtrl"}}),c.push({name:"/edit-report",params:{templateUrl:"scripts/reports/views/edit-report.html",controller:"EditReportCtrl"}}),c.push({name:"/view-report",params:{templateUrl:"scripts/reports/views/view-report.html",controller:"ViewReportCtrl"}}),c.push({name:"/settings",params:{templateUrl:"scripts/expenses/views/settings.html",controller:"LoginCtrl"}}),c.forEach(function(b){a.when(b.name,b.params)});var d,e=["$q","$injector",function(a,b){function c(a){return d=d||b.get("$http"),d.pendingRequests.length<1&&(f=f||b.get("requestNotificationChannelSvc"),f.requestEnded()),a}function e(c){return d=d||b.get("$http"),d.pendingRequests.length<1&&(f=f||b.get("requestNotificationChannelSvc"),f.requestEnded()),a.reject(c)}var f;return function(a){return f=f||b.get("requestNotificationChannelSvc"),f.requestStarted(),a.then(c,e)}}];b.responseInterceptors.push(e)}]).run(["currenciesRepositorySvc","currenciesSvc","expenseTypesRepositorySvc","expenseTypesSvc",function(a,b,c,d){a.getCurrencies().$promise.then(function(a){b.set(a.currencies)}),c.getExpenseTypes().$promise.then(function(a){d.set(a.expenseTypes)})}]),angular.module("Login",["ngResource"]).config(function(){}).constant("errorMsg","Please try again! Username or password is wrong!"),angular.module("Login").factory("UserSvc",["$resource","baseUrlMockeyWeb","loginUrl",function(a,b,c){return a(b+c,{},{login:{method:"POST"}})}]),angular.module("Header",[]).config(function(){}).constant("defaultMode","_DEFAULT_").constant("selectMode","_SELECT_").constant("selectModeActivated","_SELECT_MODE_ACTIVATED").constant("detailsModeActivated","_DETAILS_MODE_ACTIVATED").constant("addExpenseErrorMsg","Please complete all fields!"),angular.module("Expenses",[]).config(function(){}).constant("addExpenseErrorMsg","Please complete all fields!").constant("addExpensesTitle","Create Expenses").constant("addExpensesButtonLabel","Create").constant("editExpensesTitle","Edit Expense").constant("editExpensesButtonLabel","Save").constant("entityName","Expense"),angular.module("Reports",[]).config(function(){}).constant("defaultMode","_DEFAULT_").constant("selectMode","_SELECT_").constant("selectModeActivated","_SELECT_MODE_ACTIVATED").constant("detailsModeActivated","_DETAILS_MODE_ACTIVATED").constant("addReportErrorMsg","Please complete all fields!"),angular.module("InvoiceExpenseImage",[]).config(function(){}),angular.module("Api",[]).config(function(){}).constant("baseUrl","https://esb.dev.corp.globant.com").constant("baseUrlMockeyWeb","http://10.0.3.2:8080").constant("baseUrlMockeyEmulator","http://10.0.3.2:8080").constant("loginUrl","/service/login").constant("expensesUrl","/service/expense/:image").constant("currenciesUrl","/service/currencies").constant("expenseTypesUrl","/service/expenseTypes").constant("reportsUrl","/service/expense/report").constant("projectsUrl","/service/expense/project").constant("expensesPath","/expenses").constant("reportsPath","/reports"),angular.module("Header").controller("HeaderCtrl",["$scope","$location","$modal","editModeNotificationChannelSvc",function(a,b,c,d){a.isEditMode=!1,a.isActive=function(a){return a===b.path()},a.openEditMode=function(){a.isEditMode=!a.isEditMode,d.toggleEditMode(a.isEditMode)},a.openProfile=function(){c.open({templateUrl:"signOutModal",controller:SignOutModalCtrl,size:"sm",resolve:{items:function(){return a.items}}})}}]),angular.module("Login").controller("LoginCtrl",["$scope","$location","UserSvc","errorMsg","localStorageSvc",function(a,b,c,d,e){a.errorMessage=d,a.showErrorMessage=!1,a.login=function(d){function f(c){e.localStorageExists()?(a.showErrorMessage=!1,e.setItem("session-token",c.session_token),e.setItem("userName",a.user.username),b.path("/expenses")):g()}function g(){a.showErrorMessage=!0,a.user.username="",a.user.password=""}c.login({username:d.username,password:d.password},f,g)}}]),angular.module("Expenses").controller("AddEditExpenseCtrl",["$scope","$location","expensesRepositorySvc","addExpenseErrorMsg","$modal","currenciesSvc","reportsSharingSvc","currencySelectDialogSvc",function(a,b,c,d,e,f,g,h){a.errorMessage=d,a.currencies=f.get(),a.selectCurrency=function(b){h.open(b,a.currencies).then(function(b){a.expense.currency=b})}}]),angular.module("Expenses").controller("ExpensesListCtrl",["$scope","$filter","$location","expenseSvc","expensesRepositorySvc","expensesBufferingSvc","editExpenseSvc","cameraSvc","editModeNotificationChannelSvc","confirmDeleteDialogSvc","entityName",function(a,b,c,d,e,f,g,h,i,j,k){function l(b){a.isEditMode=b}a.goToReports=function(){c.path("/reports")};var m=!0;a.expenses=[],a.isEditMode=!1,i.onEditModeToggled(a,l),a.deleteExpense=function(b){j.open(k).then(function(){a.expenses=a.expenses.filter(function(a){return a.expenseId!==b})})},a.showInvoiceImage=function(){c.path("/invoice-expense-image")},a.editExpense=function(b){a.isEditMode||(g.setExpenseForEdit(b),c.path("/edit-expense"))},a.getMoreExpenses=function(){return m?void(m=!1):void f.getMoreExpenses(a).then(function(b){b.forEach(function(b){a.expenses.push(d.getExpense(a,b))})})},a.takePhoto=function(b){a.isEditMode||h.takePhoto().then(function(){b.imageType="jpg"})},f.getExpenses(a).then(function(b){b.forEach(function(b){a.expenses.push(b)})})}]),angular.module("Expenses").controller("EditExpenseCtrl",["$scope","$location","editExpensesTitle","editExpensesButtonLabel","editExpenseSvc","cameraSvc","reportsRepositorySvc","currencySelectDialogSvc","expensesRepositorySvc","editSaveExpenseDialogSvc","expenseReportsDialogSvc",function(a,b,c,d,e,f,g,h,i,j,k){a.title=c,a.buttonLabel=d,a.showErrorMessage=!1,a.expense=e.getExpenseForEdit(),a.report={},a.save=function(c,d){c.$valid?(d.date=d.date,j.openSuccessEditExpenseDialog(a.report.description).then(function(a){b.path(a)})):a.showErrorMessage=!0},a.selectReport=function(){k.open().then(function(b){a.report=b})},a.reportCollection=null,a.haveReport=void 0!==e.getReport(),a.createReport=function(){b.path("/create-report")},a.date=a.expense.date,a.isEdit=!0,a.imageSelectedPath="",a.takePhoto=function(){f.takePhoto().then(function(b){a.imageSelectedPath=b})}}]),angular.module("Expenses").controller("AddExpenseCtrl",["$scope","$location","addExpensesTitle","addExpensesButtonLabel","reportsSharingSvc","expensesRepositorySvc","editSaveExpenseDialogSvc",function(a,b,c,d,e,f,g){a.title=c,a.buttonLabel=d,a.showErrorMessage=!1,a.expense={},a.report=e.getReport(),a.save=function(c,d){c.$valid?(d.date=new Date,g.openSuccessSaveExpenseDialog().then(function(){b.path(url)})):a.showErrorMessage=!0}}]),angular.module("Expenses").factory("editSaveExpenseDialogSvc",["$modal","expensesPath","reportsPath",function(a,b,c){function d(d){var e=a.open({templateUrl:"scripts/expenses/services/editSaveExpenseDialog/edit-expense-dialog.html",controller:function(a,e){a.reportName=d,a.navigateToReports=function(){e.close(c)},a.navigateToExpensesList=function(){e.close(b)}}});return e.result.then(function(a){return a})}function e(){var b=a.open({templateUrl:"scripts/expenses/services/editSaveExpenseDialog/save-expense-dialog.html",controller:function(a,b){a.ok=function(){b.close("ok")}}});return b.result.then(function(a){return a})}return{openSuccessEditExpenseDialog:d,openSuccessSaveExpenseDialog:e}}]),angular.module("Expenses").factory("expenseReportsDialogSvc",["$modal","reportsSharingSvc",function(a,b){function c(){var c=a.open({templateUrl:"scripts/expenses/services/expenseReportsDialog/expense-reports-dialog.html",controller:function(a,c){function d(a){var b=e.indexOf(a.state)>-1;return b}a.reports=[],a.searchedReport=null;var e=["Draft expense","Pending","Rejected by Finance","Rejected by Manager","Rejected by Manager","Rejected to Submitter"];b.getReports().then(function(b){a.reports=b.filter(d)}),a.selectReport=function(a){c.close(a)}}});return c.result.then(function(a){return a})}return{open:c}}]),angular.module("Reports").controller("ReportsCtrl",["$scope","$filter","$location","$modal","reportsSharingSvc","editModeNotificationChannelSvc","reportsRepositorySvc",function(a,b,c,d,e,f,g){function h(b){a.isEditMode=b}a.goToExpenses=function(){c.path("/expenses")},e.getReports().then(function(b){a.reportCollection=b}),a.isEditMode=!1,f.onEditModeToggled(a,h),a.deleteReport=function(b){a.reportForDeletion=b;var c=d.open({templateUrl:"deleteModal",controller:"deleteExpModalCtrl",size:"sm",resolve:{}});c.result.then(function(){function b(a){a.getReports()}function c(a){alert("Failed because: "+a)}g.deleteReports({token:localStorage.getItem("session-token"),expenseReportId:a.reportForDeletion.expenseReportId},b(g),c())},function(){})},a.viewReport=function(b){a.isEditMode||b.locked||"Draft expense"!==b.state||(e.setReport(b),c.path("/view-report"))},a.createReport=function(){c.path("/create-report")}}]),angular.module("Reports").controller("CreateReportCtrl",["$scope","$filter","$location","addReportErrorMsg","reportsSharingSvc","projectRepositorySvc","$modal","reportsRepositorySvc",function(a,b,c,d,e,f,g,h){function i(b){a.projects=b}function j(a){alert("Failed because: "+a)}function k(){c.path("/reports")}function l(a){alert("Failed because: "+a)}a.errorMessage=d,a.showErrorMessage=!1,a.projects=null,a.reportData={},a.projectNameModal=function(){var b=g.open({templateUrl:"projectNameModal",controller:"projectNameModalCtrl",size:"sm",resolve:{data:function(){return{projects:a.projects,target:event.target}}}});b.result.then(function(){},function(){})},f.getProjects(i,j),a.save=function(b){a.reportData.token=localStorage.getItem("session-token"),a.reportData.expense=void 0,a.reportData.expenseID=void 0,a.reportData.description=b.title,h.saveReports(a.reportData,k,l)}}]),angular.module("Reports").controller("ViewReportCtrl",["$scope","$filter","$location","addReportErrorMsg","$modal","reportsSharingSvc","reportExpensesSvc","editExpenseSvc","expensesRepositorySvc","expensesBufferingSvc",function(a,b,c,d,e,f,g,h,i,j){a.report=f.getReport(),a.errorMessage=d,a.showErrorMessage=!1,a.expenses=[],a.editMode=!1,a.openEditMode=function(){a.editMode=!a.editMode},a.editExpense=function(b){a.editMode||(h.setExpenseForEdit(b),h.setReport(a.report),c.path("/edit-expense"))},a.goToEdit=function(){c.path("/edit-report")},j.getExpenses(a).then(function(b){b.forEach(function(b){a.expenses.push(b)})}),a.createExpense=function(){c.path("/add-expense")},a.deleteExpense=function(b){a.expenseForDeletion=b.expenseId;var c=e.open({templateUrl:"deleteModal",controller:"deleteExpModalCtrl",size:"sm",resolve:{}});c.result.then(function(){function b(){g.getExpenses(b,c)}function c(a){alert("Failed because: "+a)}i.deleteExpense({token:localStorage.getItem("session-token"),expenseId:a.expenseForDeletion},b(),c())},function(){})},a.addOrEdit=function(){e.open({templateUrl:"createModal",controller:successModalCtrl,resolve:{data:function(){return{expenses:a.report}}}})}}]),angular.module("Reports").controller("EditReportCtrl",["$scope","$filter","$location","addReportErrorMsg","reportsSharingSvc","projectRepositorySvc","$modal","reportsRepositorySvc",function(a,b,c,d,e,f,g,h){function i(b){a.projects=b}function j(a){alert("Failed because: "+a)}function k(){c.path("/view-report")}function l(a){alert("Failed because: "+a)}a.errorMessage=d,a.showErrorMessage=!1,a.projects=null,a.reportData={},a.projectNameModal=function(){var b=g.open({templateUrl:"projectNameModal",controller:"projectNameModalCtrl",size:"sm",resolve:{data:function(){return{projects:a.projects,target:event.target}}}});b.result.then(function(){},function(){})},f.getProjects(i,j),a.report=e.getReport().data,a.save=function(b){a.reportData.token=localStorage.getItem("session-token"),a.reportData.expense=void 0,a.reportData.expenseID=void 0,a.reportData.description=b.title,h.editReports(a.reportData,k,l)}}]);var SignOutModalCtrl=function(a,b,c,d,e){a.profileName=localStorage.getItem("userName"),a.ok=function(){localStorage.setItem("session-token",null),e.path("/login"),b.dismiss("cancel")}};angular.module("Expenses").controller("deleteExpModalCtrl",["$scope","$modalInstance","$location",function(a,b,c){a.location=function(){return c.$$path.indexOf("report")>0?"Report":"Expense"},a.ok=function(){b.close()},a.cancel=function(){b.dismiss("cancel")}}]);var expenseTypeModalCtrl=function(a,b,c){a.expenses=c.types,a.target=c.target,a.chousen=function(c){$(a.target).html(c.name),$.grep(a.expenses,function(a){a.selected===!0,a.selected=!1}),c.selected=!0,b.dismiss(c)}},expenseCurrencyModalCtrl=function(a,b,c){a.currencies=c.types,a.target=c.target,a.chousen=function(c){$(a.target).html(c.name),$.grep(a.currencies,function(a){a.selected===!0&&(a.selected=!1)}),c.selected=!0,b.dismiss("cancel")}},successModalCtrl=function(a,b,c){a.saveEditTitle=c.expenses.description,a.text=""},editSaveCtrl=function(a,b,c,d){a.text=d.$$path.indexOf("edit")>0?"edited":"added to "+c.report.description,a.goToReports=function(){d.path("/reports"),b.dismiss("cancel")},a.goToExpensesList=function(){d.path("/expenses"),b.dismiss("cancel")}};angular.module("Reports").controller("projectNameModalCtrl",["$scope","$modalInstance","$location","data",function(a,b,c,d){a.projects=d.projects.projects,a.target=d.target,a.chousen=function(c){$(a.target).html(c.name),$(a.target).parent().find("input").attr("data-projId",c.id),$(a.target).parent().find("input").attr("data-projName",c.name),$.grep(a.projects,function(a){a.selected===!0&&(a.selected=!1)}),c.selected=!0,b.dismiss("cancel")}}]),angular.module("InvoiceExpenseImage").controller("InvoiceImageCtrl",["$scope","expensesRepositorySvc",function(a,b){b.getImage({},{image:"image"}).$promise.then(function(b){a.invoiceImage=b.invoiceImage})}]),angular.module("AppConfig",[]).constant("foo","stagingFoo"),angular.module("Services",[]).config(function(){}).constant("editModeToggled","TOGGLE_EDIT_MODE"),angular.module("Services").factory("localStorageSvc",[function(){function a(){return window.localStorage}function b(a,b){localStorage.setItem(a,b)}function c(a){return localStorage.getItem(a)}return{localStorageExists:a,setItem:b,getItem:c}}]),angular.module("Services").factory("requestNotificationChannelSvc",["$rootScope",function(a){var b="_START_REQUEST_",c="_END_REQUEST_",d=function(){a.$broadcast(b)},e=function(){a.$broadcast(c)},f=function(a,c){a.$on(b,function(){c()})},g=function(a,b){a.$on(c,function(){b()})};return{requestStarted:d,requestEnded:e,onRequestStarted:f,onRequestEnded:g}}]),angular.module("Services").factory("editModeNotificationChannelSvc",["$rootScope","editModeToggled",function(a,b){var c=function(a,c){a.$on(b,function(a,b){c(b.isEditMode)})},d=function(c){a.$broadcast(b,{isEditMode:c})};return{onEditModeToggled:c,toggleEditMode:d}}]),angular.module("Services").factory("confirmDeleteDialogSvc",["$modal",function(a){function b(b){var c=a.open({templateUrl:"scripts/modals/confirm-delete-dialog.html",controller:function(a,c){a.entityName=b,a.ok=function(){c.close("true")},a.cancel=function(){c.dismiss("false")}}});return c.result.then(function(a){return a})}return{open:b}}]),angular.module("Services").factory("currencySelectDialogSvc",["$modal",function(a){function b(b,c){var d=a.open({templateUrl:"scripts/services/currencies/currencySelectDialog/currency-select-dialog.html",controller:function(a,d){a.currencies=c,b&&a.currencies.forEach(function(a){a.selected=b.id===a.id?!0:!1}),a.select=function(a){b&&(b.selected=!1),a.selected=!0,d.close(a)}}});return d.result.then(function(a){return a})}return{open:b}}]),angular.module("Services").factory("expenseReportStatesSvc",[function(){function a(){return b}var b=["Approved by Finance","Approved by Manager","Approved by Owner","Cancelled Expense","Draft Expense","Paid","Pending Approval","Pending Owner Approval","Preparing Payment","Rejected by Finance","Rejected by Manager","Rejected to Submitter"];return{getReportStates:a}}]),angular.module("Services").factory("currenciesRepositorySvc",["$resource","baseUrlMockeyWeb","currenciesUrl",function(a,b,c){return a(b+c,{},{getCurrencies:{method:"GET",isArray:!1}})}]),angular.module("Services").factory("currenciesSvc",[function(){function a(){return c}function b(a){a.map(function(a){a.selected=!1}),c=a}var c=[];return{get:a,set:b}}]),angular.module("Expenses").factory("reportExpensesSvc",["$resource","baseUrlMockeyWeb","expensesUrl","reportsSharingSvc",function(a,b,c,d){var e=d.getReport().expenseReportId;return a(b+c+"/?token="+localStorage.getItem("session-token")+"&expenseReportId="+e,{},{getExpenses:{method:"GET",isArray:!1},saveExpense:{method:"POST"},deleteExpense:{method:"DELETE"}})}]),angular.module("Services").factory("expenseTypesRepositorySvc",["$resource","baseUrlMockeyEmulator","expenseTypesUrl",function(a,b,c){return a(b+c,{},{getExpenseTypes:{method:"GET",isArray:!1}})}]),angular.module("Services").factory("expenseTypesSvc",[function(){function a(){return c}function b(a){c=a}var c=[];return{get:a,set:b}}]),angular.module("Services").factory("cameraSvc",["$q",function(a){function b(){function b(a){confirm("Upload image to expense?")?d.resolve(a):d.reject()}function c(){alert("Fail"),d.reject()}var d=a.defer();return alert("navigator.camera is "+navigator.camera),navigator.camera.getPicture(b,c,{quality:50,targetWidth:100,targetHeight:100,destinationType:Camera.DestinationType.FILE_URI}),d.promise}return{takePhoto:b}}]),angular.module("Services").factory("projectRepositorySvc",["$resource","baseUrlMockeyWeb","projectsUrl",function(a,b,c){return a(b+c,{},{getProjects:{method:"GET",isArray:!1}})}]),angular.module("Reports").factory("reportsRepositorySvc",["$resource","baseUrlMockeyWeb","reportsUrl",function(a,b,c){return a(b+c+"?token="+localStorage.getItem("session-token"),{},{getReports:{method:"GET",isArray:!0},saveReports:{method:"POST"},editReports:{method:"PUT"},deleteReports:{method:"DELETE"}})}]),angular.module("Reports").factory("reportsSharingSvc",["$q","reportsRepositorySvc",function(a,b){function c(){var c=a.defer();return 0==d.length?b.getReports().$promise.then(function(a){d=a,c.resolve(d)}):c.resolve(d),c.promise}var d=[],e=null;return{setReport:function(a){e=a},getReport:function(){return e},getReports:c}}]),angular.module("Expenses").factory("expenseSvc",["expensesRequestNotificationChannelSvc","currenciesSvc","expenseTypesSvc",function(a,b,c){function d(d,e){function f(){var a=b.get();a.some(function(a){return a.id===k.originalCurrencyId?(k.currency=a,!0):void 0}),!k.currency}function g(){var a=c.get();a.some(function(a){return a.name===k.expenseTypeName?(k.expenseType=a,!0):void 0}),!k.expenseType}function h(){k.showDetails=!1}function i(a,b){k.expenseId!==a&&(b?(k.showDetails=!1,k.enabled=!1):k.enabled=!0)}function j(){f(),g(),a.onSelectModeActivated(d,h),a.onDetailsModeActivated(d,i)}var k=this;k.expenseId=e.expenseId,k.submiter=e.submiter,k.owner=e.owner,k.description=e.description,k.invoiceNumber=e.invoiceNumber,k.date=e.date,k.originalCurrencyId=e.originalCurrencyId,k.originalAmount=e.originalAmount,k.exchangeRate=e.exchangeRate,k.expenseTypeName=e.type,k.imageType=e.imageType,k.currency=null,k.expenseType=null,k.showDetails=!1,k.selected=!1,k.enabled=!0,j()}function e(a,b){return new d(a,b)}return d.prototype.toggleDetails=function(){this.enabled&&(this.selected=!1,this.showDetails=!this.showDetails,a.activateDetailsMode(this.expenseId,this.showDetails))},d.prototype.toggleSelect=function(){this.enabled&&!this.showDetails&&(this.selected=!this.selected)},{getExpense:e}}]),angular.module("Expenses").factory("expensesBufferingSvc",["expensesRepositorySvc","$q","expenseSvc",function(a,b,c){function d(d){var e=b.defer();return a.getExpenses().$promise.then(function(a){f=a.expenses.map(function(a){return c.getExpense(d,a)}),f=f.splice(0,4),e.resolve(f)}),e.promise}function e(a){var c=b.defer();return f.length>0?(g=f.splice(0,5),c.resolve(g)):d(a).then(function(a){c.resolve(a)}),c.promise}var f=[],g=[];return{getExpenses:d,getMoreExpenses:e}}]),angular.module("Expenses").factory("expensesRepositorySvc",["$resource","baseUrlMockeyWeb","expensesUrl",function(a,b,c){return a(b+c,{image:"@image"},{getExpenses:{method:"GET",isArray:!1},getImage:{method:"GET",isArray:!1},createExpense:{method:"POST"},saveExpense:{method:"PUT"},deleteExpense:{method:"DELETE"}})}]),angular.module("Expenses").factory("expensesRequestNotificationChannelSvc",["$rootScope","selectModeActivated","detailsModeActivated",function(a,b,c){var d=function(){a.$broadcast(b)},e=function(a,c){a.$on(b,function(){c()})},f=function(b,d){a.$broadcast(c,{expenseId:b,isAnotherExpenseOpened:d})},g=function(a,b){a.$on(c,function(a,c){b(c.expenseId,c.isAnotherExpenseOpened)})};return{activateSelectMode:d,onSelectModeActivated:e,activateDetailsMode:f,onDetailsModeActivated:g}}]),angular.module("Expenses").factory("editExpenseSvc",[function(){function a(){return e}function b(a){e=a}function c(a){f=a}function d(){return f}var e=null,f=null;return{getExpenseForEdit:a,setExpenseForEdit:b,setReport:c,getReport:d}}]),angular.module("Filters",[]).config(function(){}),angular.module("Directives",[]).config(function(){}),angular.module("Directives").directive("decimalPlaces",function(){return{link:function(a,b){b.bind("keypress",function(a){var b=$(this).val()+(0!==a.charCode?String.fromCharCode(a.charCode):"");0===$(this).val().search(/(.*)\.[0-9][0-9]/)&&b.length>$(this).val().length&&a.preventDefault()})}}}),angular.module("Directives").directive("loading",["requestNotificationChannelSvc",function(a){return{restrict:"E",replace:!0,template:'<div class="msg errorMsg loader"><img src="resources/images/ajax-loader.gif" />LOADING...</div>',link:function(b,c){c.hide();var d=function(){c.show()},e=function(){c.hide()};a.onRequestStarted(b,d),a.onRequestEnded(b,e)}}}]),angular.module("Directives").directive("stopEvent",function(){return{restrict:"A",link:function(a,b,c){b.bind(c.stopEvent,function(a){a.stopPropagation()})}}}),angular.module("Directives").directive("backButton",function(){return{restrict:"A",link:function(a,b){b.on("click",function(){history.back()})}}});