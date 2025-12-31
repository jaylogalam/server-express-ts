import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { db } from "../db/mongodb";
import { toNodeHandler } from "better-auth/node";
import { origins } from "./cors";

const authConfig = betterAuth({
  database: mongodbAdapter(db),
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

export { authConfig, toNodeHandler };
