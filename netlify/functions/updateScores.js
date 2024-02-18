// updateScores.js

const { default: fetch } = await import('node-fetch');

exports.handler = async (event, context) => {
  try {
	console.log('Function triggered'); // Add this line for logging

    const scoresUrl = 'https://raw.githubusercontent.com/m3rcurial92/colortap.io/main/scores.json';
    const { GITHUB_TOKEN } = process.env;

    // Fetch the current scores from GitHub
    const response = await fetch(scoresUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: `Failed to fetch scores. Status: ${response.status}`,
      };
    }

    let scoresData = await response.json();

    // Update scoresData as needed, e.g., add a new score
    // ...

    // Perform the update
    const updateResponse = await fetch(scoresUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoresData),
    });
	
	console.log('Update response:', updateResponse); // Add this line for logging
	
    if (!updateResponse.ok) {
      return {
        statusCode: updateResponse.status,
        body: `Failed to update scores. Status: ${updateResponse.status}`,
      };
    }

	console.log('Function completed successfully'); // Add this line for logging

    return {
      statusCode: 200,
      body: 'Scores updated successfully',
    };
  } catch (error) {
	console.error('Error updating scores:', error); // Add this line for logging
	  
    return {
      statusCode: 500,
      body: `Error updating scores: ${error.message}`,
    };
  }
};