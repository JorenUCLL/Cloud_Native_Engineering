import workoutRepository from '../repository/workout.db';
import { Workout } from '../model/workout';

const getAllWorkouts = async (): Promise<Workout[]> => {
    return await workoutRepository.getAllWorkouts();
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
    // createWorkout,
};
