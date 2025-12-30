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
    secret: process.env.BETTER_AUTH_SECRET!,
    emailAndPassword: {
      enabled: true,
    },
    advanced: {
      cookiePrefix: "better-auth", // optional
      useSecureCookies: true, // Force secure cookies in production
      defaultCookieAttributes: {
        sameSite: "none", // REQUIRED for Vercel -> Render communication
        secure: true, // REQUIRED for HTTPS
        httpOnly: true,
      },
    },
  });

  return auth;
}

export { toNodeHandler };
