document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");
  const surnameField = document.getElementById("surname");
  const lastnameField = document.getElementById("lastname");
  const emailField = document.getElementById("email");
  const commentField = document.getElementById("comment");

  submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  await databaseClient.insertInto("user", {
    surname: surnameField.value,
    lastname: lastnameField.value,
    email: emailField.value,
    comment: commentField.value,
  });

  alert("Es hat geklaappt! Yaaaaaay!");
  });
});
