import { Workout } from "@/types";

const getAllWorkouts = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const WorkoutService = {
  getAllWorkouts,
};

export default WorkoutService;
