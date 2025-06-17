module.exports = async function (context, req) {
  context.log("Login function triggered.");
  context.res = {
    status: 200,
    body: { message: "Login endpoint hit", received: req.body },
    headers: { "Content-Type": "application/json" }
  };
};
