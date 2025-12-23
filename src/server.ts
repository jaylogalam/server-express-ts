import express from "express";
import { corsMiddleware } from "./cors";
import loginRouter from "./auth/routes/auth.router";
import { connectDB } from "./db/mongodb";

const app = express();

connectDB();

app.use(corsMiddleware);

app.use(express.json());

app.use("/auth", loginRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
