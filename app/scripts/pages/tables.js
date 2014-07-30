/*global rocketDashboard:false */

$(function () {
    
    'use strict';
    
    (function ($, window, undefined) {

        /**
         * @namespace
         * @description Holds Methods that control the Tables Page.
         */
        rocketDashboard.Pages.Tables = {

            init: (function() {

                $('#dynatable').dynatable({
                    dataset: {
                        perPageDefault: 10,
                        perPageOptions: [5,10,25,50]
                    }
                });

            })()

        };

    })(jQuery, window);

});