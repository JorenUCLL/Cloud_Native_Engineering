import { MongoExerciseRepository } from "../repository/exercise.db";
import { MongoWorkoutRepository } from "../repository/workout.db";

export class ExerciseService {
  private static instance: ExerciseService;

  private exerciseRepo = MongoExerciseRepository.getInstance();
  private workoutRepo = MongoWorkoutRepository.getInstance();

  static getInstance(): ExerciseService {
    if (!this.instance) {
      this.instance = new ExerciseService();
    }
    return this.instance;
  }

  async getAllExercises() {
    return await this.exerciseRepo.getAllExercises();
  }

  async createExercise({
    name,
    description,
    workout: workoutInput,
  }: {
    name: string;
    description?: string;
    workout?: { id: string };
  }) {
    let workout = undefined;

    if (workoutInput?.id) {
      workout = await this.workoutRepo.getWorkoutById(workoutInput.id);
      if (!workout) {
        throw new Error("No workout found with the given ID.");
      }
    }

    return await this.exerciseRepo.createExercise({
      name,
      description,
      workout: workout?._id,
    });
  }
}
