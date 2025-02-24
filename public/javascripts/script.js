document.getElementById('form').addEventListener('submit', function(event) {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailValue = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailValue)) {
        emailInput.style.border = '1px solid red';
        emailError.innerHTML = 'Invalid email address';
        emailError.style.color = 'red';        
        event.preventDefault(); // Prevent form submission
    }
});