const themeToggle = document.getElementById('themeToggle');
const body = document.body;

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
	const savedPlayerName = localStorage.getItem('playerName'); // Retrieve the saved player name

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
		themeToggle.innerHTML = '☀️';
        // Add the 'dark-theme' class to your bar element
        const barElement = document.getElementById('menuBar'); // Replace with the actual ID
        if (barElement) {
            barElement.classList.add('dark-theme');
        }
    }
	
	// Set the saved player name in the input field
    const playerNameInput = document.getElementById('playerName');
    if (savedPlayerName) {
        playerNameInput.value = savedPlayerName;
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
        themeToggle.innerHTML = '☀️'; // Moon icon
    } else {
        themeToggle.innerHTML = '🌙'; // Sun icon
    }
});

function savePlayerName() {
    const playerNameInput = document.getElementById('playerName');
    const playerName = playerNameInput.value;

    // Save the player name in localStorage
    localStorage.setItem('playerName', playerName);
}

// Add an event listener to save the player name on input change
document.getElementById('playerName').addEventListener('input', savePlayerName);

document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...

    // Add an event listener to clear the best score when the button is clicked
    document.getElementById('clearBestScoreButton').addEventListener('click', clearBestScore);
});

// Function to clear the best score
function clearBestScore() {
    localStorage.removeItem('bestScore');
    alert('Best score cleared!');
}