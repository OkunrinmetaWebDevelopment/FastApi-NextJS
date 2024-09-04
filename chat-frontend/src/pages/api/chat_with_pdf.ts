import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.post('https://ad00-44-211-224-2.ngrok-free.app/llm2/final_result_web', req.body, {
            responseType: 'stream',
        });

        res.status(response.status);
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to communicate with backend' });
    }
}
