import { Achievement } from '../model/achievement';
import database from './database';

const getAllAchievements = async (): Promise<Achievement[]> => {
    try {
        const achievementPrisma = await database.achievement.findMany({
            include: {
                exercise: {
                    include: {
                        type: true,
                    },
                },
                user: true,
            },
        });

        return achievementPrisma.map((achievement) => Achievement.from(achievement));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllAchievements,
};
