"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workoutService_1 = __importDefault(require("../service/workoutService"));
const workoutRouter = express_1.default.Router();
workoutRouter.get('/', async (req, res) => {
    try {
        const workouts = await workoutService_1.default.getAllWorkouts();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts.' });
    }
});
workoutRouter.get('/user/:email', async (req, res) => {
    try {
        const workouts = await workoutService_1.default.getWorkoutByUser(req.params.email);
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts.' });
    }
});
workoutRouter.post('/', async (req, res) => {
    try {
        const Data = req.body;
        const newWorkout = await workoutService_1.default.createWorkout(req.body);
        res.status(201).json(newWorkout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create workout.' });
    }
});
exports.default = workoutRouter;
