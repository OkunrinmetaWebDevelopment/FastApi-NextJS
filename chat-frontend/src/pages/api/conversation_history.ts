import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.post('http://localhost:8000/conversation_history/', req.body);

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to communicate with backend' });
    }
}
