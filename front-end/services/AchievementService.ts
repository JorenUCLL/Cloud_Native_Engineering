const getAchievementsByUser = async (email: string, token: string) => {
  const response = await fetch(
    "https://functioncloudnativegroup25.azurewebsites.net/api" +
      `/achievements/user/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

export default { getAchievementsByUser };
