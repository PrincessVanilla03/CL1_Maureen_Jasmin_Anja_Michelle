document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submit");
  const surnameField = document.getElementById("surname");
  const lastnameField = document.getElementById("lastname");
  const emailField = document.getElementById("email");
  const commentField = document.getElementById("comment");
  const messageText = document.getElementById("message");

  submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  messageText.textContent = "";
    const selectedInput = document.querySelector('input[name="subscription_type"]:checked');

    // ❌ If no radio selected
    if (!selectedInput) {
      messageDiv.textContent = "Bitte wählen Sie eine Option aus.";
      return;
    }

    const selectedType = selectedInput.value;

    // ✅ Insert into database
    await databaseClient.insertInto("user", {
      surname: surnameField.value,
      lastname: lastnameField.value,
      email: emailField.value,
      subscription_type: selectedType,
      comment: commentField.value,
    });

    // ✅ Success message
    messageText.textContent = "Danke! Ihre Nachricht wurde erfolgreich gesendet.";
  });
});
