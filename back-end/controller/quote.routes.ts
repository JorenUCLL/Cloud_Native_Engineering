import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const response = await fetch('https://zenquotes.io/api/random');
        const data = await response.json() as { q: string; a: string }[];
        res.json({ text: data[0].q, author: data[0].a });
    } catch (e) {
        res.status(500).json({ text: "The only bad workout is the one that didn't happen.", author: "Unknown" });
    }
});

export default router;