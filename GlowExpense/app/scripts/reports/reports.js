'use strict';

angular.module('Reports', [])
    .config(function () {})
    .constant('addReportErrorMsg','Please complete all fields!')
    .constant('entityName','Report')
    .constant('reportDetailsPath','/report-details')
    .constant('reportsPath','/reports')
    .constant('editExpensePath','/edit-expense')
    .constant('projectEntityName','project')
    .constant('createReportTitle','Create Report')
    .constant('editReportTitle','Edit Report')
    .constant('createReportBtnLabel','Create')
    .constant('editReportBtnLabel','Save')
    .constant('projectAssigned','Project Assigned')
    .constant('allProjects','All Projects');