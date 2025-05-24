import { Workout } from "@/types";

export interface CreateWorkoutPayload {
  title: string;
  date: string;
  time: string;
  typeId: string;
  userId?: string;
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
  payload: CreateWorkoutPayload,
  token: string
): Promise<Response> => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
};

const WorkoutService = {
  getAllWorkouts,
  getWorkoutsByUser,
  createWorkout,
};

export default WorkoutService;
