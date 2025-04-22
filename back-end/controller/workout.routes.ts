import express from 'express';
import workoutService from '../service/workoutService';

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

// router.post('/', async (req, res) => {
//     try {
//         const newWorkout = await workoutService.createWorkout(req.body);
//         res.status(201).json(newWorkout);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create workout.' });
//     }
// });

export default workoutRouter;
