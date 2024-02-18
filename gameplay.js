// gameplay.js

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const cumulativeTimerDisplay = document.getElementById('cumulativeTimer');

let score = 0;
let startTime;
let timerInterval;
let timerMilliseconds = 0;
let gameInProgress = false;
let cumulativeTime = 0;
let gameStopped = true; // Flag to track whether the game is stopped
let gridSize = 2; // Initial grid size
let totalElapsedTime = 0;
let maxTime = 60000;
let correctClicks = 0;
let incorrectClicks = 0;

// At the beginning of your script, check if there's a bestScore in localStorage
let bestScore = localStorage.getItem('bestScore');

// If not, set it to 0
if (!bestScore) {
    bestScore = 0;
}

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);

function startGame() {
    if (gameStopped) {
        // If the game was stopped, revert the colors back to their previous state
        const squares = document.querySelectorAll('.square:not(#targetColor)');
        squares.forEach(square => {
            square.style.backgroundColor = square.dataset.previousColor;
			square.classList.remove('non-clickable');
        });

		startButton.textContent = 'Restart Game';
        startButton.style.backgroundColor = '#867571'; 

        if (timerMilliseconds > 0) {
            startTimer();
        }
        gameStopped = false;
    } else {
        resetGame();
    }
}

function stopGame() {
    gameInProgress = false; // Stop the game
    stopTimer(); // Stop the timer

    // Change the color of all squares to the targetColor
    const squares = document.querySelectorAll('.square:not(#targetColor)');
    squares.forEach(square => {
        square.style.backgroundColor = targetColorSquare.style.backgroundColor;
		square.classList.add('non-clickable');
    });

	startButton.textContent = 'Continue Game';
    startButton.style.backgroundColor = '#51DA11'; 

    gameStopped = true;
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const milliseconds = Math.floor(elapsedTime % 1000);

	totalElapsedTime = elapsedTime + cumulativeTime; // Update totalElapsedTime
	
    // Ensure milliseconds are displayed as 2 digits
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0').slice(0, 2);

    timerDisplay.textContent = `Time: ${seconds}.${formattedMilliseconds}s`;
    timerMilliseconds = elapsedTime; // Update the timerMilliseconds for score calculation
	
	// Check if the total elapsed time exceeds 1 minute (60,000 milliseconds)
    if (totalElapsedTime > maxTime) {
        showSummary(); // Display summary window
    }
}

function startTimer() {
    startTime = Date.now() - timerMilliseconds;
    timerInterval = setInterval(updateTimer, 10); // Update timer every 10 milliseconds
    gameInProgress = true;
}

function stopTimer() {
    clearInterval(timerInterval);
	gameInProgress = false; // Reset the game-in-progress flag
}

function resetGame() {
    gridSize = 2; // Reset grid size
    updateGrid(gridSize);
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
	correctClicks = 0;
	incorrectClicks = 0;
    timerMilliseconds = 0;
    timerDisplay.textContent = 'Time: 0.00s';
	cumulativeTime = 0; // Reset cumulative timer
    cumulativeTimerDisplay.textContent = `Cumulative Time: ${formatTime(cumulativeTime)}`;
    stopTimer();
    gameInProgress = false; // Reset the game-in-progress flag
}

function handleSquareClick(color) {
    // Check if the game is not already in progress
    if (!gameInProgress) {
        startGame();
    }

	// Update the cumulative timer
    cumulativeTime += timerMilliseconds;
	cumulativeTimerDisplay.textContent = `Cumulative Time: ${formatTime(cumulativeTime)}`;

    // Check if the clicked square has the correct color
    if (color === targetColorSquare.style.backgroundColor) {
        // If correct, increase the score
        score++;
		correctClicks++;

        // Check if the current score is a multiple of 3
        if (score % 3 === 0) {
            // Increase the grid size by one row and one column
            gridSize++;
        }

		playBlinkSound();
    } else {
		if (score % 3 === 0) {
            gridSize = Math.max(2, gridSize - 1);
		}

        // If incorrect, decrease the score (ensure score doesn't go below 0)
        score = Math.max(0, score - 1);
		incorrectClicks++;

		gridSizeIncrease = false; // Reset the flag
    }

    // Update the score display with cumulative time
    scoreDisplay.textContent = `Score: ${score}`;

    // Set a new target color
    targetColor = generateRandomColor();
    targetColorSquare.style.backgroundColor = targetColor;

    // Update the grid
    updateGrid(gridSize);

    // Restart the timer for the next game
    restartTimer();
}

function showSummary() {
	// Check if the current score is higher than the bestScore
    if (score > bestScore) {
        bestScore = score;
        // Update the bestScore in localStorage
        localStorage.setItem('bestScore', bestScore);
		
		// Call this function when the game ends to add the player's score
		fetchScores();
    }
	
    const summaryContainer = document.getElementById('summaryContainer'); // Replace 'summaryContainer' with the actual ID of the HTML element where you want to display the summary
    const summaryContent = `
        <p>Score: ${score}</p>
        <p>Correct Clicks: ${correctClicks}</p>
        <p>Incorrect Clicks: ${incorrectClicks}</p>
        <p>Best Score: ${bestScore}</p>
    `;

    document.getElementById('summaryContent').innerHTML = summaryContent;
    summaryContainer.style.display = 'block';
	
	resetGame();
	startGame();
}

function closeSummary() {
    document.getElementById('summaryContainer').style.display = 'none';
}

function restartTimer() {
    stopTimer();
    timerMilliseconds = 0; // Reset the timer to zero
    startTimer();
}

function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const formattedMilliseconds = (milliseconds % 1000).toString().padStart(3, '0').slice(0, 2);
    return `${seconds}.${formattedMilliseconds}s`;
}
