import workoutRepository from '../repository/workout.db';
import userRepository from '../repository/user.db';
import typeRepository from '../repository/type.db';
import { WorkoutInput } from '../types';
import { IWorkout } from '../mongo-models/Workout';

interface CreateWorkoutDto {
    title: string;
    date: Date;
    typeId: string;
    userEmail: string;
}

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

const createWorkout = async (data: CreateWorkoutDto): Promise<IWorkout> => {
    const type = await typeRepository.getTypeById(data.typeId);
    if (!type) throw new Error('There is no type like that');

    const user = await userRepository.getUserByEmail(data.userEmail);
    if (!user) throw new Error('There is no user like that');

    const workoutData = {
        title: data.title,
        date: data.date,
        type: type._id,
        user: user._id,
    };

    return await workoutRepository.createWorkout(workoutData);
};

export default {
    getAllWorkouts,
    getWorkoutByUser,
    createWorkout,
};
