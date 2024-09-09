import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const hostURL="https://de3a-54-174-196-12.ngrok-free.app";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const url = hostURL + "/llm2/final_result_web"
    console.log({req});

    
    try {
        const response = await axios.post('https://de3a-54-174-196-12.ngrok-free.app/llm2/final_result_web', req.body, {
            responseType: 'stream',
        });

        res.status(response.status);
        response.data.pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to communicate with backend' });
    }
}
