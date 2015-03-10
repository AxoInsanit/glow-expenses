'use strict';

angular.module('Directives').directive('loading', ['requestNotificationChannelSvc',
    function (requestNotificationChannelSvc) {
        return {
            restrict: 'E',
            replace:true,
            template: '<div class="loader"><div class="loader-content"><div class="centered"><span class="icon-loading icon-spinner10 loading-spin"></span></div></div></div>',
            link: function (scope, element) {

                element.hide();

                var startRequestHandler = function() {
                    element.show();
                };

                var endRequestHandler = function() {
                    element.hide();
                };

                requestNotificationChannelSvc.onRequestStarted(scope, startRequestHandler);

                requestNotificationChannelSvc.onRequestEnded(scope, endRequestHandler);
            }
        };
    }
]);
