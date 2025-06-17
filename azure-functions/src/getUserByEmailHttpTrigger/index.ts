const userService = require("../../back-end/service/userService");

module.exports = async function (context, req) {
  context.log("test Function triggered successfully.");

  const email = req.params.email || (req.body && req.body.email);

  // You can use userService here to fetch user by email, example:
  // const user = await userService.getUserByEmail(email);

  context.res = {
    status: 200,
    body: { message: "test Function triggered successfully.", email: email },
    headers: { "Content-Type": "application/json" },
  };
};
