import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { toNodeHandler } from "better-auth/node";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../db/mongodb";

const db = client.db("users");

const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
});

export { auth, toNodeHandler };
