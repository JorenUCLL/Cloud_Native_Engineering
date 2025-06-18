import { WorkoutService } from "../service/workoutService";
import { UserService } from "../service/userService";
import connectDB from "../repository/db";

module.exports = async function (context, req) {
  try {
    console.log("Eerste MongoDB URI:", process.env.MONGODB_URI);

    await connectDB();
    console.log("MongoDB URI:", process.env.MONGODB_URI);

    const email = req.params.email || (req.body && req.body.email);

    if (!email) {
      context.res = {
        status: 400,
        body: { error: "Email is required." },
      };
      return;
    }

    const user = await UserService.getInstance().getUserByEmail(email);
    if (!user) {
      context.res = {
        status: 404,
        body: { error: "User not found." },
      };
      return;
    }
    const response = await WorkoutService.getInstance().getWorkoutByUser(user.email);

    context.res = {
      status: 200,
      body: { workouts: response },
      headers: { "Content-Type": "application/json" },
    };
    return context.res;
  } catch (err) {
    context.log.error("Error in function:", err);
    context.res = {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
};
