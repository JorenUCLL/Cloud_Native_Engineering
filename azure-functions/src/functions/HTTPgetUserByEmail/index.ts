import { app } from "@azure/functions";
import userService from "../../../../back-end/service/userService";

interface RequestBody {
  email?: string;
}

app.http("getUserByEmail", {
  methods: ["GET", "POST"],
  route: "users/{email}",
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const email =
        request.params.email ||
        request.query.get("email") ||
        ((await request.json()) as RequestBody)?.email;

      if (!email) {
        return {
          status: 400,
          jsonBody: { error: "Email parameter is required" },
        };
      }

      const user = await userService.getUserByEmail(email);

      if (!user) {
        return {
          status: 404,
          jsonBody: { error: "User not found" },
        };
      }

      return {
        status: 200,
        jsonBody: user,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      context.error(`Handler error: ${errorMessage}`);

      return {
        status: 500,
        jsonBody: {
          error: errorMessage,
          details: error instanceof Error ? error.stack : undefined,
        },
      };
    }
  },
});

// This export is CRUCIAL for function discovery
export default app;

import { app } from "@azure/functions";
import userService from "../../../../back-end/service/userService";

interface RequestBody {
  email?: string;
}

app.http("getUserByEmail", {
  // Changed to simpler, consistent name
  methods: ["GET", "POST"],
  route: "users/{email}", // Removed optional marker (?) for clearer API design
  authLevel: "anonymous", // Added for local testing
  handler: async (request, context) => {
    try {
      // Get email from either route parameter, query string, or JSON body
      const email =
        request.params.email ||
        request.query.get("email") ||
        ((await request.json()) as RequestBody)?.email;

      if (!email) {
        return {
          status: 400,
          jsonBody: { error: "Email parameter is required" },
        };
      }

      const user = await userService.getUserByEmail(email);

      if (!user) {
        return {
          status: 404,
          jsonBody: { error: "User not found" },
        };
      }

      return {
        status: 200,
        jsonBody: user,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      context.error(`Handler error: ${errorMessage}`);

      return {
        status: 500,
        jsonBody: {
          error: errorMessage,
          details: error instanceof Error ? error.stack : undefined,
        },
      };
    }
  },
});

// This export is CRUCIAL for function discovery
export default app;
