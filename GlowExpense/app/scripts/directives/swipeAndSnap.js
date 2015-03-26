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
                    orientation, //user is scrolling vertically or horizontally
                    swipeLocked, //lock swipe left-rigth if user is scrolling horizontally
                    timeToWait;

                for (var i = 0; i < snapCount; i += 1) {
                    snapLocations.push((-1) * i * window.innerWidth);
                }

                element.css('width', (snapCount * 100) + '%');

                var calculate_snap_location = function (position) {
                    //extend to n views
                    var moveToView = (Math.abs(position) < tolerance) ? 0 : Math.floor( (Math.abs(position) + tolerance) / (tolerance * 2));
                    if (moveToView !== activeView){
                        activeView = moveToView;
                        viewChanged = true;
                    }
                    return snapLocations[activeView];
                };

                function translateView(x) {
                    element.css('-webkit-transform', 'translate3d(' + x + 'px,0px,0px)');
                    element.css('transform', 'translate3d(' + x + 'px,0px,0px)');
                }

                function swipeLocation(ev) {
                    positionX = restPosition + parseInt(ev.deltaX, 10);
                    if ((positionX < snapLocations[0]) && (positionX > snapLocations[snapLocations.length - 1])) {
                        translateView(positionX);
                    }
                }

                function notifyViewChange() {
                    if (attr.onPanEnd) {
                        scope.$parent.$eval(attr.onPanEnd, {$activeView: activeView});
                    }
                }

                /**
                 * Perform any setup for the drag actions.
                 */
                Hammer(element[0]).on('panstart', function() {
                    // We dont want an animation delay when dragging.
                    element.removeClass('swipe-animate');
                    element.addClass('overflow-disable');
                    viewChanged = false;
                    orientation = false;
                    $timeout.cancel(timeToWait);
                });

                /**
                 * Follow the drag position when the user is interacting.
                 */
                Hammer(element[0]).on('panmove', function(ev) {
                    if (!orientation){
                        var angle = Math.abs(ev.angle) % 180,
                            result = (angle < 90) ? angle : 180 - angle;
                        swipeLocked = (result > 20);
                        orientation = true;
                    }
                    if (!swipeLocked) {
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
                    }
                });

                /**
                 * The drag is finishing so we'll animate to a snap point.
                 */
                Hammer(element[0]).on('panend pancancel', function() {
                    element.addClass('swipe-animate');
                    element.removeClass('overflow-disable');

                    // Work out where we should "snap" to.
                    if ((positionX < snapLocations[0]) && (positionX > snapLocations[snapLocations.length - 1])) {
                        restPosition = calculate_snap_location(positionX);
                    }
                    translateView(restPosition);
                    if (viewChanged) {
                        //Change title border instantly but wait for animation to finish before changing route.
                        scope.$parent.setActiveview(activeView);
                        timeToWait = $timeout(function () {
                            notifyViewChange();
                        }, 300); //wait animation to finish
                    }
                });

                translateView(snapLocations[activeView]);
                restPosition = snapLocations[activeView];

                scope.$on('swipeAndSnap::changeView', function (e, viewIndex) {
                    activeView = viewIndex;
                    element.addClass('swipe-animate');
                    element.removeClass('overflow-disable');
                    translateView(snapLocations[activeView]);
                    restPosition = snapLocations[activeView];
                });
            }
        };
    });
