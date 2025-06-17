import { CustomError } from "../mongo-models/custom-error";
import { IUser } from "../mongo-models/User";
import { UserService } from "../service/userService";

export enum AuthenticationType {
  Authenticated,
  Unauthenticated,
  Either,
}

export const authenticatedRouteWrapper = async (
  handler: (user: IUser) => Promise<void>,
  context: any
) => {
  try {
    const b64auth =
      (context.req.headers.authorization || "").split(" ")[1] || "";
    const [email, password] = Buffer.from(b64auth, "base64")
      .toString()
      .split(":");

    if (email && password) {
      const user = await UserService.getInstance().getUserByEmail(email);
      await user.validate(password);
      await handler(user);
    } else {
      throw CustomError.unauthenticated("Not authenticated.");
    }
  } catch (error) {
    errorHandler(error, context);
  }
};

export const unauthenticatedRouteWrapper = async (
  handler: () => Promise<void>,
  context: any
) => {
  try {
    if (context.req.headers.authorization) {
      throw CustomError.authenticated(
        "Must be unauthenticated to perform this action."
      );
    }
    await handler();
    context.log("Response after handler:", context.res);
  } catch (error) {
    errorHandler(error, context);
  }
};

export const openRouteWrapper = async (
  handler: () => Promise<void>,
  context: any
) => {
  try {
    await handler();
  } catch (error) {
    errorHandler(error, context);
  }
};

const errorHandler = (error: Error | CustomError, context: any) => {
  if ((error as any).code) {
    const cError = error as CustomError;
    context.res = {
      body: { message: cError.message },
      status: cError.code,
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else {
    context.res = {
      body: { message: (error as Error).message },
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
