const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://functioncloudnativegroup25.azurewebsites.net/api";

const getAllExercises = async () => {
  const response = await fetch(
    `https://functioncloudnativegroup25.azurewebsites.net/api/exercises`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch exercises");
  return response.json();
};

export default {
  getAllExercises,
};
