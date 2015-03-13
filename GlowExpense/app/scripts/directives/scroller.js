/**
 * Created by gbaigorria on 12/08/14.
 *
 * This directive can be used to access the scroll of any element from a controller.
 *
 * Usage
 *
 *   <scroller element="#sp-page" position="scrollPosition"></scroller>
 *
 *   The element is specified by an css selector and the position is double bound to the scope of the controller.
 *
 *   You can get and/or set the current scroll from $scope.scrollPosition (or whatever propertie name oyu choose to bound)
 */

'use strict';

angular.module('Directives').directive('scroller', function ($timeout, $rootScope) {
    return {
        restrict:'E',
        replace:true,
        scope:{
            event:'@?',
            position:'=?',
            element:'@'
        },
        controller:function ($scope) {
            //get target scroll element
            var element = angular.element($scope.element);
            var unsuscribeEvent;
            // watch for position changes
            $scope.$watch('position', function(value){
                if(angular.isDefined(value)){
                    var val = parseInt(value,10);
                    // if not from scrolHandler and valid number
                    if( !$scope.fromDirective && !isNaN(val) ){
                        $timeout( function(){
                            // set scroll when dom rendered
                            element.scrollTop(val);
                        },0);
                    }
                    $scope.fromDirective = false;
                }
            });

            // if an event was defined
            if($scope.event){
                // listen for it
                unsuscribeEvent = $rootScope.$on($scope.event,function(ev, val){
                    // and set the requested value
                    element.scrollTop(val);
                    ev.stopPropagation();
                });
            }

            // scroll handler 
            var scrollHandler = function(){
                // update scope with current value
                $scope.position = element.scrollTop();
                // avoid above $watch
                $scope.fromDirective = true;
            };
            // bind to element scroll event
            element.on('scroll',scrollHandler);
            // unbind omn directive scope destroyed
            $scope.$on('$destroy', function(){
                element.off('scroll',scrollHandler);
                if(unsuscribeEvent){
                    unsuscribeEvent();
                }
            });
        }
    };
});
