"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.achievementRouter = void 0;
const express_1 = __importDefault(require("express"));
const achievementService_1 = __importDefault(require("../service/achievementService"));
const achievementRouter = express_1.default.Router();
exports.achievementRouter = achievementRouter;
achievementRouter.get('/user/:email', async (req, res) => {
    try {
        const achievements = await achievementService_1.default.getAchievementsByUser(req.params.email);
        res.json(achievements);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch achievements.' });
    }
});
achievementRouter.get('/', async (req, res) => {
    try {
        const achievements = await achievementService_1.default.getAllAchievements();
        res.json(achievements);
    }
    catch (error) {
        console.error('Error in GET /achievements:', error);
        res.status(500).json({ error: 'Failed to fetch achievements.' });
    }
});
