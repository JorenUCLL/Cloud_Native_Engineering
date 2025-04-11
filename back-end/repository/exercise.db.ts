import { Exercise } from '../model/exercise';
import database from './database';

const getAllExercises = async (): Promise<Exercise[]> => {
    try {
        const exercisePrisma = await database.exercise.findMany({
            include: {
                type: true,
                achievements: true,
            },
        });
        return exercisePrisma.map((exercise) => Exercise.from(exercise));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllExercises,
};
