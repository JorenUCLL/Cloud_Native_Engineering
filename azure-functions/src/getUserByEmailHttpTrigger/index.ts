const userService = require("../../back-end/service/userService");

module.exports = async function (context, req) {
  try {
    context.log("test Function triggered successfully.");

    const email = req.params.email || (req.body && req.body.email);

    // Uncomment when userService is ready and error-free
    // const user = await userService.getUserByEmail(email);

    context.res = {
      status: 200,
      body: { message: "test Function triggered successfully.", email: email },
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    context.log.error("Error in function:", err);
    context.res = {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
};
