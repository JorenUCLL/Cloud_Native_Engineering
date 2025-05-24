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

const createWorkout = async (workout: Workout) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });

  if (!response.ok) {
    throw new Error("Failed to create workout");
  }

  return await response.json();
};

const WorkoutService = {
  getAllWorkouts,
  getWorkoutsByUser,
  createWorkout,
};

export default WorkoutService;
