import { UserService } from "../service/userService";
import connectDB from "../repository/db";

module.exports = async function (context, req) {
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
    console.log("Eerste MongoDB URI:", process.env.MONGODB_URI);

    await connectDB();
    console.log("MongoDB URI:", process.env.MONGODB_URI);

    const email = req.params.email || (req.body && req.body.email);

    if (!email) {
      context.res = {
        status: 400,
        body: { error: "Email is required." },
      };
      return;
    }

    const response = await UserService.getInstance().getUserByEmail(email);

    context.res = {
      status: 200,
      body: { user: response },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
    return context.res;
  } catch (err) {
    context.log.error("Error in function:", err);
    context.res = {
      status: 500,
      body: { error: "Internal server error" },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // or your frontend URL
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
    };
  }
};
