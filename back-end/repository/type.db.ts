import { Type } from '../model/type';
import database from './database';

const getAllTypes = async (): Promise<Type[]> => {
    try {
        const typePrisma = await database.type.findMany({
            include: {
                exercises: true,
                workouts: true,
            },
        });
        return typePrisma.map((type) => Type.from(type));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllTypes,
};
