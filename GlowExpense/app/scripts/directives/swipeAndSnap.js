/* jshint-W117 */
'use strict';

// Define the angular module.
angular.module('Directives', [])
    .directive('swipeAndSnap', function () {
        return {
            scope: {},
            link: function (scope, element, attr) {

                var activeView = parseInt(attr.activeView, 10),
                    expensesSlide = angular.element(element[0].querySelector('#expenses-slide')),
                    reportsSlide = angular.element(element[0].querySelector('#reports-slide')),
                    editOptSlide = angular.element(element[0].querySelector('#edit-opt')),
                    translateStart;

                function setSlidesStyle() {
                    expensesSlide.css('overflow-y','auto');
                    /*fix for edit options fixed banner*/
                    expensesSlide.css('position','initial');
                    expensesSlide.css('-webkit-transform','none');
                    reportsSlide.css('overflow-y','auto');
                    translateStart = false;
                }

                function notifyViewChange() {
                    if (attr.onPanEnd) {
                        scope.$parent.$eval(attr.onPanEnd, {$activeView: activeView});
                    }
                }

                scope.$on('swipeAndSnap::changeView', function (e, viewIndex) {
                    activeView = viewIndex;
                    mySwiper.slideTo( activeView,500 /*transition duration*/, function(){
                        setSlidesStyle();
                        editOptSlide.css('visibility','');
                    });
                });

                var mySwiper  = new Swiper('.swiper-container',{
                    onSlideChangeEnd : function() {
                        activeView = mySwiper.activeIndex;
                        notifyViewChange();
                    },
                    onSetTranslate : function() {
                        if (!translateStart) {
                            expensesSlide.scrollTop(0);
                            reportsSlide.scrollTop(0);
                            expensesSlide.css('overflow-y','');
                            expensesSlide.css('position','');
                            expensesSlide.css('-webkit-transform','');
                            reportsSlide.css('overflow-y','');
                            editOptSlide.css('visibility','hidden');
                            translateStart = true;
                        }
                    },
                    onTransitionEnd : function() {
                        setSlidesStyle();
                        editOptSlide.css('visibility','');
                    },
                    resistanceRatio: 0,
                    slidesPerView: 1
                });

                setSlidesStyle();
                mySwiper.slideTo(activeView, 0 /*transition duration*/, false /*callback*/);
            }
        };
    });