document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Gather form data into an object
        const formData = new FormData(form);
        const dataObject = {};
        formData.forEach((value, key) => {
            dataObject[key] = value;
        });

        try {
            // Simulate sending data to a server
            const response = await fetch("response.json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataObject),
            });

            if (!response.ok) throw new Error("Error submitting the form.");

            const result = await response.json();

            // Display success message
            alert(`Thank you, ${dataObject['reseller-name']}! Your application has been submitted.`);
            console.log("Form submitted successfully:", result);

            // Reset the form
            form.reset();
        } catch (error) {
            console.error("Form submission failed:", error);
            alert("There was an error submitting your application. Please try again.");
        }
    });
});
