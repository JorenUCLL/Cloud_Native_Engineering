import { app } from "@azure/functions";
import userService from "../../../../back-end/service/userService";

interface RequestBody {
  email?: string;
}

app.http("HTTPgetUserByEmail", {
  methods: ["GET", "POST"],
  route: "users/{email?}",
  handler: async (request, context) => {
    // Get email from query or body with proper typing
    const email =
      request.query.get("email") ||
      ((await request.json()) as RequestBody)?.email;

    if (!email) {
      return {
        status: 400,
        jsonBody: { error: "Missing 'email' parameter" },
      };
    }

    try {
      const user = await userService.getUserByEmail(email);
      return {
        status: 200,
        jsonBody: user,
      };
    } catch (error: unknown) {
      // Proper error type checking
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const status = errorMessage === "User not found" ? 404 : 500;

      context.error(`Error in getUserByEmail: ${errorMessage}`);

      return {
        status,
        jsonBody: { error: errorMessage },
      };
    }
  },
});
