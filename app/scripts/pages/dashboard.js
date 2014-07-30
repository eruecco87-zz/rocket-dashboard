/*global rocketDashboard:false */
/*global Messenger:false */
/*global Morris:false */
/*global moment:false */

$(function () {
    
    'use strict';
    
    (function ($, window, undefined) {

        /*
         * ------ FOR DEMO PURPOSES ------
         * Initializes x-editable plugin.
         */
        function initializeEditableTableFields() {

            $('.editable-item').editable({
                type: 'text',
                title: 'Enter Item Name',
                url: 'post/'
            });

            $('.editable-date').editable({
                type: 'combodate',
                title: 'Select Date',
                url: 'post/',
                format: 'MM-DD-YYYY',
                viewformat: 'MM-DD-YYYY',
                template: 'MM / DD / YYYY',
                combodate: {
                    minYear: 2000,
                    maxYear: 2015,
                    minuteStep: 1
                }
            });

        }

        /**
         * @namespace
         * @description Holds Methods that control the Dashboard Page.
         */
        rocketDashboard.Pages.Dashboard = {


            init: (function() {

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Displays the associated tab if theres a hash in the url.
                 */
                var url = document.location.toString();
                if (url.match('#')) {
                    $('.box-tabs a[href=#'+url.split('#')[1]+']').tab('show') ;
                }

                // Change hash for page-reload
                $('.box-tabs a').on('shown', function (e) {
                    window.location.hash = e.target.hash;
                });

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Triggers a Messenger notification and adds a new message to the messages dropdown.
                 */
                setTimeout(function() {
                    new Messenger().post({
                        message: 'You have received a new message',
                        showCloseButton: true
                    });

                    $('.dropdown-messages').prev().find('.badge').text('2');
                    $('.dropdown-messages').find('.nav').prepend('<li class="message alert-info"><a href="#"><span class="message-time"><i class="fa fa-clock-o"></i> 1 min</span><span class="message-title">Hal Jordan</span><span class="message-excerpt">Lorem ipsum dolor st amet...</span></a></li>');
                    $('.dropdown-messages').find('.dropdown-header').text('You have 2 new messages');

                }, 15000);

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Adds an ajax loader spinner when refresh button is clicked on containers.
                 */
                $('.refresh-trigger').on('click', function() {

                    rocketDashboard.Utils.addAjaxLoader($(this).parents('.box, .widget, .tile').find('.box-content, .widget-content, .tile-content'));

                });

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Initializes morris.js graph plugin.
                 */
                window.usageChartArea = Morris.Area({
                    element: 'usage-chart-area',
                    resize: true,
                    hideHover: true,
                    lineColors: ['#8e44ad', '#3498db'],
                    data: [
                        { y: '2006', a: 100, b: 32 },
                        { y: '2007', a: 75,  b: 65 },
                        { y: '2008', a: 50,  b: 10 },
                        { y: '2009', a: 75,  b: 65 },
                        { y: '2010', a: 50,  b: 40 },
                        { y: '2011', a: 75,  b: 65 },
                        { y: '2012', a: 100, b: 90 }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Series A', 'Series B']
                });

                window.serverChartArea = Morris.Bar({
                    element: 'server-chart-bar',
                    resize: true,
                    hideHover: true,
                    data: [
                        { y: '2006', a: 100, b: 90 },
                        { y: '2007', a: 75,  b: 65 },
                        { y: '2008', a: 50,  b: 40 },
                        { y: '2009', a: 75,  b: 65 },
                        { y: '2010', a: 50,  b: 40 },
                        { y: '2011', a: 75,  b: 65 },
                        { y: '2012', a: 100, b: 90 }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Series A', 'Series B']
                });

                window.collapseOneArea = Morris.Area({
                    element: 'collapse-one-area',
                    resize: true,
                    hideHover: true,
                    lineColors: ['#1abc9c', '#e67e22'],
                    data: [
                        { y: '2006', a: 25, b: 34 },
                        { y: '2007', a: 65,  b: 23 },
                        { y: '2008', a: 45,  b: 23 },
                        { y: '2009', a: 75,  b: 65 },
                        { y: '2010', a: 50,  b: 40 },
                        { y: '2011', a: 75,  b: 65 },
                        { y: '2012', a: 100, b: 90 }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Series A', 'Series B']
                });

                window.collapseTwoArea = Morris.Area({
                    element: 'collapse-two-area',
                    resize: true,
                    hideHover: true,
                    lineColors: ['#1abc9c', '#e67e22'],
                    data: [
                        { y: '2006', a: 25, b: 34 },
                        { y: '2007', a: 65,  b: 23 },
                        { y: '2008', a: 45,  b: 23 },
                        { y: '2009', a: 75,  b: 65 },
                        { y: '2010', a: 50,  b: 40 },
                        { y: '2011', a: 75,  b: 65 },
                        { y: '2012', a: 100, b: 90 }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Series A', 'Series B']
                });

                window.collapseThreeArea = Morris.Area({
                    element: 'collapse-three-area',
                    resize: true,
                    hideHover: true,
                    lineColors: ['#1abc9c', '#e67e22'],
                    data: [
                        { y: '2006', a: 25, b: 34 },
                        { y: '2007', a: 65,  b: 23 },
                        { y: '2008', a: 45,  b: 23 },
                        { y: '2009', a: 75,  b: 65 },
                        { y: '2010', a: 50,  b: 40 },
                        { y: '2011', a: 75,  b: 65 },
                        { y: '2012', a: 100, b: 90 }
                    ],
                    xkey: 'y',
                    ykeys: ['a', 'b'],
                    labels: ['Series A', 'Series B']
                });

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Initializes jQuery Knob plugin.
                 */
                $('#footer-chart-1, #footer-chart-2, #footer-chart-3').knob();


                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Initializes all sales table components when the Table tab is displayed.
                 */
                $('*[data-toggle="tab"]').on('shown.bs.tab', function () {

                    /*
                     * ------ FOR DEMO PURPOSES ------
                     * Initializes Bootstrap Select plugin.
                     */
                    $('#sales-table-item-filter').selectpicker();

                    /*
                     * ------ FOR DEMO PURPOSES ------
                     * Initializes Bootstrap Datepicker plugin.
                     */
                    $('#sales-table-date-min-filter, #sales-table-date-filter').datepicker({
                        format: 'mm-dd-yyyy',
                        todayHighlight: true
                    });

                    /*
                     * ------ FOR DEMO PURPOSES ------
                     * Initializes Ion RangeSlider plugin.
                     */
                    $('#sales-table-price-filter').ionRangeSlider({
                        min: 0,
                        max: 800,
                        type: 'double',
                        prefix: '$',
                        onChange: function() {

                            var $rangeSliderInput = $('#sales-table-price-filter');

                            $rangeSliderInput.val($rangeSliderInput.attr('value'));
                            $rangeSliderInput.trigger('change');

                        }
                    });

                    /*
                     * ------ FOR DEMO PURPOSES ------
                     * Initializes x-editable plugin.
                     */
                    initializeEditableTableFields();

                });

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Initializes dynatable plugin on the sales table.
                 */
                $('#sales-table').bind('dynatable:init', function(e, dynatable) {

                    /*
                     * ------ FOR DEMO PURPOSES ------
                     * item column filtering function.
                     */
                    dynatable.queries.functions.item = function(record, queryValue) {

                        // Matches the inner text of the editable item field to the item filer value.
                        if ( $(record.item)[0].innerHTML === queryValue) {

                            return record;

                        }

                    };

                    /*
                     * ------ FOR DEMO PURPOSES ------
                     * date column filtering function.
                     */
                    dynatable.queries.functions.date = function(record, queryValue) {

                        var recordDate = moment($(record.date)[0].innerHTML, 'MM-DD-YYYY'),
                            dateStart = moment($('#sales-table-date-min-filter').val(), 'MM-DD-YYYY'),
                            dateEnd = moment(queryValue, 'MM-DD-YYYY'),
                            dateRange = moment.range(dateStart, dateEnd),
                            inRange = dateRange.contains(recordDate);

                        if (inRange) {

                            return record;

                        }

                    };

                    /*
                     * ------ FOR DEMO PURPOSES ------
                     * price column filtering function.
                     */
                    dynatable.queries.functions.price = function(record, queryValue) {

                        var priceRange = queryValue.split(';'),
                            recordPrice = record.price.split('$');

                        recordPrice = parseInt(recordPrice[1], 10);

                        var minPrice = parseInt(priceRange[0], 10),
                            maxPrice = parseInt(priceRange[1], 10);


                        if ( recordPrice >= minPrice && recordPrice <= maxPrice ) {

                            return record;

                        }

                    };

                }).bind('dynatable:afterProcess', function()  {

                    /*
                     * ------ FOR DEMO PURPOSES ------
                     * Re initializes x-editable plugin after proccessed data.
                     */
                    initializeEditableTableFields();

                }).dynatable({
                    features: {
                        pushState: false
                    },
                    dataset: {
                        perPageDefault: 10,
                        perPageOptions: [5,10,25,50]
                    },
                    inputs: {
                        queries: $('#sales-table-item-filter, #sales-table-date-filter, #sales-table-price-filter')
                    }
                });


                /*
                 * ------ FOR DEMO PURPOSES ------
                 * clears item column filtering function.
                 */
                $('#clear-sales-table-item-filter').on('click', function(e) {

                    e.preventDefault();

                    $('#sales-table-item-filter').val('').trigger('change');

                });


                /*
                 * ------ FOR DEMO PURPOSES ------
                 * clears date column filtering function.
                 */
                $('#clear-sales-table-date-filter').on('click', function(e) {

                    e.preventDefault();

                    $('#sales-table-date-min-filter, #sales-table-date-filter').val('').trigger('change');

                });

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Initializes peity chart plugin.
                 */
                $('#visitors-table td span.bar').peity('bar', {
                    fill: ['#8e44ad', '#3498db']
                });

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Attaches world map from jvector map to #world-map container.
                 */
                var Mapdata = {
                    'AF': 16.63,
                    'AL': 11.58,
                    'DZ': 158.97,
                    'AO': 85.81,
                    'AG': 1.1,
                    'AR': 351.02,
                    'AM': 8.83,
                    'AU': 1219.72,
                    'AT': 366.26,
                    'AZ': 52.17,
                    'BS': 7.54,
                    'BH': 21.73,
                    'BD': 105.4,
                    'BB': 3.96,
                    'BY': 52.89,
                    'BE': 461.33,
                    'BZ': 1.43,
                    'BJ': 6.49,
                    'BT': 1.4,
                    'BO': 19.18,
                    'BA': 16.2,
                    'BW': 12.5,
                    'BR': 2023.53,
                    'BN': 11.96,
                    'BG': 44.84,
                    'BF': 8.67,
                    'BI': 1.47,
                    'KH': 11.36,
                    'CM': 21.88,
                    'CA': 1563.66,
                    'CV': 1.57,
                    'CF': 2.11,
                    'TD': 7.59,
                    'CL': 199.18,
                    'CN': 5745.13,
                    'CO': 283.11,
                    'KM': 0.56,
                    'CD': 12.6,
                    'CG': 11.88,
                    'CR': 35.02,
                    'CI': 22.38,
                    'HR': 59.92,
                    'CY': 22.75,
                    'CZ': 195.23,
                    'DK': 304.56,
                    'DJ': 1.14,
                    'DM': 0.38,
                    'DO': 50.87,
                    'EC': 61.49,
                    'EG': 216.83,
                    'SV': 21.8,
                    'GQ': 14.55,
                    'ER': 2.25,
                    'EE': 19.22,
                    'ET': 30.94,
                    'FJ': 3.15,
                    'FI': 231.98,
                    'FR': 2555.44,
                    'GA': 12.56,
                    'GM': 1.04,
                    'GE': 11.23,
                    'DE': 3305.9,
                    'GH': 18.06,
                    'GR': 305.01,
                    'GD': 0.65,
                    'GT': 40.77,
                    'GN': 4.34,
                    'GW': 0.83,
                    'GY': 2.2,
                    'HT': 6.5,
                    'HN': 15.34,
                    'HK': 226.49,
                    'HU': 132.28,
                    'IS': 12.77,
                    'IN': 1430.02,
                    'ID': 695.06,
                    'IR': 337.9,
                    'IQ': 84.14,
                    'IE': 204.14,
                    'IL': 201.25,
                    'IT': 2036.69,
                    'JM': 13.74,
                    'JP': 5390.9,
                    'JO': 27.13,
                    'KZ': 129.76,
                    'KE': 32.42,
                    'KI': 0.15,
                    'KR': 986.26,
                    'UNEFINED': 5.73,
                    'KW': 117.32,
                    'KG': 4.44,
                    'LA': 6.34,
                    'LV': 23.39,
                    'LB': 39.15,
                    'LS': 1.8,
                    'LR': 0.98,
                    'LY': 77.91,
                    'LT': 35.73,
                    'LU': 52.43,
                    'MK': 9.58,
                    'MG': 8.33,
                    'MW': 5.04,
                    'MY': 218.95,
                    'MV': 1.43,
                    'ML': 9.08,
                    'MT': 7.8,
                    'MR': 3.49,
                    'MU': 9.43,
                    'MX': 1004.04,
                    'MD': 5.36,
                    'MN': 5.81,
                    'ME': 3.88,
                    'MA': 91.7,
                    'MZ': 10.21,
                    'MM': 35.65,
                    'NA': 11.45,
                    'NP': 15.11,
                    'NL': 770.31,
                    'NZ': 138,
                    'NI': 6.38,
                    'NE': 5.6,
                    'NG': 206.66,
                    'NO': 413.51,
                    'OM': 53.78,
                    'PK': 174.79,
                    'PA': 27.2,
                    'PG': 8.81,
                    'PY': 17.17,
                    'PE': 153.55,
                    'PH': 189.06,
                    'PL': 438.88,
                    'PT': 223.7,
                    'QA': 126.52,
                    'RO': 158.39,
                    'RU': 1476.91,
                    'RW': 5.69,
                    'WS': 0.55,
                    'ST': 0.19,
                    'SA': 434.44,
                    'SN': 12.66,
                    'RS': 38.92,
                    'SC': 0.92,
                    'SL': 1.9,
                    'SG': 217.38,
                    'SK': 86.26,
                    'SI': 46.44,
                    'SB': 0.67,
                    'ZA': 354.41,
                    'ES': 1374.78,
                    'LK': 48.24,
                    'KN': 0.56,
                    'LC': 1,
                    'VC': 0.58,
                    'SD': 65.93,
                    'SR': 3.3,
                    'SZ': 3.17,
                    'SE': 444.59,
                    'CH': 522.44,
                    'SY': 59.63,
                    'TW': 426.98,
                    'TJ': 5.58,
                    'TZ': 22.43,
                    'TH': 312.61,
                    'TL': 0.62,
                    'TG': 3.07,
                    'TO': 0.3,
                    'TT': 21.2,
                    'TN': 43.86,
                    'TR': 729.05,
                    'TM': 0,
                    'UG': 17.12,
                    'UA': 136.56,
                    'AE': 239.65,
                    'GB': 2258.57,
                    'US': 14624.18,
                    'UY': 40.71,
                    'UZ': 37.72,
                    'VU': 0.72,
                    'VE': 285.21,
                    'VN': 101.99,
                    'YE': 30.02,
                    'ZM': 15.69,
                    'ZW': 5.57
                };

                $('#world-map').vectorMap({
                    map: 'world_mill_en',
                    series: {
                        regions: [{
                            values: Mapdata,
                            scale: ['#2ecc71', '#5cb85c'],
                            normalizeFunction: 'polynomial'
                        }]
                    },
                    backgroundColor: '#fff',
                    onRegionLabelShow: function (e, el, code) {
                        el.html(el.html() + ' ($' + Mapdata[code] + ')');
                    }
                });

                /*
                 * ------ FOR DEMO PURPOSES ------
                 * Initializes sortable dashboard containers.
                 */
                $('.sortable-containment-box .sortable').sortable({
                    connectWith: '.sortable-containment-box .sortable',
                    cursor: 'move',
                    containment: '.sortable-containment-box',
                    placeholder: 'ui-state-highlight',
                    handle: '.box-header'
                });

            })()

        };

    })(jQuery, window);

});