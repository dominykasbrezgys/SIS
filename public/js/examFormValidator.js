
/*
This code validates form on the client side using jQuery
 - Checks if all fields are not empty
 - Checks if the file being uploaded is a PDF
*/

if (top.location.pathname == '/academicstaff/exams/add'){
    $(document).ready(function() {
        validateForm();
        $('#weighting').change(validateForm);
        $('#maxMark').change(validateForm);
        $('#examFile').change(validateForm);
    });

    function validateForm() {

        //If format is not .pdf activate error message
        if ($("#examFile").val()) {
            var file = $("#examFile").val();
            if (file.substring(file.length - 4) != '.pdf') {
                $('#wrongFormatMessage').show();
                $("#uploadExam").prop("disabled", true);
                return;
            } else {
                $('#wrongFormatMessage').hide();
            }
        }
        if ($('#weighting').val().length > 0 &&
            $('#maxMark').val().length > 0 &&
            $("#examFile").val()) {
            $("#uploadExam").prop("disabled", false);
        } else {
            $("#uploadExam").prop("disabled", true);
        }
    }
}