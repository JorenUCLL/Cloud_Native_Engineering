import { Workout } from "@/types";

const getAllWorkouts = async () => {
  const response = await fetch(
    `https://functioncloudnativegroup25.azurewebsites.net/api/workouts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  console.log("Response from getAllWorkouts:", response.json());
  return await response.json();
};

const getWorkoutsByUser = async (email: string) => {
  const response = await fetch(
    `https://functioncloudnativegroup25.azurewebsites.net/api/workouts/user/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch workouts for user");
  }

  return await response.json();
};

const createWorkout = async (workout: Workout) => {
  const response = await fetch(
    `https://functioncloudnativegroup25.azurewebsites.net/api/workouts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    }
  );

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
