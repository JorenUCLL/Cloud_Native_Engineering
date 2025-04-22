import workoutRepository from '../repository/workout.db';
import userRepository from '../repository/user.db';

import { Workout } from '../model/workout';

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

// const createWorkout = async (workoutData: any): Promise<Workout> => {
//     const workout = new Workout(
//         workoutData.title,
//         new Date(workoutData.date),
//         workoutData.type,
//         workoutData.user
//     );
//     return await workoutRepository.createWorkout(workout);
// };

export default {
    getAllWorkouts,
    getWorkoutByUser,
    // createWorkout,
};
