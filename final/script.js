// Form Submission Handler
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    const fullName = document.getElementById("reseller-name").value.trim();
    const email = document.getElementById("reseller-email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const platform = document.getElementById("platform").value;
    const experience = document.querySelector('input[name="experience"]:checked')?.value || "";
    const message = document.getElementById("message").value.trim();

    // 1: Validate Required Fields
    if (!fullName || !email || !phone || !address || !platform || !experience || !message) {
        alert("All fields are required!");
        return;
    }

    // 2: Validate Phone Number
    if (!/^\d{10,15}$/.test(phone)) {
        alert("Please enter a valid phone number (10-15 digits).");
        return;
    }

    // 3: Validate Message Length
    if (message.length < 10) {
        alert("Message must be at least 10 characters long.");
        return;
    }

    // Prepare data for submission
    const data = {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        platform: platform,
        experience: experience,
        message: message,
    };

    console.log("Form Data:", data); // Debugging log

    // Use GET for GitHub Pages or Mock Testing
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../js/response.json", true); // Replace with the actual JSON file path
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById("contactForm").style.display = "none"; // Hide form on success
            document.querySelector("main").innerHTML += `<p>${response.message}</p>`; // Display response message
        } else if (xhr.readyState === 4) {
            alert("There was an error submitting your application. Please try again later.");
        }
    };

    xhr.send(JSON.stringify(data)); // Send data as JSON
});
