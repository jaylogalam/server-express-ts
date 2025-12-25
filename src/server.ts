import "dotenv/config";
import express from "express";
import { authRouter } from "./auth-better/routes";
import { registerMiddleware } from "./middleware";
import { client } from "./db/mongodb";

const app = express();

registerMiddleware(app);

// Routes
app.use("/auth", authRouter);

// Server
const server = app.listen(process.env.PORT!, () => {
  console.log(`Server is running on port ${process.env.PORT!}`);
});

// Graceful Shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(async () => {
    await client.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});
