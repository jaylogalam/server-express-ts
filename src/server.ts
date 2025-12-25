import "dotenv/config";
import express from "express";
import { corsMiddleware } from "./cors";
import { authRouter } from "./auth/routes";
import { connectDB } from "./db/mongodb";

const app = express();

connectDB();

app.use(corsMiddleware);

app.use(express.json());

app.use("/auth", authRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
