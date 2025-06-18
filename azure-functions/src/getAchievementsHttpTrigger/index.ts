import connectDB from "../repository/db";
import { AchievementService } from "../service/achievementService";

export default async function (context, req) {
  try {
    await connectDB();
    const achievements =
      await AchievementService.getInstance().getAllAchievements();
    context.log("Fetched achievements:", achievements);

    context.res = {
      body: achievements,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    context.log.error("Error in getAchievementsHttpTrigger:", error);
    context.res = {
      status: 500,
      body: { error: error.message || "Internal Server Error" },
      headers: { "Content-Type": "application/json" },
    };
  }
  return context.res;
}
