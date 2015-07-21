/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {

    "use strict";

    var model = {
        
        attendance: JSON.parse(localStorage.attendance),
        $allMissed: $('tbody .missed-col'),
        $allCheckboxes: $('tbody input')
    }

    

    var view = {

    };

    var controller = {
        init: function() {
            this.checkBoxes;

        },
        countMissing: function(column) {
            column.each(function() {
                var studentRow = $(this).parent('tr'),
                    dayChecks = $(studentRow).children('td').children('input'),
                    numMissed = 0;

                dayChecks.each(function() {
                    if (!$(this).prop('checked')) {
                        numMissed++;
                    }
                });
            $(this).text(numMissed);
            });
        },
        checkBoxes: $.each(model.attendance, function(name, days) {
            var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
                dayChecks = $(studentRow).children('.attend-col').children('input');

            dayChecks.each(function(i) {
                $(this).prop('checked', days[i]);
            });
        })
    };



    // Count a student's missed days
    

    // Check boxes, based on attendace records
    

    // When a checkbox is clicked, update localStorage
    model.$allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            model.$allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        controller.countMissing(model.$allMissed);
        localStorage.attendance = JSON.stringify(newAttendance);
    });
    controller.init();
    controller.countMissing(model.$allMissed);
}());
