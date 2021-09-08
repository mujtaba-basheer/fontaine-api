$(document).ready(function (e) {
  $(".validation-text").hide();
  $("#Email").val("");
  $("#Email").on("input", function () {
    var email = $("#Email").val();
    var reg =
      /^([\w-\.]+@(?!gmail)(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!outlook.com)(?!me.com)(?!msn.com)(?!ymail.com)(?!icloud.com)([\w-]+\.)+[\w-]{2,4})?$/;
    if (reg.test(email)) {
      $(".validation-text").hide();
      $("#submit-btn").prop("disabled", false);
      return 0;
    } else {
      $(".validation-text").show().css("color", "red");
      $("#submit-btn").prop("disabled", true);
      return false;
    }
  });
});
