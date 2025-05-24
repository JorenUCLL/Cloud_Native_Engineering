import express from 'express';
import workoutService from '../service/workoutService';
import { WorkoutInput } from '../types';
import { expressjwt } from 'express-jwt';

const workoutRouter = express.Router();

workoutRouter.get('/', async (req, res) => {
    try {
        const workouts = await workoutService.getAllWorkouts();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts.' });
    }
});
workoutRouter.get('/user/:email', async (req, res) => {
    try {
        const workouts = await workoutService.getWorkoutByUser(req.params.email);
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts.' });
    }
});

workoutRouter.post(
    '/',
    expressjwt({ secret: process.env.JWT_SECRET!, algorithms: ['HS256'] }),
    async (req: any, res) => {
        try {
            const { title, date, time, typeId } = req.body;
            const workoutDate = new Date(date);
            const [hrs, mins] = time.split(':').map(Number);
            workoutDate.setHours(hrs, mins);
            const newWorkout = await workoutService.createWorkout({
                title,
                date: workoutDate,
                type: typeId,
                user: req.user.id,
            });
            res.status(201).json(newWorkout);
        } catch {
            res.status(500).json({ error: 'Failed to create workout.' });
        }
    }
);

export default workoutRouter;
