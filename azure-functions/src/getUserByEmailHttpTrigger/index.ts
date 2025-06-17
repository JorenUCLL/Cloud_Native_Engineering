import userService from "../../back-end/service/userService";

module.exports = async function (context, req) {
  try {
    context.log("userByEmail Function triggered successfully.");

    const email = req.params.email || (req.body && req.body.email);

    const user = await userService.getUserByEmail(email);

    context.res = {
      status: 200,
      body: { message: "userByEmail Function triggered successfully.", email: email },
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
