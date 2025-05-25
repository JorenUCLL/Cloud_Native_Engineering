const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const getAllExercises = async () => {
  const response = await fetch(`${API_URL}/exercises`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Failed to fetch exercises");
  return response.json();
};

export default {
  getAllExercises,
};
