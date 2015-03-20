'use strict';

// Define the angular module.
angular.module('Directives', [])
    .directive('swipeAndSnap', function ($timeout) {
        return {
            scope: {},
            link: function (scope, element, attr) {

                var snapCount = parseInt(attr.swipeAndSnap, 10),
                    restPosition = 0, // Define the location to end.
                    positionX = 0,
                    Hammer = window.Hammer,
                    activeView = parseInt(attr.activeView, 10),
                    snapLocations = [], // The current position.
                    tolerance = window.innerWidth * 0.5, //pixels measure
                    viewChanged = false,
                    timeToWait;

                for (var i = 0; i < snapCount; i += 1) {
                    var value = (-1) * i * window.innerWidth;
                    snapLocations.push({
                        value: value,
                        boundary: -Math.abs(value + tolerance)
                    });
                }

                element.css('width', (snapCount * 100) + '%');

                var calculate_snap_location = function (position) {

                    if (activeView === 1 && (position > snapLocations[0].boundary )) {//current view reports
                        activeView = 0;
                        viewChanged = true;
                    }
                    else {
                        if (activeView === 0 && (position < snapLocations[1].boundary )) {//current view expenses
                            activeView = 1;
                            viewChanged = true;
                        }
                    }
                    return snapLocations[activeView].value;
                };

                function translateView(x) {
                    element.css('-webkit-transform', 'translate3d(' + x + 'px,0px,0px)');
                    element.css('transform', 'translate3d(' + x + 'px,0px,0px)');
                }

                function swipeLocation(ev) {
                    positionX = restPosition + parseInt(ev.deltaX, 10);
                    if ((positionX < snapLocations[0].value) && (positionX > snapLocations[1].value)) {
                        translateView(positionX);
                    }
                }

                function notifyViewChange() {
                    if (attr.onPanEnd) {
                        scope.$parent.$eval(attr.onPanEnd, {$activeView: activeView});
                    }
                }

                function notifyWidthViewPort(value) {
                    if (!value) {
                        value = (activeView === 0) ? 100 : 50;
                    }
                    scope.$parent.widthOfFixedElement(value);
                }

                /**
                 * Perform any setup for the drag actions.
                 */
                Hammer(element[0]).on('panstart', function() {
                    // We dont want an animation delay when dragging.
                    element.removeClass('swipe-animate');
                    element.addClass('overflow-disable');
                    viewChanged = false;
                    $timeout.cancel(timeToWait);
                });

                /**
                 * Follow the drag position when the user is interacting.
                 */
                Hammer(element[0]).on('panmove', function(ev) {
                    var requestAnimFrame = window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
                            function(callback){
                                window.setTimeout(callback, 1000 / 60);
                            };
                    var cancelAnimFrame = window.cancelAnimationFrame ||
                            window.webkitCancelRequestAnimationFrame ||
                            window.webkitCancelAnimationFrame ||
                            window.mozCancelRequestAnimationFrame || window.mozCancelAnimationFrame ||
                            window.oCancelRequestAnimationFrame || window.oCancelAnimationFrame ||
                            window.msCancelRequestAnimationFrame || window.msCancelAnimationFrame ||
                            clearTimeout;
                    var requestAnimId;


                    (function animate() {
                        requestAnimId = requestAnimFrame(animate);
                        swipeLocation(ev);
                        cancelAnimFrame(requestAnimId);
                    }());
                });

                /**
                 * The drag is finishing so we'll animate to a snap point.
                 */
                Hammer(element[0]).on('panend pancancel', function() {
                    element.addClass('swipe-animate');
                    element.removeClass('overflow-disable');

                    // Work out where we should "snap" to.
                    restPosition = calculate_snap_location(positionX);
                    translateView(restPosition);
                    if (viewChanged) {
                        //Change title border instantly but wait for animation to finish before changing route.
                        scope.$parent.setActiveview(activeView);
                        timeToWait = $timeout(function () {
                            notifyViewChange();
                        }, 300); //wait animation to finish
                    }
                    notifyWidthViewPort(50);
                });

                if (activeView) {
                    translateView(snapLocations[activeView].value);
                    restPosition = snapLocations[activeView].value;
                }

                notifyWidthViewPort();

                scope.$on('swipeAndSnap::changeView', function (e, viewIndex) {
                    activeView = viewIndex;
                    element.addClass('swipe-animate');
                    element.removeClass('overflow-disable');
                    translateView(snapLocations[activeView].value);
                    restPosition = snapLocations[activeView].value;
                    notifyWidthViewPort(50);
                });
            }
        };
    });
