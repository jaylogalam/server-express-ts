import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { origins } from "../core/origins";
import { connectToDatabase } from "../db/mongodb";
import { toNodeHandler } from "better-auth/node";

export async function authMiddleware() {
  const mongooseInstance = await connectToDatabase();
  const client = mongooseInstance.connection.getClient();

  const auth = betterAuth({
    database: mongodbAdapter(client.db("excel_visualizer")),
    basePath: "/api/auth",
    trustedOrigins: origins,
    emailAndPassword: {
      enabled: true,
    },
  });

  return auth;
}

export { toNodeHandler };
