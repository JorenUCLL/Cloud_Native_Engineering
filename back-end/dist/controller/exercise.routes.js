"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseRouter = void 0;
const express_1 = __importDefault(require("express"));
const exercise_db_1 = __importDefault(require("../repository/exercise.db"));
const exerciseRouter = express_1.default.Router();
exports.exerciseRouter = exerciseRouter;
exerciseRouter.get('/', async (req, res) => {
    try {
        const exercises = await exercise_db_1.default.getAllExercises();
        res.json(exercises);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch exercises.' });
    }
});
