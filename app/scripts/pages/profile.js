/*global rocketDashboard:false */

$(function () {

    'use strict';

    (function ($, window, undefined) {

        /**
         * @namespace
         * @description Holds Methods that control the Profile Page.
         */
        rocketDashboard.Pages.Profile = {

            init: (function() {

                var $badgesHolder = $('#badges-holder');

                rocketDashboard.Utils.addAjaxLoader($badgesHolder);

                $.ajax({
                    url: 'https://xboxapi.com/v1/achievements/1396901878/eruecco',
                    type: 'GET',
                    success: function(data) {

                        rocketDashboard.Utils.removeAjaxLoader($badgesHolder);

                        $badgesHolder.css({
                            minHeight: 0
                        });

                        $.each(data.Achievements, function(index, value) {

                            if ( index <= 15 ) {

                                $badgesHolder.find('.row').append('<div class="col-xs-3 badge-' + index + '" style="text-align: center; margin-bottom: 10px;"><img class="img-thumbnail img-responsive" src="' + value.TileUrl +  '"></div>');

                            }

                        });

                    }
                });

            })()

        };

    })(jQuery, window);

});
