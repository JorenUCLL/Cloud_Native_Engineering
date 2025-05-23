import ExerciseModel, { IExercise } from '../mongo-models/Exercise';

const getAllExercises = async (): Promise<IExercise[]> => {
    return await ExerciseModel.find().populate('workout');
};

const createExercise = async (data: Partial<IExercise>): Promise<IExercise> => {
    const exercise = new ExerciseModel(data);
    return await exercise.save();
};

export default {
    getAllExercises,
    createExercise,
};
