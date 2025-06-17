import userService from "../../back-end/service/userService";

module.exports = async function (context, req) {
  try {
    context.log("getUsers function triggered.");

    const users = await userService.getAllUsers();

    context.res = {
      status: 200,
      body: users,
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    context.log.error("Error in getUsers function:", err);
    context.res = {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
};
