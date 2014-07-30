/*global rocketDashboard:false */
/*global Ladda:false */

$(function () {
    
    'use strict';
    
    (function ($, window, undefined) {

        var laddaButton = [];

        /**
         * @namespace
         * @description Holds Methods that control the Buttons Page.
         */
        rocketDashboard.Pages.Buttons = {

            init: (function() {

                $('.ladda-button').each(function(index, element) {

                    laddaButton[index] = Ladda.create(element);

                    $(element).on('click', function(e) {

                        e.preventDefault();

                        laddaButton[index].start();

                        setTimeout(function() {
                            laddaButton[index].stop();
                        }, 2000);

                    });

                });

            })()

        };

    })(jQuery, window);

});