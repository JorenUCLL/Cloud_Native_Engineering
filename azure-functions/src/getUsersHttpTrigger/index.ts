import connectDB from "../repository/db";
import { UserService } from "../service/userService";

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
    const users = await UserService.getInstance().getAllUsers();
    context.log("Fetched users:", users);

    context.res = {
      body: users,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    context.log.error("Error in getUsersHttpTrigger:", error);
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
