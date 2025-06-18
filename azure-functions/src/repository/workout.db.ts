import WorkoutModel, { IWorkout } from "../mongo-models/Workout";

export class MongoWorkoutRepository {
  private static instance: MongoWorkoutRepository;

  static getInstance(): MongoWorkoutRepository {
    if (!this.instance) {
      this.instance = new MongoWorkoutRepository();
    }
    return this.instance;
  }

  private constructor() {}

  async getAllWorkouts(): Promise<IWorkout[]> {
    return await WorkoutModel.find()
  }

  async getWorkoutByUser(userId: string): Promise<IWorkout[]> {
    return await WorkoutModel.find({ user: userId })
  }

  async createWorkout(data: Partial<IWorkout>): Promise<IWorkout> {
    const workout = new WorkoutModel(data);
    return await workout.save();
  }

  async getWorkoutById(id: string): Promise<IWorkout | null> {
    return await WorkoutModel.findById(id);
  }
}
