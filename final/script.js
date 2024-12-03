document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            // Collect form data
            const fullName = document.getElementById('reseller-name').value.trim();
            const email = document.getElementById('reseller-email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const platform = document.getElementById('platform').value;
            const experience = document.querySelector('input[name="experience"]:checked')?.value || "";
            const message = document.getElementById('message').value.trim();

            // Validate input
            if (!fullName || !email || !phone || !address || !platform || !experience || message.length < 10) {
                alert('Please complete all required fields and ensure the message is at least 10 characters long.');
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

            console.log('Form Data:', formData); // Log form data for debugging

            // Send data via Fetch API
            fetch('https://cs401w2018.github.io/projects-dandyaldityanugraha/final/Home.html', { // Replace this URL with your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to submit the form. HTTP Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Server Response:', data); // Log server response for debugging
                    alert('Thank you! Your application has been submitted.');
                    form.reset(); // Reset the form after successful submission
                })
                .catch((error) => {
                    console.error('Submission Error:', error); // Log errors for debugging
                    alert('There was an error submitting your application. Please try again.');
                });
        });
    } else {
        console.error('Form element not found in the DOM.');
    }
});
