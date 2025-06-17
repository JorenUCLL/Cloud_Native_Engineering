import UserModel, { IUser } from "../mongo-models/User";

export class MongoUserRepository {
  private static instance: MongoUserRepository;

  static getInstance(): MongoUserRepository {
    if (!this.instance) {
      this.instance = new MongoUserRepository();
    }
    return this.instance;
  }

  private constructor() {}

  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(userData);
    return await user.save();
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }
}
