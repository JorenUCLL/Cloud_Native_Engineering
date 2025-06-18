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
    await connectDB();

    context.log("login function triggered.");

    const { email, password } = req.body || {};

    if (!email || !password) {
      context.res = {
        status: 400,
        body: { error: "Email and password are required." },
      };
      return context.res;
    }

    const authResponse = await UserService.getInstance().authenticate({
      email,
      password,
    });

    context.res = {
      status: 200,
      body: {
        message: "Authentication successful (mock)",
        email,
        token: authResponse.token,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
    return context.res;
  } catch (err) {
    context.log.error("Error in login function:", err);
    context.res = {
      status: 500,
      body: { error: "Failed to log in." },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // or your frontend URL
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
    };
  }
};
