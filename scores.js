const scoresUrl = 'https://m3rcurial92.github.io/colortap.io/scores.json';

const playerNameInput = document.getElementById('playerName');
const playerName = playerNameInput.value || 'Anonymous'; // Use 'Anonymous' if no name is provided
const playerScore = score;

// Fetch the current scores from GitHub
async function fetchScores() {
  try {
    const response = await fetch(scoresUrl);
    const scoresData = await response.json();
    
    // Add the new score to the scores array
    scoresData.scores.push({ playerName, score: playerScore });

    // Sort the scores in descending order
    scoresData.scores.sort((a, b) => b.score - a.score);

    // Keep only the top 10 scores
    scoresData.scores = scoresData.scores.slice(0, 10);

    // Update the JSON file on GitHub
    await updateScoresOnGitHub(scoresData);

    // Display the updated scores
    console.log(scoresData.scores);
  } catch (error) {
    console.error('Error fetching or updating scores:', error);
  }
}

// Update the JSON file on GitHub
async function updateScoresOnGitHub(scoresData) {
  try {
    const response = await fetch(scoresUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoresData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update scores. Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error updating scores: ${error.message}`);
  }
}