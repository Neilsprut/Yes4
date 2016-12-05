"use strict";

$(document).ready(function() {
  //Show Case study title on modal open
  $('#myModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var title = button.parent().children(":first").text();
    console.log("this is the title - " + title);
    var modal = $(this);
    modal.find('.modal-title').text(title);
    modal.find('input#title').val(title);
  });

  var errorIcon = '<span><i class="fa fa-exclamation-circle" aria-hidden="true"></i><span>';

  //Write form confirmation message
  function formResult($form, success) {
    var formMsg = $form.find(".form-msg");
    var formBtn = $form.find(".btn-acerta");
    var formType = $form.attr('id');
    if (success){
      if (formType == "modal-form") {
        formMsg.append("<span>&nbsp;Thanks for your interest.<br>Your Case Study will be emailed to you right away!</span><br>");
        }
        else if (formType == "about-form") {
          formMsg.append("<span>&nbsp;Thanks for your interest.<br>We'll be in touch with you soon!</span><br>");
        }
        else {
          console.log("Who submitted a form?");
          console.log("Form type is " + formType);
        }
      formBtn[0].disabled = true;
      formBtn.addClass("submitted").text("Success");
      formMsg.addClass("active");
    }
    else {
      formMsg.addClass('alert-danger');
      formMsg.append(errorIcon).append("<span>&nbsp;There seems to be a problem. Please try again later.</span><br>");
      formMsg.addClass("active");
    }
  }

  //Reset the confirmation message
  function resetMsg($msgDiv) {
    $msgDiv.html("");
  }

  //Submit form
  $('#about-form,#modal-form').on('submit', function(e) {
    e.preventDefault();
    var $form = $(this);
    var formUrl = $form.attr('action');
    resetMsg($form.find(".form-msg"));
    // formUrl = "";
    $.ajax({
      url: formUrl,
      type: 'POST',
      datatype: 'xml',
      data: $form.serialize(),
      success: function(data) {
        formResult($form, true);
        console.log(data);
      },
      error: function(data) {
        formResult($form, false);
        console.log(data);
      }
    });
  });

 //  // Start of Async HubSpot Analytics Code
 //    (function(d,s,i,r) {
 //      if (d.getElementById(i)){return;}
 //      var n=d.createElement(s),e=d.getElementsByTagName(s)[0];
 //      n.id=i;n.src='//js.hs-analytics.net/analytics/'+(Math.ceil(new Date()/r)*r)+'/1981873.js';
 //      e.parentNode.insertBefore(n, e);
 //    })(document,"script","hs-analytics",300000);
 // // End of Async HubSpot Analytics Code

});


