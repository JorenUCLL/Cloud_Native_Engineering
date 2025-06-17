import AchievementModel, { IAchievement } from "../mongo-models/Achievement";

export class MongoAchievementRepository {
  private static instance: MongoAchievementRepository;

  static getInstance(): MongoAchievementRepository {
    if (!this.instance) {
      this.instance = new MongoAchievementRepository();
    }
    return this.instance;
  }

  private constructor() {}

  async getAllAchievements(): Promise<IAchievement[]> {
    return await AchievementModel.find().populate("user");
  }

  async createAchievement(data: Partial<IAchievement>): Promise<IAchievement> {
    const achievement = new AchievementModel(data);
    return await achievement.save();
  }

  async getAchievementsByUser(userId: string): Promise<IAchievement[]> {
    return await AchievementModel.find({ user: userId });
  }
}
