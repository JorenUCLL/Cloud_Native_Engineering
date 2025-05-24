import express from 'express';
import workoutService from '../service/workoutService';
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
    expressjwt({
        secret: process.env.JWT_SECRET!,
        algorithms: ['HS256'],
        requestProperty: 'auth',
    }),
    async (req: any, res) => {
        try {
            const { title, date, time, typeId } = req.body;
            const userEmail: string = req.auth.email;

            const [hrs, mins] = (time as string).split(':').map(Number);
            const workoutDate = new Date(date);
            workoutDate.setHours(hrs, mins);

            const newWorkout = await workoutService.createWorkout({
                title,
                date: workoutDate,
                typeId,
                userEmail,
            });

            return res.status(201).json(newWorkout);
        } catch (err: any) {
            return res.status(400).json({ error: err.message || 'Failed to create workout.' });
        }
    }
);

export default workoutRouter;
