import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { toNodeHandler } from "better-auth/node";
import { origins } from "./cors";
import mongoose from "mongoose";
import connectDb from "./db";
import { username } from "better-auth/plugins/username";
import { emailOTP } from "better-auth/plugins/email-otp";
import { Resend } from "resend";
import VerificationEmailHtml from "../templates/EmailVerification";

const resend = new Resend(process.env.RESEND_API_KEY!);

await connectDb();
const client = mongoose.connection.getClient();
const db = client.db(process.env.MONGODB_NAME!);

const authConfig = betterAuth({
  database: mongodbAdapter(db, { client: client }),
  basePath: "/api/auth",
  trustedOrigins: origins,
  secret: process.env.BETTER_AUTH_SECRET!,
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log("Sending verification email...");
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email address",
        react: VerificationEmailHtml({
          username: user.name!,
          verifyUrl: url,
          appName: "ExcelViz",
        }),
      });
      console.log("Verification email sent successfully");
    },
    sendOnSignUp: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [username()],
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
