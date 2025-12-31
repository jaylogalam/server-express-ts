import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { paymentsRouter } from "./features/payments";
import { subscriptionsRouter } from "./features/subscriptions";
import { stripeWebhooksRouter } from "./webhooks/stripe";
import { authConfig, toNodeHandler } from "./middleware/auth";
import { corsConfig } from "./middleware/cors";

const app = express();

// Webhooks
app.use("/webhooks/stripe", stripeWebhooksRouter);

// Middleware
app.use(corsConfig);
app.all("/api/auth/*splat", toNodeHandler(authConfig));

// Body parser
app.use(express.json());

// Routers
app.use("/payments", paymentsRouter);
app.use("/subscriptions", subscriptionsRouter);

// Start HTTP server
app.listen(process.env.PORT!, () => {
  console.log(`✓ Server is running on port ${process.env.PORT!}`);
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  mongoose.connection.close();
  console.log("✓ Mongoose connection closed.");
  process.exit(0);
});
