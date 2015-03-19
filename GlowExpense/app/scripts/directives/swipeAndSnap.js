'use strict';

// Define the angular module.
angular.module('Directives', [])
    .directive('swipeAndSnap', function () {
        return {
            scope: {},
            link: function (scope, element, attr) {

                var snapCount = parseInt(attr.swipeAndSnap, 10),
                    restPosition = 0, // Define the location to end.
                    positionX = 0,
                    dragging = false,
                    Hammer = window.Hammer,
                    activeView = parseInt(attr.activeView, 10),
                    snapLocations = [], // The current position.
                    tolerance = 120, //pixels measure
                    viewChanged = false;

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
                    if (dragging) {
                        positionX = restPosition + parseInt(ev.deltaX, 10);
                        translateView(positionX);
                        dragging = false;
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
                });

                /**
                 * Follow the drag position when the user is interacting.
                 */
                Hammer(element[0]).on('panmove', function(ev) {
                    if (!dragging) {
                        dragging = true;
                        window.requestAnimationFrame(function () {
                           swipeLocation(ev);
                        });
                    }

                });

                /**
                 * The drag is finishing so we'll animate to a snap point.
                 */
                Hammer(element[0]).on('panend pancancel', function() {
                    dragging = false;
                    element.addClass('swipe-animate');
                    element.removeClass('overflow-disable');

                    // Work out where we should "snap" to.
                    restPosition = calculate_snap_location(positionX);
                    translateView(restPosition);
                    if (viewChanged) {
                        notifyViewChange();
                    }
                    notifyWidthViewPort(50);
                });

                if (activeView) {
                    translateView(snapLocations[activeView].value);
                }

                notifyWidthViewPort();

                scope.$on('swipeAndSnap::changeView', function (e, viewIndex) {
                    activeView = viewIndex;
                    element.addClass('swipe-animate');
                    element.removeClass('overflow-disable');
                    translateView(snapLocations[viewIndex].value);
                    notifyWidthViewPort(50);
                });
            }
        };
    });
