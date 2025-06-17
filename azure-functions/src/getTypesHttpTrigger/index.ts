import connectDB from "../repository/db";
import { TypeService } from "../service/typeService";

export default async function (context, req) {
  try {
    await connectDB();
    const types = await TypeService.getInstance().getAllTypes();
    context.log("Fetched types:", types);

    context.res = {
      body: types,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    context.log.error("Error in getTypesHttpTrigger:", error);
    context.res = {
      status: 500,
      body: { error: error.message || "Internal Server Error" },
      headers: { "Content-Type": "application/json" },
    };
  }
  return context.res;
}
