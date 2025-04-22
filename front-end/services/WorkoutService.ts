import { Workout } from "@/types";

const getAllWorkouts = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getWorkoutsByUser = async (email: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/workouts/user/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const WorkoutService = {
  getAllWorkouts,
  getWorkoutsByUser,
};

export default WorkoutService;
