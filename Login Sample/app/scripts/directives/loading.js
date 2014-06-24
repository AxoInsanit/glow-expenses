/* global app:true */
/* global $:true */

'use strict';

    app.directive('loading', function () {
        return {
            restrict: 'E',
            replace:true,
            template: '<div class="msg errorMsg"><img src="images/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
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
