import connectDB from "../repository/db";
import { WorkoutService } from "../service/workoutService";

export default async function (context, req) {
  try {
    await connectDB();

    const workoutData = req.body;
    const newWorkout = await WorkoutService.getInstance().createWorkout(workoutData);
    context.log("Created workout:", newWorkout);

    context.res = {
      status: 201,
      body: newWorkout,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    context.log.error("Error in postWorkoutsHttpTrigger:", error);
    context.res = {
      status: 500,
      body: { error: error.message || "Internal Server Error" },
      headers: { "Content-Type": "application/json" },
    };
  }

  return context.res;
}
