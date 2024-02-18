const themeToggle = document.getElementById('themeToggle');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        // Add the 'dark-theme' class to your bar element
        const barElement = document.getElementById('menuBar'); // Replace with the actual ID
        if (barElement) {
            barElement.classList.add('dark-theme');
        }
    }
});

themeToggle.addEventListener('click', () => {
    // Toggle between light and dark themes
    body.classList.toggle('dark-theme');

	// Save the current theme to local storage
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);

    // Toggle between moon and sun icons using Unicode characters
    if (body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '🌙'; // Moon icon
    } else {
        themeToggle.innerHTML = '☀️'; // Sun icon
    }
});