import ExerciseModel, { IExercise } from "../mongo-models/Exercise";

export class MongoExerciseRepository {
  private static instance: MongoExerciseRepository;

  static getInstance(): MongoExerciseRepository {
    if (!this.instance) {
      this.instance = new MongoExerciseRepository();
    }
    return this.instance;
  }

  private constructor() {}

  async getAllExercises(): Promise<IExercise[]> {
    return await ExerciseModel.find().populate("workout");
  }

  async createExercise(data: Partial<IExercise>): Promise<IExercise> {
    const exercise = new ExerciseModel(data);
    return await exercise.save();
  }
}
