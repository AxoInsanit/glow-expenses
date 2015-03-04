'use strict';

angular.module('Reports')
    .factory('ReportModel', function(reportResource, userResource) {

        function Report(initData){
            var report = this;
            angular.extend(this, initData);

            if (!this.owner) {
                userResource.getGlober().then(function (glober) {
                    report.owner = glober.email.substring(0, glober.email.indexOf('@'));
                });
            }
        }

        Report.prototype.save = function () {
            var promise;
            if (this.expenseReportId) {
                promise = reportResource.updateReport(this.getData());
            } else{
                promise = reportResource.createReport(this.getData());
            }
            return promise;
        };

        Report.prototype.getData = function () {
            return {
                expenseReportId: this.expenseReportId,
                description: this.description,
                applyTo: this.applyTo,
                entityId: this.entityId,
                expenseIds: this.expenseIds,
                owner: this.owner
            };
        };

        return Report;
    });


