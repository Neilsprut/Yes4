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
    $("#myModal").on("show.bs.modal", function(event) {
        var button = $(event.relatedTarget), title = button.parent().children(":first").text();
        console.log("this is the title - " + title);
        var modal = $(this);
        modal.find(".modal-title").text(title), modal.find("input#title").val(title);
    }), $("#myModal").on("hide.bs.modal", function() {
        var modal = $(this);
        modal.find(".btn-acerta")[0].disabled = !1, modal.find(".btn-acerta").removeClass("submitted").text("Submit Email"), 
        modal.find("input#email").val(""), modal.find(".form-msg").removeClass("active");
    });
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