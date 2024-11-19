document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const state = document.getElementById('state').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    const nationality = document.querySelector('input[name="nationality"]:checked')?.value || "";
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value.trim();

    // Input validation
    if (!firstName || !lastName) {
        alert('First Name and Last Name cannot be blank.');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    if (!dob) {
        alert('Date of Birth cannot be blank.');
        return;
    }

    if (!email) {
        alert('Email is required.');
        return;
    }

    if (!state || state === "blank") {
        alert('Please select a state.');
        return;
    }

    // Create formData object
    const formData = {
        firstName,
        lastName,
        username,
        password,
        state,
        gender,
        nationality,
        dob,
        email,
    };

    // Send the data via AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "submit.js", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.querySelector('main').innerHTML = `<h2>${response.message}</h2>`;
        } else if (xhr.readyState === 4) {
            alert('Error submitting form.');
        }
    };

    xhr.send(JSON.stringify(formData)); // Send the formData as JSON

    console.log(formData); // Log the form data to the console

    alert(`Success: ${firstName} ${lastName}`);
});
