document.addEventListener("DOMContentLoaded", () => {
  // ---------- DOM shortcuts ----------
  const form          = document.getElementById("contact_form");  
  const submitButton  = document.getElementById("submit");
  const surnameField  = document.getElementById("surname");
  const lastnameField = document.getElementById("lastname");
  const emailField    = document.getElementById("email");
  const commentField  = document.getElementById("comment");       
  const messageText   = document.getElementById("message");

  // ---------- Max Comment Length ----------
  const MAX_COMMENT_LEN = 500;    

  // ---------- Helpers ----------
  const emailOK   = (txt) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(txt);
  const nameOK    = (txt) => txt.trim().length > 2;
  const commentOK = (txt) => txt.length === 0 || txt.length <= MAX_COMMENT_LEN;


  function validateForm() {
    messageText.textContent = "";
    messageText.className   = "";

    const surname  = surnameField.value.trim();
    const lastname = lastnameField.value.trim();
    const email    = emailField.value.trim();
    const comment  = commentField.value.trim();

    // --- individual checks ---
    if (!nameOK(surname)) {
      showError("Der eingegebene Vorname ist zu kurz.");
      return;
    }
    if (!nameOK(lastname)) {
      showError("Der eingegebene Nachname ist zu kurz.");
      return;
    }
    if (!emailOK(email)) {
      showError("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      return;
    }
    if (!commentOK(comment)) {
      showError(`Der Kommentar darf maximal ${MAX_COMMENT_LEN} Zeichen lang sein.`);
      return;
    }

    // everything fine → enable button
    submitButton.disabled = false;
  }

  function showError(msg) {
    messageText.textContent = msg;
    messageText.className   = "error";   
    submitButton.disabled   = true;
  }

  // ---------- Live validation ----------
  [surnameField, lastnameField, emailField, commentField].forEach(el =>
    el.addEventListener("input", validateForm)
  );

  // Start with a disabled button
  submitButton.disabled = true;

  // ---------- Submit handler ----------
  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const selectedInput = document.querySelector('input[name="subscription_type"]:checked');
    if (!selectedInput) {
      showError("Bitte wählen Sie eine Option aus.");
      return;
    }

    // safety net: run one last validation
    validateForm();
    if (submitButton.disabled) return;   // stop if validation just failed

    await databaseClient.insertInto("user", {
      surname: surnameField.value.trim(),
      lastname: lastnameField.value.trim(),
      email: emailField.value.trim(),
      subscription_type: selectedInput.value, // no need to sanitize here, it's a radio
      comment: commentField.value.trim(),
    });


    // success feedback + reset
    messageText.textContent = "Danke! Ihre Nachricht wurde erfolgreich gesendet.";
    messageText.className   = "success";
    form.reset();
    submitButton.disabled = true; 
  });
});
