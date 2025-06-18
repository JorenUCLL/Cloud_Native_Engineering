import { MongoWorkoutRepository } from "../repository/workout.db";
import { MongoUserRepository } from "../repository/user.db";
import { MongoTypeRepository } from "../repository/type.db";
import { WorkoutInput } from "../types";

export class WorkoutService {
  private static instance: WorkoutService;

  private workoutRepo = MongoWorkoutRepository.getInstance();
  private userRepo = MongoUserRepository.getInstance();
  private typeRepo = MongoTypeRepository.getInstance();

  static getInstance(): WorkoutService {
    if (!this.instance) {
      this.instance = new WorkoutService();
    }
    return this.instance;
  }

  async getAllWorkouts() {
    return await this.workoutRepo.getAllWorkouts();
  }

  async getWorkoutByUser(email: string) {
    const user = await this.userRepo.getUserByEmail(email);
    if (!user) {
      throw new Error("There is no user with that email address.");
    }
    return await this.workoutRepo.getWorkoutByUser(user.id);
  }

  async createWorkout({
    title,
    date,
    type: typeInput,
    user: userId,
  }: WorkoutInput) {
    const type = await this.typeRepo.getTypeById(typeInput.title);
    if (!type) {
      throw new Error("There is no type like that");
    }

    console.log(userId);
    const user = await this.userRepo.getUserById(userId);
    if (!user) {
      throw new Error("There is no user like that");
    }

    const workoutData = {
      title,
      date,
      type: type.id,
      user: user.id,
    };

    return await this.workoutRepo.createWorkout(workoutData);
  }
}
