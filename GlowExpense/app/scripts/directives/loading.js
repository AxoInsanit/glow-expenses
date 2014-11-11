'use strict';

angular.module('Directives').directive('loading', ['requestNotificationChannelSvc',
    function (requestNotificationChannelSvc) {
        return {
            restrict: 'E',
            replace:true,
            template: '<div class="loader"><div class="loader-content"><img class="centered" src="resources/images/loader-globant.gif"/></div></div>',
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
