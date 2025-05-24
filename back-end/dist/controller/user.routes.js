"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = __importDefault(require("../service/userService"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get('/', async (req, res) => {
    try {
        console.log('test');
        const users = await userService_1.default.getAllUsers();
        res.json(users);
    }
    catch (error) {
        console.log('Error in GET /users:', error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});
userRouter.get('/:email', async (req, res) => {
    try {
        const users = await userService_1.default.getUserByEmail(req.params.email);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});
userRouter.post('/login', async (req, res) => {
    try {
        const userInput = req.body;
        const response = await userService_1.default.authenticate(userInput);
        res.status(200).json({ message: 'Authentication succesful', ...response });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to log in.' });
    }
});
