import express from 'express';
import workoutService from '../service/workoutService';
import { WorkoutInput } from '../types';
import { cacheMiddleware } from '../util/cacheMiddleware';

const workoutRouter = express.Router();

// Cache  5 minutes 
workoutRouter.get('/', cacheMiddleware(300), async (req, res) => {
    try {
        const workouts = await workoutService.getAllWorkouts();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts.' });
    }
});

// Cache 
workoutRouter.get('/user/:email', cacheMiddleware(120), async (req, res) => {
    try {
        const workouts = await workoutService.getWorkoutByUser(req.params.email);
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts.' });
    }
});

workoutRouter.post('/', async (req, res) => {
    try {
        const Data: WorkoutInput = req.body;
        const newWorkout = await workoutService.createWorkout(req.body);
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ error: 'Failed to create workout.' });
    }
});

export default workoutRouter;
