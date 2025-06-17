import { MongoAchievementRepository } from "../repository/achievement.db";
import { MongoUserRepository } from "../repository/user.db";

export class AchievementService {
  private static instance: AchievementService;

  private achievementRepo = MongoAchievementRepository.getInstance();
  private userRepo = MongoUserRepository.getInstance();

  static getInstance(): AchievementService {
    if (!this.instance) {
      this.instance = new AchievementService();
    }
    return this.instance;
  }

  async getAchievementsByUser(email: string) {
    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new Error("There is no user with that email address.");
    }
    return await this.achievementRepo.getAchievementsByUser(user.id);
  }

  async getAllAchievements() {
    return await this.achievementRepo.getAllAchievements();
  }
}
