import { Workout } from '../model/workout';
import { set } from 'date-fns';
import database from './database';

const start = set(new Date(), { hours: 8, minutes: 30 });

const getAllWorkouts = async (): Promise<Workout[]> => {
    try {
        const workoutPrisma = await database.workout.findMany({
            include: {
                type: true,
                user: true,
            },
        });
        return workoutPrisma.map((workoutPrisma) => Workout.from(workoutPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const createWorkout = async (workout: Workout): Promise<Workout> => {
    try {
        const workoutPrisma = await database.workout.create({
            data: {
                title: workout.getTitle(),
                date: workout.getDate(),
                type: {
                    connect: { id: workout.getType().getId() },
                },
                user: {
                    connect: { id: workout.getUser().getId() },
                },
            },
            include: {
                type: true,
                user: true,
            },
        });

        return Workout.from(workoutPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllWorkouts,
    createWorkout,
};
