import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { registerMiddleware } from "./middleware";
import { subscriptionsRouter } from "./features/subscriptions/routes";
import { connectToDatabase } from "./db/mongodb";

const app = express();

// Middleware
registerMiddleware(app);

// Database
connectToDatabase();

// Routers
app.use("/subscription", subscriptionsRouter);

// Server
const server = app.listen(process.env.PORT!, () => {
  console.log(`Server is running on port ${process.env.PORT!}`);
});

// Graceful Shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(async () => {
    await mongoose.connection.close();
    console.log("Mongoose connection closed.");
    process.exit(0);
  });
});
