import { app } from "@azure/functions";
import userService from "../../back-end/service/userService";

interface RequestBody {
  email?: string;
}
app.http("getUserByEmail", {
  methods: ["GET", "POST"],
  route: "users/{email}",
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log("Function triggered successfully.");

    return {
      status: 200,
      jsonBody: { message: "Function triggered successfully." },
    };
  },
});
export default app;
