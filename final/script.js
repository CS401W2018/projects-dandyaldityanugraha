document.querySelector('.contact-form').addEventListener('submit', function (event) {
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
    if (!fullName) {
        alert('Full Name cannot be blank.');
        return;
    }

    if (!email) {
        alert('Email Address cannot be blank.');
        return;
    }

    if (!phone) {
        alert('Phone Number cannot be blank.');
        return;
    }

    if (!platform) {
        alert('Please select a Preferred Selling Platform.');
        return;
    }

    if (!experience) {
        alert('Please select your reselling experience.');
        return;
    }

    if (message.length < 10) {
        alert('Message must be at least 10 characters long.');
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

    // Send the data via Fetch API
    fetch('submit-form.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error submitting form');
            }
            return response.json();
        })
        .then((data) => {
            alert('Thank you! Your application has been submitted.');
            console.log('Server Response:', data);

            // Reset the form
            document.querySelector('.contact-form').reset();
        })
        .catch((error) => {
            console.error('Submission Error:', error);
            alert('There was an error submitting your application. Please try again later.');
        });
});
