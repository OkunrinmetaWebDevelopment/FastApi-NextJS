import { sendMessage } from '../../lib/api';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Validate the request body
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message format.' });
    }

    if (!Array.isArray(conversationHistory)) {
      return res.status(400).json({ error: 'Invalid conversation history format.' });
    }

    try {
      // Call the sendMessage function to process the chat request
      const response = await sendMessage(message, conversationHistory);

      // Return the successful response
      res.status(200).json(response);
    } catch (error) {
      console.error('Error processing the request:', error.message);
      
      if (error.response?.status === 429) {
        // Rate limiting specific error
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
      }
      
      res.status(500).json({
        error: 'An error occurred while processing your request.',
        details: error.message || 'Unknown error',
      });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
