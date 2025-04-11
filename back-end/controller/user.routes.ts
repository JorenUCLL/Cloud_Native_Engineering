import express from 'express';
import userService from '../service/userService';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

export { userRouter };
