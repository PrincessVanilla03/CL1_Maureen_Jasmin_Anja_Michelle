const submitButton = document.getElementById("submit");
const surnameField = document.getElementById("surname");
const lastnameField = document.getElementById("lastname");
const emailField = document.getElementById("email");

submitButton.addEventListener("click", async (event) => {
  event.prevenDefault();

  await databaseClient.insertInto("user", {
    surname: surnameField.value,
    lastname: lastnameField.value,
    email: lastnameField.value,
  });

  alert("Es hat geklaappt! Yaaaaaay!");
});
