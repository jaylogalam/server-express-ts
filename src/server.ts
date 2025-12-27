import "dotenv/config";
import express from "express";
import { registerMiddleware } from "./middleware";
import { mongoClient } from "./db/mongodb";
import { subscriptionsRouter } from "./features/subscriptions/routes";

const app = express();

// Middleware
registerMiddleware(app);

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
    await mongoClient.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
});
