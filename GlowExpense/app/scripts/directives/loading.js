'use strict';

angular.module('Directives').directive('loading', ['requestNotificationChannelSvc',
    function (requestNotificationChannelSvc) {
        return {
            restrict: 'E',
            replace:true,
            template: '<div class="loader"><div tabindex="-1" role="dialog" class="transparent-background modal fade ng-isolate-scope in" style="z-index: 1060;display: block; z-index: 1050 , display: block"><div class="modal-dialog"><div class="modal-content"><div class="modal-body no-padding"><div class="message"><p><img src="resources/images/ajax-loader.gif"/></p></div></div></div></div></div></div>',
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
