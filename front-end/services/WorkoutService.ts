import { Workout } from "@/types";

export interface CreateWorkoutPayload {
  title: string;
  date: string;
  time: string;
  typeId: string;
}

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

const createWorkout = async (
  payload: CreateWorkoutPayload
): Promise<Response> => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const WorkoutService = {
  getAllWorkouts,
  getWorkoutsByUser,
  createWorkout,
};

export default WorkoutService;
