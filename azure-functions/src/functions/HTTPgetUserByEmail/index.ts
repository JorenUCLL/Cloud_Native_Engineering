import { app } from "@azure/functions";
import userService from "../../../../back-end/service/userService";

app.http("HTTPgetUserByEmail", {
  methods: ["GET", "POST"],
  route: "users/{email?}",
  handler: async (request, context) => {
    const email = request.query.get("email") || (await request.json())?.email;

    if (!email) {
      return { status: 400, body: "Missing 'email' parameter" };
    }

    try {
      const user = await userService.getUserByEmail(email);
      return { status: 200, body: user };
    } catch (error) {
      return {
        status: error.message === "User not found" ? 404 : 500,
        body: error.message,
      };
    }
  },
});
