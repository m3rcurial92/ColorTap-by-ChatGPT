// updateScores.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
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

    if (!updateResponse.ok) {
      return {
        statusCode: updateResponse.status,
        body: `Failed to update scores. Status: ${updateResponse.status}`,
      };
    }

    return {
      statusCode: 200,
      body: 'Scores updated successfully',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error updating scores: ${error.message}`,
    };
  }
};