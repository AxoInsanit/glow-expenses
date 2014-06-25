/* global $:true */

'use strict';

angular.module('Directives').directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div class="msg errorMsg loader"><img src="resources/images/ajax-loader.gif" />LOADING...</div>',
        link: function (scope, element) {
            scope.$watch('loading', function (val) {
                if (val){
                    $(element).show();
                }
                else
                {
                    $(element).hide();
                }

            });
        }
    };
});
