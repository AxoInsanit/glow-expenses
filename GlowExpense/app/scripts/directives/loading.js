'use strict';

angular.module('Directives').directive('loading', ['requestNotificationChannelSvc',
    function (requestNotificationChannelSvc) {
        return {
            restrict: 'E',
            replace:true,
            template: '<div class="msg errorMsg loader"><img src="resources/images/ajax-loader.gif" />LOADING...</div>',
            link: function (scope, element) {

                // hide the element initially
                element.hide();

                var startRequestHandler = function() {
                    // got the request start notification, show the element
                    element.show();
                };

                var endRequestHandler = function() {
                    // got the request start notification, show the element
                    element.hide();
                };

                requestNotificationChannelSvc.onRequestStarted(scope, startRequestHandler);

                requestNotificationChannelSvc.onRequestEnded(scope, endRequestHandler);
            }
        };
    }
]);
