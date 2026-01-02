import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { toNodeHandler } from "better-auth/node";
import { origins } from "./cors";
import mongoose from "mongoose";
import connectDb from "./db";
import { username } from "better-auth/plugins/username";
import { Resend } from "resend";
import VerificationEmailHtml from "../templates/OTPVerification";
import { emailOTP } from "better-auth/plugins/email-otp";

const resend = new Resend(process.env.RESEND_API_KEY!);

await connectDb();
const client = mongoose.connection.getClient();
const db = client.db(process.env.MONGODB_NAME!);

const authConfig = betterAuth({
  database: mongodbAdapter(db, { client: client }),
  basePath: "/api/auth",
  trustedOrigins: origins,
  secret: process.env.BETTER_AUTH_SECRET!,
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url }) => {
  //     resend.emails.send({
  //       from: "onboarding@resend.dev",
  //       to: user.email,
  //       subject: "Verify your email address",
  //       react: VerificationEmailHtml({
  //         username: user.name!,
  //         verifyUrl: url,
  //         appName: "ExcelViz",
  //       }),
  //     });
  //   },
  //   autoSignInAfterVerification: true,
  // },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [
    username(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          // Send the OTP for sign in
        } else if (type === "email-verification") {
          resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Verify your email address",
            react: VerificationEmailHtml({
              username: email.split("@")[0],
              verifyUrl: `${process.env.FRONTEND_URL}/verify-email?otp=${otp}`,
              appName: "ExcelViz",
              otp: otp,
            }),
          });
        } else {
          // Send the OTP for password reset
        }
      },
    }),
  ],
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
