document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const fullName = document.getElementById('reseller-name').value.trim();
    const email = document.getElementById('reseller-email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const platform = document.getElementById('platform').value;
    const experience = document.querySelector('input[name="experience"]:checked')?.value || "";
    const message = document.getElementById('message').value.trim();

    // Input validation
    if (!fullName || !email || !phone || !address || !platform || !experience || message.length < 10) {
        alert('Please complete all required fields and ensure the message is at least 10 characters.');
        return;
    }

    // Create a formData object
    const formData = {
        fullName,
        email,
        phone,
        address,
        platform,
        experience,
        message,
    };

    console.log('Form Data:', formData); // Debugging: Log form data to console

    // Send the data via Fetch API
    fetch('https://cs401w2018.github.io/projects-dandyaldityanugraha/final/Home.html/post', { // Replace with your backend endpoint URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to submit the form.');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Response:', data); // Debugging: Log server response to console
            alert('Thank you! Your application has been submitted.');
            // Reset the form after successful submission
            document.getElementById('contactForm').reset();
        })
        .catch((error) => {
            console.error('Submission Error:', error); // Debugging: Log errors to console
            alert('There was an error submitting your application. Please try again later.');
        });
});
