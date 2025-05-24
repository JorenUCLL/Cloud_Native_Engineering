import workoutRepository from '../repository/workout.db';
import userRepository from '../repository/user.db';
import typeRepository from '../repository/type.db';
import { WorkoutInput } from '../types';

const getAllWorkouts = async () => {
    return await workoutRepository.getAllWorkouts();
};

const getWorkoutByUser = async (email: string) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }
    return await workoutRepository.getWorkoutsByUser(user.id);
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
    return await workoutRepository.createWorkout(workoutData);
};

export default {
    getAllWorkouts,
    getWorkoutByUser,
    createWorkout,
};
