import connectDB from "../repository/db";
import { WorkoutService } from "../service/workoutService";

export default async function (context, req) {
  try {
    await connectDB();
    const workouts = await WorkoutService.getInstance().getAllWorkouts();
    context.log("Fetched workouts:", workouts);

    context.res = {
      body: workouts,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    context.log.error("Error in getWorkoutsHttpTrigger:", error);
    context.res = {
      status: 500,
      body: { error: error.message || "Internal Server Error" },
      headers: { "Content-Type": "application/json" },
    };
  }
  return context.res;
}
