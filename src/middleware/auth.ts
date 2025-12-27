import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { toNodeHandler } from "better-auth/node";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { mongoClient } from "../db/mongodb";
import { origins } from "../core/origins";

const db = mongoClient.db("users");

const auth = betterAuth({
  database: mongodbAdapter(db),
  basePath: "/api/auth",
  trustedOrigins: origins,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
});

export { auth, toNodeHandler };
