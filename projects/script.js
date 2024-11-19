document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
  
    // Collect form inputs into a JavaScript Object
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      age: parseInt(document.getElementById("age").value),
      message: document.getElementById("message").value,
    };
  
    // Log the object to the console
    console.log("Form Data:", formData);
  
    // Validate inputs
    let errors = [];
    if (!formData.name) errors.push("Name is required.");
    if (!formData.email) errors.push("Email is required.");
    if (!formData.message) errors.push("Message is required.");
    if (isNaN(formData.age) || formData.age < 18 || formData.age > 100) {
      errors.push("Age must be between 18 and 100.");
    }
  
    if (errors.length > 0) {
      alert("Please fix the following errors:\n" + errors.join("\n"));
      return;
    }
  
    // Notify the user the form is being processed
    document.getElementById("responseMessage").innerText = "Processing your form...";
  
    // Send an AJAX call
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "submit.json", true); // Change "POST" to "GET" for GitHub hosting
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        document.getElementById("responseMessage").innerText = response.message;
  
        // Reset the form after successful submission
        document.getElementById("myForm").reset();
      } else {
        document.getElementById("responseMessage").innerText =
          "Something went wrong. Please try again.";
      }
    };
  
    xhr.send(JSON.stringify(formData));
  });
  