import connectDB from "../repository/db";
import { UserService } from "../service/userService";

export default async function (context, req) {
  try {
    await connectDB();
    const users = await UserService.getInstance().getAllUsers();
    context.log("Fetched users:", users);

    context.res = {
      body: users,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    context.log.error("Error in getUsersHttpTrigger:", error);
    context.res = {
      status: 500,
      body: { error: error.message || "Internal Server Error" },
      headers: { "Content-Type": "application/json" },
    };
  }
  return context.res;
}
