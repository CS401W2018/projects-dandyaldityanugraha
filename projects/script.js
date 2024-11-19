document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Collect form inputs into a JavaScript object
    const formData = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("lname").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        address: document.getElementById("address").value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || "",
        nationality: document.querySelector('input[name="nationality"]:checked')?.value || "",
        state: document.getElementById("state").value,
        dob: document.getElementById("dob").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
    };

    // Validate the inputs
    const errors = validateInputs(formData);

    if (errors.length > 0) {
        alert(`Please fix the following errors:\n\n${errors.join("\n")}`);
        return; // Stop the form submission
    }

    // Log the form data to the console
    console.log("Collected Form Data:", formData);

    // Simulate sending the data using an AJAX call
    sendFormData(formData);
});

// Function to validate form inputs
function validateInputs(data) {
    const errors = [];

    // Check required fields
    if (!data.firstName) errors.push("First Name is required.");
    if (!data.lastName) errors.push("Last Name is required.");
    if (!data.username) errors.push("Username is required.");

    // Check password length
    if (data.password.length < 6) {
        errors.push("Password must be at least 6 characters.");
    }

    // Check if state is selected
    if (!data.state || data.state === "blank") {
        errors.push("Please select a state.");
    }

    // Validate date of birth
    if (!data.dob) errors.push("Date of Birth is required.");

    return errors;
}

// Function to send form data using AJAX
function sendFormData(data) {
    const xhr = new XMLHttpRequest();

    // Simulate a server response using a JSON file
    xhr.open("GET", "response.json", true); // Use "GET" to fetch the response.json file
    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            // Display the success message on the page
            const main = document.querySelector("main");
            main.innerHTML = `<h2>${response.message}</h2>`;
        } else {
            alert("An error occurred while submitting the form.");
        }
    };

    xhr.onerror = function () {
        alert("An error occurred while connecting to the server.");
    };

    xhr.send();
}
