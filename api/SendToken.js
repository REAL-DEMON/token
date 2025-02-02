// api/sendToken.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;

    // Your webhook URL (replace with the actual webhook URL)
    const webhookURL = 'https://your-webhook-url.com';

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
