"use strict";

$(document).ready(function() {
    function formResult($form, success) {
        var formMsg = $form.find(".form-msg"), formBtn = $form.find(".btn-acerta"), formType = $form.attr("id");
        success ? ("modal-form" == formType ? formMsg.append("<span>&nbsp;Thanks for your interest.<br>Your Case Study will be emailed to you right away!</span><br>") : "about-form" == formType ? formMsg.append("<span>&nbsp;Thanks for your interest.<br>We'll be in touch with you soon!</span><br>") : (console.log("Who submitted a form?"), 
        console.log("Form type is " + formType)), formBtn[0].disabled = !0, formBtn.addClass("submitted").text("Success"), 
        formMsg.addClass("active")) : (formMsg.addClass("alert-danger"), formMsg.append(errorIcon).append("<span>&nbsp;There seems to be a problem. Please try again later.</span><br>"), 
        formMsg.addClass("active"));
    }
    function resetMsg($msgDiv) {
        $msgDiv.html("");
    }
    var errorIcon = '<span><i class="fa fa-exclamation-circle" aria-hidden="true"></i><span>';
    $("#about-form,#modal-form").on("submit", function(e) {
        e.preventDefault();
        var $form = $(this), formUrl = $form.attr("action");
        resetMsg($form.find(".form-msg")), $.ajax({
            url: formUrl,
            type: "POST",
            datatype: "xml",
            data: $form.serialize(),
            success: function(data) {
                formResult($form, !0), console.log(data);
            },
            error: function(data) {
                formResult($form, !1), console.log(data);
            }
        });
    });
});