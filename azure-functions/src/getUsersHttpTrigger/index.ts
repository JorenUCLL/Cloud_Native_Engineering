import { use } from "react";
import connectDB from "../repository/db";
import { UserService } from "../service/userService";

export default async function (context, req) {
  await connectDB();
  const users = await UserService.getInstance().getAllUsers();
  console.log(users);

  context.res = {
    body: users,

    headers: { "Content-Type": "application/json" },
  };

  return context.res;
}
