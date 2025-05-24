import WorkoutModel, { IWorkout } from '../mongo-models/Workout';

const getAllWorkouts = async (): Promise<IWorkout[]> => {
    return await WorkoutModel.find().populate('type').populate('user').populate('exercises');
};

const getWorkoutsByUser = async (userId: string): Promise<IWorkout[]> => {
    return await WorkoutModel.find({ user: userId })
        .populate('type')
        .populate('user')
        .populate('exercises');
};

const createWorkout = async (data: Partial<IWorkout>): Promise<IWorkout> => {
    const workout = new WorkoutModel(data);
    return await workout.save();
};

export default {
    getAllWorkouts,
    getWorkoutsByUser,
    createWorkout,
};
