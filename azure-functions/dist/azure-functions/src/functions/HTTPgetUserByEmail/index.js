"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("@azure/functions");
const userService_1 = require("../../../../back-end/service/userService");
functions_1.app.http("getUserByEmail", {
    // Changed to simpler, consistent name
    methods: ["GET", "POST"],
    route: "users/{email}",
    authLevel: "anonymous",
    handler: (request, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            // Get email from either route parameter, query string, or JSON body
            const email = request.params.email ||
                request.query.get("email") ||
                ((_a = ((yield request.json()))) === null || _a === void 0 ? void 0 : _a.email);
            if (!email) {
                return {
                    status: 400,
                    jsonBody: { error: "Email parameter is required" },
                };
            }
            const user = yield userService_1.default.getUserByEmail(email);
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
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Internal server error";
            context.error(`Handler error: ${errorMessage}`);
            return {
                status: 500,
                jsonBody: {
                    error: errorMessage,
                    details: error instanceof Error ? error.stack : undefined,
                },
            };
        }
    }),
});
// This export is CRUCIAL for function discovery
exports.default = functions_1.app;
//# sourceMappingURL=index.js.map