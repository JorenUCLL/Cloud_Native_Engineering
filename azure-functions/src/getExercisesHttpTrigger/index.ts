import connectDB from "../repository/db";
import { ExerciseService } from "../service/exerciseService";

export default async function (context, req) {
  try {
    await connectDB();
    const exercises = await ExerciseService.getInstance().getAllExercises();
    context.log("Fetched exercises:", exercises);

    context.res = {
      body: exercises,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    context.log.error("Error in getExercisesHttpTrigger:", error);
    context.res = {
      status: 500,
      body: { error: error.message || "Internal Server Error" },
      headers: { "Content-Type": "application/json" },
    };
  }
  return context.res;
}
