import express from 'express';
import typeService from '../service/typeService';

const typeRouter = express.Router();

typeRouter.get('/', async (req, res) => {
    try {
        const types = await typeService.getAllTypes();
        res.json(types);
    } catch (error) {
        console.error('Error in GET /types:', error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

export { typeRouter };
