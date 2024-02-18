//const scoresUrl = 'https://m3rcurial92.github.io/colortap.io/scores.json';
const scoresUrl = 'https://raw.githubusercontent.com/m3rcurial92/colortap.io/main/scores.json'

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

    return scoresData;
  } catch (error) {
    console.error('Error fetching or updating scores:', error);
	return null;
  }
}

// Function to display scores in the modal
async function displayScores() {
  const scores = await fetchScores();
  
  if (scores == null)
	  return;
	
  // Find the scoresColumn element
  const scoresColumn = document.getElementById('scoresColumn');

  // Create a list element to display the scores
  const scoresList = document.createElement('ul');

  // Loop through the scores and create list items for each score
  scores.forEach(score => {
    const listItem = document.createElement('li');
    listItem.textContent = `${score.name}: ${score.score}`;
    scoresList.appendChild(listItem);
  });

  // Append the scores list to the scoresColumn
  scoresColumn.appendChild(scoresList);
}

// Call displayScores when needed, e.g., when the modal is opened
displayScores();

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