import express from 'express';
import userService from '../service/userService';
import { UserInput } from '../types/index';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const userInput = <UserInput>req.body;
        const response = await userService.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log in.' });
    }
});

export { userRouter };
