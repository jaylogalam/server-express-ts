import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { registerMiddleware } from "./middleware";
import { subscriptionsRouter } from "./features/subscriptions/routes";
import { connectToDatabase } from "./db/mongodb";
import { stripeRouter } from "./features/stripe/routes";
import stripeWebhookRouter from "./features/stripe/routes/webhook-stripe.routers";

async function startServer() {
  const app = express();

  // Connect to database first
  await connectToDatabase();
  console.log("✓ Database connected");

  // Then setup middleware (async because of Better Auth)
  await registerMiddleware(app);

  // Routers
  app.use("/webhooks", stripeWebhookRouter); // Stripe webhook handler
  app.use("/subscription", subscriptionsRouter);
  app.use("/stripe", stripeRouter);

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
