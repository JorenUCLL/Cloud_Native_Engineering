const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7071";

const getAllExercises = async () => {
  const response = await fetch(`http://localhost:7071/api/exercises`, {
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
