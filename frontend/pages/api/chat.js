import { sendMessage } from '../../lib/api';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message, conversationHistory } = req.body;
      const response = await sendMessage(message, conversationHistory);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}