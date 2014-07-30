/*global rocketDashboard:false */

$(function () {
    
    'use strict';
    
    (function ($, window, undefined) {

        /**
         * @namespace
         * @description Holds Methods that control the Containers Page.
         */
        rocketDashboard.Pages.Containers = {

            init: (function() {

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Adds an ajax loader spinner when refresh button is clicked on containers.
                 */
                $('.refresh-trigger').on('click', function() {

                    rocketDashboard.Utils.addAjaxLoader($(this).parents('.box, .widget, .tile').find('.box-content, .widget-content, .tile-content'));

                });

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Initializes sortable dashboard boxes.
                 */
                $('.sortable-containment-box .sortable').sortable({
                    connectWith: '.sortable-containment-box .sortable',
                    cursor: 'move',
                    containment: '.sortable-containment-box',
                    placeholder: 'ui-state-highlight'
                });

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Initializes sortable dashboard tiles.
                 */
                $('.sortable-containment-tile .sortable').sortable({
                    connectWith: '.sortable-containment-tile .sortable',
                    cursor: 'move',
                    containment: '.sortable-containment-tile',
                    placeholder: 'ui-state-highlight'
                });

            })()

        };

    })(jQuery, window);

});