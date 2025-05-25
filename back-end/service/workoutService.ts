import workoutRepository from '../repository/workout.db';
import userRepository from '../repository/user.db';
import typeRepository from '../repository/type.db';
import redisService from './redisService';
import { WorkoutInput } from '../types';

const getAllWorkouts = async () => {
    const cacheKey = 'workouts:all';

    try {
        const cachedWorkouts = await redisService.get(cacheKey);
        if (cachedWorkouts) {
            console.log('Cache hit for all workouts');
            return JSON.parse(cachedWorkouts);
        }
    } catch (error) {
        console.error('Redis error, continuing without cache:', error);
    }

    const workouts = await workoutRepository.getAllWorkouts();

    try {
        await redisService.set(cacheKey, JSON.stringify(workouts), 300);
    } catch (error) {
        console.error('Failed to cache all workouts:', error);
    }

    return workouts;
};

const getWorkoutByUser = async (email: string) => {
    const cacheKey = `workouts:user:${email}`;

    try {
        const cachedWorkouts = await redisService.get(cacheKey);
        if (cachedWorkouts) {
            console.log('Cache hit for user workouts:', email);
            return JSON.parse(cachedWorkouts);
        }
    } catch (error) {
        console.error('Redis error, continuing without cache:', error);
    }

    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }

    const workouts = await workoutRepository.getWorkoutsByUser(user.id);

    try {
        await redisService.set(cacheKey, JSON.stringify(workouts), 300);
    } catch (error) {
        console.error('Failed to cache workouts:', error);
    }

    return workouts;
};

const createWorkout = async ({ title, date, type: typeInput, user: userInput }: WorkoutInput) => {
    const type = await typeRepository.getTypeById(typeInput.title);
    if (!type) {
        throw new Error('There is no type like that');
    }
    const user = await userRepository.getUserByEmail(userInput.email);
    if (!user) {
        throw new Error('There is no user like that');
    }
    const workoutData = {
        title,
        date,
        type: type.id,
        user: user.id,
    };

    const newWorkout = await workoutRepository.createWorkout(workoutData);

    // Invalidate related caches
    try {
        await redisService.del(`workouts:user:${userInput.email}`);
        await redisService.del('workouts:all');
    } catch (error) {
        console.error('Failed to invalidate cache:', error);
    }

    return newWorkout;
};

export default {
    getAllWorkouts,
    getWorkoutByUser,
    createWorkout,
};
