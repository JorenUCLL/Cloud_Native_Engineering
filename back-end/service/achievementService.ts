import achievementRepository from '../repository/achievement.db';
import userRepository from '../repository/user.db';

const getAchievementsByUser = async (email: string) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error('There is no user with that email address.');
    }
    return await achievementRepository.getAchievementsByUser(user.id);
};

const getAllAchievements = async () => {
    return await achievementRepository.getAllAchievements();
};

export default {
    getAchievementsByUser,
    getAllAchievements,
};
