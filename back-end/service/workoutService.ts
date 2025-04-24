import workoutRepository from '../repository/workout.db';
import userRepository from '../repository/user.db';
import typeRepository from '../repository/type.db';

import { Workout } from '../model/workout';
import { WorkoutInput } from '../types';
import { User } from '../model/user';

const getAllWorkouts = async (): Promise<Workout[]> => {
    return await workoutRepository.getAllWorkouts();
};

const getWorkoutByUser = async (email: string): Promise<Workout[]> => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email adress.');
    }
    return await workoutRepository.getWorkoutsByUser(user);
};

const createWorkout = async ({
    title,
    date,
    type: typeInput,
    user: userInput,
}: WorkoutInput): Promise<Workout> => {
    console.log('1');
    const type = await typeRepository.getTypeById(typeInput.title);
    if (!type) {
        throw new Error('There is no type like that');
    }
    console.log('2');

    const user = await userRepository.getUserByEmail(userInput.email);
    if (!user) {
        throw new Error('There is no user like that');
    }

    const workout = new Workout({
        title,
        date,
        type,
        user,
    });
    console.log(workout);
    return await workoutRepository.createWorkout(workout);
};

export default {
    getAllWorkouts,
    getWorkoutByUser,
    createWorkout,
};
