module.exports = async function (context, req) {
  try {
    context.log("login function triggered.");

    const { email, password } = req.body || {};

    if (!email || !password) {
      context.res = {
        status: 400,
        body: { error: "Email and password are required." },
      };
      return;
    }

    const authResponse = await userService.authenticate({ email, password });

    context.res = {
      status: 200,
      body: {
        message: "Authentication successful (mock)",
        email,
        token: authResponse.token
      },
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    context.log.error("Error in login function:", err);
    context.res = {
      status: 500,
      body: { error: "Failed to log in." },
    };
  }
};
