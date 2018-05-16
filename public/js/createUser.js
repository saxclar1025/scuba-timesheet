$(document).ready(function() {
  // Getting references to our form and input
  var firstNameInput = $("input#firstName-input");
  var lastNameInput = $("input#lastName-input");
  var userNameInput = $("input#userName-input");
  var createUserForm = $("form.createuser");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  createUserForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      userName: userNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.firstName || !userData.lastName || !userData.userName || !userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    createUser(userData);
    // createUserForm.trigger("reset");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function createUser(userData) {
    $.post("/api/createuser", userData)
    .then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
