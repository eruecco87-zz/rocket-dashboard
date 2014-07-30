/*global Messenger:false */

$(function () {

    'use strict';

    (function ($, window, undefined) {

        /**
         * @name rocketDashboard
         * @namespace
         * @description rocketDashboard Global Namespace Definition.
         */
        var rocketDashboard = window.rocketDashboard = window.rocketDashboard || {};

        /**
         * Rocket Dashboard configuration object.
         */
        var rocketDashboardConfig = {
            scrollColor: '#2980b9'
        };

        /**
         * Messenger plugin defaults
         * http://github.hubspot.com/messenger/docs/welcome/
         */
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
            theme: 'flat'
        };

        /**
         * Spin.js plugin options.
         * http://fgnass.github.io/spin.js/
         */
        var spinnerOptions = {
            lines: 7,
            length: 4,
            width: 5,
            radius: 9,
            corners: 0.7,
            rotate: 25,
            direction: 1,
            color: '#000',
            speed: 1.6,
            trail: 91,
            shadow: true,
            hwaccel: false,
            className: 'spinner',
            zIndex: 2e9,
            top: '50%',
            left: '50%',
            backdropColor: '#000',
            backdropOpacity: 0.1
        };


        /**
         * Fixes the main container height when the content
         * is smaller than the viewport.
         */
        function fixMinContentHeight() {

            var windowHeight = $(window).height(),
                topNavHeight = $('.top-nav').height(),
                bottomnavHeight = $('.bottom-nav').height(),
                pageTitleHeight = $('.page-title').height(),
                mainContainerHeight = windowHeight;


            if (topNavHeight) {
                mainContainerHeight -= topNavHeight;
            }

            if (bottomnavHeight) {
                mainContainerHeight -= bottomnavHeight;
            }

            if (pageTitleHeight) {
                mainContainerHeight -= pageTitleHeight;
            }

            mainContainerHeight -= 32; // Bottom Padding Offset fix

            $('.main-container').css({
                'min-height': mainContainerHeight + 'px'
            });

        }

        /**
         * @namespace
         * @description Utilities and Methods for Rocket Dashboard.
         */
        rocketDashboard.Utils = {

            /**
             * Handles minimization and maximization of containers
             */
            containerCollapse: function(selector, trigger, iconSwitch) {

                $(selector).each(function(index, element) {

                    $(element).find(trigger).on('click', function(event) {

                        event.preventDefault();

                        var $this = $(this),
                            $containerHeader = $this.parents('[class$="-header"]'),
                            $containerBody = $containerHeader.next(),
                            $containerFooter = $containerBody.next(),
                            $container = $containerHeader.parent();

                        if (iconSwitch) {

                            $this.find('i').toggleClass('fa-minus fa-plus');

                        }

                        $containerBody.slideToggle(function() {

                            $container.toggleClass('container-collapsed');

                        });

                        if ($containerFooter) {

                            $containerFooter.slideToggle();

                        }

                    });

                });

            },

            /**
             * Handles the removing functionality of containers
             */
            containerRemove: function(selector, trigger) {

                $(selector).each(function(index, element) {

                    $(element).find(trigger).on('click', function(event) {

                        event.preventDefault();

                        var $this = $(this),
                            $containerHeader = $this.parents('[class$="-header"]'),
                            $container = $containerHeader.parent();


                        $container.css('position', 'relative').animate({
                            'left': '15px',
                            'opacity': '0'
                        }, function() {
                            $container.remove();
                        });

                    });

                });

            },

            /**
             * Handles fixing a container to the page scroll.
             */
            containerStick: function(selector) {

                if ($(selector).length > 0) {

                    var containerStuck = $(selector).offset().top;

                }

                $(window).scroll(function(){

                    var windowTop = $(window).scrollTop();

                    if (containerStuck < windowTop) {

                        $(selector).css({
                            position: 'fixed',
                            top: 0
                        }).addClass('scrolling');

                        /**
                         * Fixes margins so top-nav-fixed and sidebar-fixed can live together.
                         */
                        if ( $('.sidebar-fixed') && $('.top-nav-fixed') && $('.bottom-nav-fixed').length === 0 ) {

                            $('.sidebar-fixed').css({
                                marginTop: $('.top-nav-fixed').height()
                            });

                        }

                        /**
                         * Fixes margins so bottom-nav-fixed and sidebar-fixed can live together.
                         */
                        if ( $('.sidebar-fixed') && $('.bottom-nav-fixed') && $('.top-nav-fixed').length === 0 ) {

                            $('.sidebar-fixed').css({
                                marginTop: $('.bottom-nav-fixed').height()
                            });

                        }

                        /**
                         * Fixes margins so top-nav-fixed, bottom-nav-fixed and sidebar-fixed can live together.
                         */
                        if ( $('.sidebar-fixed') && $('.top-nav-fixed') && $('.bottom-nav-fixed') ) {

                            $('.bottom-nav-fixed').css({
                                marginTop: $('.top-nav-fixed').height()
                            });

                            $('.sidebar-fixed').css({
                                marginTop: $('.top-nav-fixed').height() + $('.bottom-nav-fixed').height()
                            });

                        }

                    }

                    else {

                        $(selector).css('position','static').removeClass('scrolling');

                        /**
                         * Fixes margins so top-nav-fixed and sidebar-fixed can live together.
                         */
                        if ( $('.sidebar-fixed') && $('.top-nav-fixed') && $('.bottom-nav-fixed').length === 0 ) {

                            $('.sidebar-fixed').css({
                                marginTop: 0
                            });

                        }

                        /**
                         * Fixes margins so bottom-nav-fixed and sidebar-fixed can live together.
                         */
                        if ( $('.sidebar-fixed') && $('.bottom-nav-fixed') && $('.top-nav-fixed').length === 0 ) {

                            $('.sidebar-fixed').css({
                                marginTop: 0
                            });

                        }

                        /**
                         * Fixes margins so top-nav-fixed, bottom-nav-fixed and sidebar-fixed can live together.
                         */
                        if ( $('.sidebar-fixed') && $('.top-nav-fixed') && $('.bottom-nav-fixed') ) {

                            $('.bottom-nav-fixed, .sidebar-fixed').css({
                                marginTop: 0
                            });

                        }

                    }

                });

            },

            /**
             * Adds an ajax loader animation to an element.
             */
            addAjaxLoader: function($element, backdrop) {

                if ( $element.find('.' + spinnerOptions.className).length > 0 ) {

                    return false;

                }

                if ( backdrop === undefined ) {

                    backdrop = true;

                }

                if ( backdrop === false ) {

                    spinnerOptions.backdropOpacity = 0;

                }

                $element.prepend('<div class="' + spinnerOptions.className + '-backdrop">');

                $element.find('.' + spinnerOptions.className + '-backdrop').css({
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    backgroundColor: spinnerOptions.backdropColor,
                    opacity: spinnerOptions.backdropOpacity
                });

                $element.css('position', 'relative').spin(spinnerOptions);

            },

            /**
             * Removes the ajax loader animation from the element.
             */
            removeAjaxLoader: function($element) {

                $element.spin(false);

                $element.find('.' + spinnerOptions.className + '-backdrop').remove();

            },

            /**
             * Initializes table collapsing functionality.
             */
            tableCollapse: function(tableSelector, triggerSelector, collapsedSelector, closedIcon, openIcon) {

                $(tableSelector).find(triggerSelector).on('click', function() {

                    $(this).find('i').toggleClass(closedIcon + ' ' + openIcon);
                    $(this).parents('tr').next(collapsedSelector).slideToggle();

                });

            }

        };

        /**
         * @namespace
         * @description Holds Apps that can be integrated in Rocket Dashboard.
         */
        rocketDashboard.Apps = {};

        /**
         * @namespace
         * @description Holds Pages that extend Rocket Dashboard.
         */
        rocketDashboard.Pages = {};

        /**
         * @namespace
         * @description Holds Global Rocket Dashboard Behavior Methods.
         */
        rocketDashboard.Main = (function () {

            /**
             * @scope rocketDashboard.main
             */
            return {

                init: (function() {

                    /**
                     * Fixes the main container height when the content
                     * is smaller that the viewport.
                     */
                    fixMinContentHeight();

                    /**
                     * Initializes Slimscroll on top-nav dropdowns.
                     */
                    $('.top-nav .dropdown-holder').slimScroll({
                        height: '250px',
                        distance: '6px',
                        color: rocketDashboardConfig.scrollColor
                    });

                    /**
                     * Initializes Slimscroll on offcanvas-nav.
                     */
                    $('.navmenu .navmenu-holder').slimScroll({
                        height: '100%',
                        distance: '6px',
                        color: rocketDashboardConfig.scrollColor
                    });

                    /**
                     * Initializes fixed containers.
                     */
                    rocketDashboard.Utils.containerStick('.top-nav-fixed, .bottom-nav-fixed, .sidebar-fixed');

                    /**
                     * Adds a slim scroll to sidebar if its fixed and larger than the window.
                     */
                    if ( $('.sidebar-fixed') ) {

                        $('.sidebar-fixed').slimScroll({
                            height: '100%',
                            distance: '12px',
                            color: rocketDashboardConfig.scrollColor
                        });

                    }

                    /**
                     * Initializes tooltip funcitonalities.
                     */
                    $('*[data-toggle="tooltip"]').tooltip();

                    /**
                     * Initializes all containers collapse functionality.
                     */
                    rocketDashboard.Utils.containerCollapse('.box, .widget, .tile', '.collapse-toggle', true);

                    /**
                     * Initializes all containers remove functionality.
                     */
                    rocketDashboard.Utils.containerRemove('.box, .widget, .tile', '.remove-trigger');

                    /**
                     * Redraws Morris.js Charts that are in a hidden tab when selected.
                     */
                    $('*[data-toggle="tab"]').on('shown.bs.tab', function () {

                        var tabContainerId = $(this).attr('href'),
                            $container = $(tabContainerId),
                            $chart = $container.find('svg'),
                            $chartParent = $chart.parent();


                        if ( $chart.length > 0 ) {

                            var chart = $chartParent.data('chart');
                            eval(chart + '.redraw()'); // jshint ignore:line

                        }

                    });

                    /**
                     * Redraws Morris.js Charts that are in a hidden collapse panel when selected.
                     */
                    $('.panel-group').on('show.bs.collapse', function () {

                        var $container = $(this),
                            $chart = $container.find('svg');


                        if ( $chart.length > 0 ) {

                            $chart.hide();

                        }

                    });

                    $('.panel-group').on('shown.bs.collapse', function () {

                        var $container = $(this),
                            $chart = $container.find('.panel-collapse:visible').find('svg'),
                            $chartParent = $chart.parent();


                        if ( $chart.length > 0 ) {

                            var chart = $chartParent.data('chart');
                            $chart.fadeIn();
                            eval(chart + '.redraw()'); // jshint ignore:line

                        }

                    });

                    /**
                     * Initializes table collapsing functionality.
                     */
                    rocketDashboard.Utils.tableCollapse('.table-collapse', '.row-collapsed-trigger', '.row-collapsed', 'fa-plus-square', 'fa-minus-square');


                })()

            };

        }());

    })(jQuery, window);

});
