
/*
This code validates form on the client side using jQuery
 - Checks if all fields are not empty
 - Checks if the file being uploaded is a PDF
*/

if (top.location.pathname == '/academicstaff/coursework'){
    $(document).ready(function() {
        validateForm();
        $('#no').change(validateForm);
        $('#weighting').change(validateForm);
        $('#maxMark').change(validateForm);
        $('#setDate').change(validateForm);
        $('#dueDate').change(validateForm);
        $('#returnDate').change(validateForm);
        $('#cwkFile').change(validateForm);
    });

    function validateForm() {

        //If format is not .pdf activate error message
        if ($("#cwkFile").val()) {
            var fileCwk = $("#cwkFile").val();
            if (fileCwk.substring(fileCwk.length - 4) != '.pdf') {
                $('#wrongFormatMessage').show();
                $("#submit").prop("disabled", true);
                return;
            } else {
                $('#wrongFormatMessage').hide();
            }
        }
        if ($('#no').val().length > 0 &&
            $('#weighting').val().length > 0 &&
            $('#maxMark').val().length > 0 &&
            $('#setDate').val().length > 0 &&
            $('#dueDate').val().length > 0 &&
            $('#returnDate').val().length > 0 &&
            $("#cwkFile").val()) {
            $("#submit").prop("disabled", false);
        } else {
            $("#submit").prop("disabled", true);
        }
    }
}