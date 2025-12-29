import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { registerMiddleware } from "./middleware";
import { subscriptionsRouter } from "./features/subscriptions/routes";
import { connectToDatabase } from "./db/mongodb";
import { stripeRouter } from "./features/stripe";
import { stripeWebhookEventsRouter } from "./webhook-events";

async function startServer() {
  const app = express();

  // Connect to database first
  await connectToDatabase();

  // Webhooks
  app.use("/stripe-webhook-events", stripeWebhookEventsRouter);

  // Middleware
  await registerMiddleware(app);

  // Body parser
  app.use(express.json());

  // Routers
  app.use("/stripe", stripeRouter);
  app.use("/subscription", subscriptionsRouter);

  // Start HTTP server
  const server = app.listen(process.env.PORT!, () => {
    console.log(`✓ Server is running on port ${process.env.PORT!}`);
  });

  // Graceful Shutdown
  process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing HTTP server");
    server.close(async () => {
      await mongoose.connection.close();
      console.log("✓ Mongoose connection closed.");
      process.exit(0);
    });
  });
}

// Start the application
startServer().catch((error) => {
  console.error("✗ Failed to start server:", error);
  process.exit(1);
});
