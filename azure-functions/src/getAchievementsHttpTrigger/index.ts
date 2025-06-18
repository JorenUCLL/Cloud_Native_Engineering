import connectDB from "../repository/db";
import { AchievementService } from "../service/achievementService";

export default async function (context, req) {
  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*", // or your specific origin
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
    };
    return;
  }
  try {
    await connectDB();
    const achievements =
      await AchievementService.getInstance().getAllAchievements();
    context.log("Fetched achievements:", achievements);

    context.res = {
      body: achievements,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    context.log.error("Error in getAchievementsHttpTrigger:", error);
    context.res = {
      status: 500,
      body: { error: error.message || "Internal Server Error" },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // or your frontend URL
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
    };
  }
  return context.res;
}
