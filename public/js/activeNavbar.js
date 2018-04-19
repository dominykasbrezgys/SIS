
/*
Code that assigns active class depending on current URL
*/

$(document).ready(function() {
    var pathname = window.location.pathname;

    //Paths for academic staff pages
    if (pathname == '/academicstaff/home') {
        $('#navHome').addClass('active').addClass('text-red');
    }

    if (pathname == '/academicstaff/allmodules' ||
        pathname == '/academicstaff/assessedmodules' ||
        pathname == '/academicstaff/taughtmodules') {
        $('#navModules').addClass('active').addClass('text-red');
    }

    if (pathname.includes('/academicstaff/coursework/')){
        $('#navCoursework').addClass('active').addClass('text-red');
    }

    if (pathname.includes('/academicstaff/exams/')){
        $('#navExams').addClass('active').addClass('text-red');
    }

    //Paths for student pages
    if (pathname.includes('/student/home')){
        $('#navHome').addClass('active').addClass('text-green');
    }

    if (pathname.includes('/student/modules')){
        $('#navModules').addClass('active').addClass('text-green');
    }

    if (pathname.includes('/student/coursework')){
        $('#navCoursework').addClass('active').addClass('text-green');
    }

    if (pathname.includes('/student/exams')){
        $('#navExams').addClass('active').addClass('text-green');
    }

})