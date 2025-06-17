import { use } from "react";
import connectDB from "../repository/db";
import { UserService } from "../service/userService";

export default async function (context, req) {
  context.log("Test getUsersHttpTrigger");
  await connectDB();
  context.log("Test getUsersHttpTrigger na connection");

  const users = await UserService.getInstance().getAllUsers();
  console.log(users);

  context.res = {
    body: users,

    headers: { "Content-Type": "application/json" },
  };

  return context.res;
}
