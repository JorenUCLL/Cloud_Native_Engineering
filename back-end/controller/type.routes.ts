import express from 'express';
import typeService from '../service/typeService';

const typeRouter = express.Router();

typeRouter.get('/', async (req, res) => {
    try {
        const types = await typeService.getAllTypes();
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

export { typeRouter };
