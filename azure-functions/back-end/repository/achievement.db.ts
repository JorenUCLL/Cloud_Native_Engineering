import AchievementModel, { IAchievement } from '../mongo-models/Achievement';

const getAllAchievements = async (): Promise<IAchievement[]> => {
    return await AchievementModel.find().populate('user');
};

const createAchievement = async (data: Partial<IAchievement>): Promise<IAchievement> => {
    const achievement = new AchievementModel(data);
    return await achievement.save();
};

const getAchievementsByUser = async (userId: string): Promise<IAchievement[]> => {
    return await AchievementModel.find({ user: userId });
};

export default {
    getAllAchievements,
    createAchievement,
    getAchievementsByUser,
};
