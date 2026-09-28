document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page reload

    const form = event.target;
    const submitBtn = document.getElementById("submitBtn");
    const statusMsg = document.getElementById("formStatus");

    // 1. Visual loading feedback
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    statusMsg.className = "status-message";
    statusMsg.style.display = "none";

    // 2. Extract form data
    const formData = new FormData(form);

    // 3. Send AJAX request to FormSubmit
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Success response
          statusMsg.textContent =
            "Thank you! Your message has been sent successfully.";
          statusMsg.className = "status-message success";
          form.reset(); // Clear form fields
        } else {
          // Server error response
          throw new Error("Server returned an error");
        }
      })
      .catch((error) => {
        // Network error response
        statusMsg.textContent =
          "Oops! There was a problem submitting your form. Please try again.";
        statusMsg.className = "status-message error";
      })
      .finally(() => {
        // 4. Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
  });
