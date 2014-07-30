/*global rocketDashboard:false */

$(function () {

    'use strict';

    (function ($, window, undefined) {

        /* Global Variables */
        var tasks = [],
            showDeleteAll = false,
            sort = false;

        /* Element Cache */
        var $todoApp = $('.todo-app'),
            $input = $todoApp.find('.todo-input'),
            $alert = $todoApp.find('.alert'),
            $tasksList = $todoApp.find('.tasks-list'),
            $pendingTasks = $todoApp.find('.pending-tasks'),
            $deleteAllComplete = $todoApp.find('.delete-all-complete'),
            $sort = $todoApp.find('.sort ');

        /**
         * @namespace
         * @description Holds Rocket Dashboard's To-Do App.
         */
        rocketDashboard.Apps.todo = (function () {

            /* Find all completed tasks in the array and deletes them */
            function deleteAllCompletedTasks() {

                for (var i = tasks.length; i--;) {

                    if (tasks[i].complete === true) {

                        tasks.splice(i, 1);

                    }

                }

                displayTasks(tasks);

            }

            /* Receives the tasks array and displays the tasks in a list */
            function displayTasks(tasksList) {

                $tasksList.html(''); // Clear the list's html.

                if (tasksList.length) {

                    showDeleteAll = false;

                    var pendingTasks = tasksList.length;

                    /* Creates a list item for each task
                       stored in the array */
                    $.each(tasksList, function (index, task) {

                        /* Template for every task */
                        var $taskTemplate =
                            $('<li class="list-group-item task">' +
                                '<a href="#" class="delete"><i class="fa fa-times"></i></a>' +
                                '<span class="task-name">' + task.taskName + '</span>' +
                                '<input type="checkbox" class="complete pull-right" />' +
                                '</li>');

                        if (task.complete === true) {

                            showDeleteAll = true;
                            $taskTemplate.addClass('done').find('.complete').attr('checked', 'chekced');
                            pendingTasks = pendingTasks - 1; // Remove the complete task from the total.

                            if (sort === 'pending') {

                                $taskTemplate.css('display', 'none');

                            }

                        } else {

                            if (sort === 'done') {

                                $taskTemplate.css('display', 'none');

                            }

                        }

                        /* Set the task state on check change */
                        $taskTemplate.find('.complete').change(function () {

                            var taskIndex = $(this).parents('li').index();

                            if ($(this).is(':checked')) {

                                rocketDashboard.Apps.todo.setTaskState(taskIndex, true);

                            } else {

                                rocketDashboard.Apps.todo.setTaskState(taskIndex, false);

                            }

                        });

                        $taskTemplate.find('.delete').click(function (event) {

                            event.preventDefault();

                            var taskIndex = $(this).parents('li').index();

                            rocketDashboard.Apps.todo.removeTask(taskIndex);

                        });

                        $tasksList.append($taskTemplate); // Appends the template to the list.

                    });

                    $pendingTasks.find('.pending-number').text(pendingTasks);

                    if (pendingTasks === 1) {

                        $('.pending-text').text('Pending task');

                    } else {

                        $('.pending-text').text('Pending tasks');

                    }

                    $pendingTasks.show();

                    if (showDeleteAll) {

                        $deleteAllComplete.show();

                    } else {

                        $deleteAllComplete.hide();

                    }

                    if (pendingTasks && showDeleteAll) {

                        $sort.show();

                    } else {

                        $sort.hide();

                    }

                    if (sort === 'done' && showDeleteAll === false) {

                        $tasksList.children('li').not('.done').fadeIn();

                        $sort.find('ul li:eq(0) a').trigger('click');

                    }

                    if (sort === 'pending' && pendingTasks === 0) {

                        $tasksList.children('li.done').fadeIn();

                        $sort.find('ul li:eq(0) a').trigger('click');

                    }

                } else {

                    showDeleteAll = false;
                    $deleteAllComplete.hide();
                    $pendingTasks.hide();

                }

            }

            /**
             * @scope
             */
            return {

                init: (function () {

                    /* FOR DEMO PURPOSES PUSH SOME DUMMY TASKS */
                    tasks[0] = { taskName: 'Here\'s something to do', complete: false };
                    tasks[1] = { taskName: 'You\'ve already done this', complete: true };
                    tasks[2] = { taskName: 'But you have yet to complete this', complete: false };

                    /* Loads the list on app initialization */
                    displayTasks(tasks);

                    /* Handles the form submit */
                    $todoApp.submit(function (event) {

                        event.preventDefault();

                        var inputVal = $input.val(); // Gets value from imput.

                        if (inputVal) { // If there is a value.

                            rocketDashboard.Apps.todo.addTask(inputVal); // Runs the funciton that saves the task.

                            $input.val(''); // Reset the input after the task is submited.

                            if ($alert.is(':visible')) { // If alert is visible

                                $alert.fadeOut(); // Hide the alert.

                            }

                        } else { // If the input is blank.

                            $alert.fadeIn(); // Display alert.

                        }

                    });

                    /* Handles the sorting function for the two different states of tasks. */
                    $sort.find('a').click(function (event) {

                        event.preventDefault();

                        var $this = $(this),
                            option = $this.data('sort');

                        $this.addClass('active').parent().siblings().find('a').removeClass('active');

                        switch (option) {

                        case 'pending':
                            $tasksList.children('li.done').fadeOut();
                            $tasksList.children('li').not('.done').fadeIn();
                            sort = 'pending';
                            break;

                        case 'done':
                            $tasksList.children('li').not('.done').fadeOut();
                            $tasksList.children('li.done').fadeIn();
                            sort = 'done';
                            break;

                        case 'all':
                            $tasksList.children('li').fadeIn();
                            sort = false;
                            break;

                        }

                    });

                    /* Handles deleting all complete tasks. */
                    $deleteAllComplete.click(function (event) {

                        event.preventDefault();

                        deleteAllCompletedTasks();

                    });

                    /* Closes the error message */
                    $alert.find('.close').click(function (event) {

                        event.preventDefault();

                        $alert.fadeOut(); // Fades the alert.

                    });

                })(),

                /* Receives a task name and saves it to the tasks variable */
                addTask: function(taskName) {

                    tasks.push({
                        taskName: taskName,
                        complete: false
                    }); // Push the task object to the tasks array.

                    displayTasks(tasks); // Reloads the task list.

                },

                /* Receives a task index and deletes it from tasks variable */
                removeTask: function(index) {

                    tasks.splice(index, 1);

                    displayTasks(tasks);

                },

                /* Updates a task to be marked as complete */
                setTaskState: function(index, state) {

                    tasks[index].complete = state;

                    displayTasks(tasks); // Reload the updated list.

                    console.log(tasks);

                }

            };

        }());

    })(jQuery, window);

});