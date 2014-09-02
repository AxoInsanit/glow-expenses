'use strict';

angular.module('Directives').directive('loading', ['requestNotificationChannelSvc',
    function (requestNotificationChannelSvc) {
        return {
            restrict: 'E',
            replace:true,
            templateUrl: '/scripts/directives/views/loader.html',
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
