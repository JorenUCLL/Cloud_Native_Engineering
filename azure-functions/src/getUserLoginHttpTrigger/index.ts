import { UserService } from "../service/userService";
import connectDB from "../repository/db";

module.exports = async function (context, req) {
  try {
    await connectDB();

    console.log("login function triggered.");

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

    console.log(authResponse);

    context.res = {
      status: 200,
      body: {
        message: "Authentication successful (mock)",
        email,
        token: authResponse.token,
      },
      headers: { "Content-Type": "application/json" },
    };
    return context.res;
  } catch (err) {
    context.log.error("Error in login function:", err);
    context.res = {
      status: 500,
      body: { error: "Failed to log in." },
    };
  }
};
