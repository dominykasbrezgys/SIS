
/*
Code that assigns active class depending on current URL
*/

$(document).ready(function() {
    var pathname = window.location.pathname;
    console.log(pathname);

    //Paths for academic staff pages
    if (pathname == '/academicstaff/home') {
        $('#navHome').addClass('active').addClass('text-red');
    }

    if (pathname == '/academicstaff/allmodules' ||
        pathname == '/academicstaff/assessedmodules' ||
        pathname == '/academicstaff/taughtmodules') {
        $('#navModules').addClass('active').addClass('text-red');
    }

    if (pathname == '/academicstaff/coursework') {
        $('#navCoursework').addClass('active').addClass('text-red');
    }

    if (pathname == '/academicstaff/exams') {
        $('#navExams').addClass('active').addClass('text-red');
    }

    //Paths for student pages
    if (pathname == '/student/home'){
        $('#navHome').addClass('active').addClass('text-green');
    }

    if (pathname == '/student/modules'){
        $('#navModules').addClass('active').addClass('text-green');
    }

    if (pathname == '/student/coursework'){
        $('#navCoursework').addClass('active').addClass('text-green');
    }

    if (pathname == '/student/exams'){
        $('#navExams').addClass('active').addClass('text-green');
    }

})