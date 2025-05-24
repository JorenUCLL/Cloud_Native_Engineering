"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workoutService_1 = __importDefault(require("../service/workoutService"));
const express_jwt_1 = require("express-jwt");
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
workoutRouter.post('/', (0, express_jwt_1.expressjwt)({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'auth',
}), async (req, res) => {
    try {
        const { title, date, time, typeId } = req.body;
        const userEmail = req.auth.email;
        // Bouw je Date-object
        const [hrs, mins] = time.split(':').map(Number);
        const workoutDate = new Date(date);
        workoutDate.setHours(hrs, mins);
        // Roep service aan met het nieuwe DTO
        const newWorkout = await workoutService_1.default.createWorkout({
            title,
            date: workoutDate,
            typeId,
            userEmail,
        });
        return res.status(201).json(newWorkout);
    }
    catch (err) {
        console.error('💥 createWorkout error:', err);
        return res.status(400).json({ error: err.message || 'Failed to create workout.' });
    }
});
exports.default = workoutRouter;
