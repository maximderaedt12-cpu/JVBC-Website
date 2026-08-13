const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');
const successMessage = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            form.hidden = true;
            successMessage.hidden = false;
        } else {
            alert("Error: " + data.message);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});