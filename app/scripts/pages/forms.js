/*global rocketDashboard:false */

$(function () {
    
    'use strict';
    
    (function ($, window, undefined) {

        /**
         * @namespace
         * @description Holds Methods that control the Forms Page.
         */
        rocketDashboard.Pages.Forms = {

            init: (function() {

                $('#selectPicker, #selectPickerSuccess, #selectPickerWarning, #selectPickerDanger').selectpicker();

                $('#styledCheck').iCheck({
                    checkboxClass: 'icheckbox_flat-blue'
                });

                $('.styledRadio').iCheck({
                    radioClass: 'iradio_flat-blue'
                });

                $('#editor').wysihtml5({
                    toolbar: {
                        'fa': true,
                        'font-styles': true, //Font styling, e.g. h1, h2, etc. Default true
                        'emphasis': true, //Italics, bold, etc. Default true
                        'lists': true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                        'html': false, //Button which allows you to edit the generated HTML. Default false
                        'link': true, //Button to insert a link. Default true
                        'image': true, //Button to insert an image. Default true,
                        'color': false, //Button to change color of font  
                        'blockquote': true, //Blockquote  
                        'size': 'xs'
                    }
                });

                $('#datePicker').datepicker({
                    format: 'mm-dd-yyyy',
                    todayHighlight: true
                });

                $('#colorPicker').minicolors({
                    position: 'bottom right',
                    theme: 'bootstrap',
                    opacity: true
                });

                $('#spinner').TouchSpin({
                    min: 0,
                    max: 100,
                    step: 1
                });

                $('#switch').bootstrapSwitch({
                    size: 'mini',
                    onColor: 'success',
                    offColor: 'danger'
                });

                $('#rangeSlider').ionRangeSlider({
                    min: 0,
                    max: 100,
                    type: 'double'
                });

                $('#validateForm').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'fa fa-check',
                        invalid: 'fa fa-times',
                        validating: 'fa fa-refresh'
                    },
                    fields: {
                        name: {
                            validators: {
                                notEmpty: {
                                    message: 'The first name is required and cannot be empty'
                                }
                            }
                        },
                        email: {
                            validators: {
                                notEmpty: {
                                    message: 'The email address is required'
                                },
                                emailAddress: {
                                    message: 'Not a valid email address'
                                }
                            }
                        },
                        message: {
                            validators: {
                                notEmpty: {
                                    message: 'The message is required and cannot be empty'
                                }
                            }
                        },
                        select: {
                            validators: {
                                notEmpty: {
                                    message: 'You need to select an option'
                                }
                            }
                        },
                        checkbox: {
                            validators: {
                                notEmpty: {
                                    message: 'You need to check this'
                                }
                            }
                        },
                    }
                });

            })()

        };

    })(jQuery, window);

});