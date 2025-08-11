const fetch = require('node-fetch');

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function analyzeMood(text) {
  try {
    if (!text || text.trim().length === 0) {
      console.log('analyzeMood: empty or whitespace text received');
      return 'neutral';
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/yangheng/deberta-v3-base-absa-v1.1',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error:', response.status, errorText);
      return 'neutral';
    }

    const data = await response.json();
    console.log('Hugging Face API response:', JSON.stringify(data));

    // Unwrap nested array (data[0] is usually an array of sentiment objects)
    const sentiments = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];

    if (sentiments.length === 0) {
      console.warn('No sentiments found in API response, returning neutral');
      return 'neutral';
    }

    // Find the sentiment with the highest score
    const topSentiment = sentiments.reduce((max, curr) =>
      curr.score > max.score ? curr : max
    , sentiments[0]);

    return topSentiment.label.toLowerCase();

  } catch (error) {
    console.error('Error in analyzeMood:', error);
    return 'neutral';
  }
}

module.exports = analyzeMood;
