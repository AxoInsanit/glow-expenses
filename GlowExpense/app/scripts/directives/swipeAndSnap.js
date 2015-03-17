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
                    tolerance = 100, //pixels measure
                    minExp,
                    minRep;

                for (var i = 0; i < snapCount; i += 1) {
                    snapLocations.push((-1) * i * window.innerWidth);
                }

                minExp = snapLocations[0] - tolerance;
                minRep = snapLocations[1] + tolerance;

                element.css('width', (snapCount * 100) + '%');

                var calculate_snap_location = function (position) {

                    if (activeView === 1 && (position > minExp )) {//current view reports
                        activeView = 0;
                    }
                    else {
                        if (activeView === 0 && (position < minRep )) {//current view expenses
                        activeView = 1;
                        }
                    }
                    return snapLocations[activeView];
                /*
                // Used to store each difference between current position and each snap point.
                var currentDiff;

                // Used to store the current best difference.
                var minimumDiff;

                // User to store the best snap position.
                var bestSnap = snapLocations[0];

                // We're going to cycle through each snap location
                // and work out which is closest to the current position.


                for (var i=0; i < snapLocations.length; i++) {

                    // Calculate the difference.
                    currentDiff = Math.abs(position - snapLocations[i]);

                    // Works out if this difference is the closest yet.
                    if(minimumDiff === undefined || currentDiff < minimumDiff) {
                        minimumDiff = currentDiff;
                        bestSnap = snapLocations[i];
                        activeView = i;
                    }
                }

                return bestSnap;
                */
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

                /**
                 * Perform any setup for the drag actions.
                 */
                Hammer(element[0]).on('panstart', function() {
                    // We dont want an animation delay when dragging.
                    element.removeClass('swipe-animate');
                    element.addClass('overflow-disable');
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
                    notifyViewChange();
                });

                if (activeView) {
                    translateView(snapLocations[activeView]);
                }


                scope.$on('swipeAndSnap::changeView', function (e, viewIndex) {
                    activeView = viewIndex;
                    element.addClass('swipe-animate');
                    element.removeClass('overflow-disable');
                    translateView(snapLocations[viewIndex]);
                });
            }
        };
    });
