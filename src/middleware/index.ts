import express from "express";
import { corsMiddleware } from "./cors";
import { auth, toNodeHandler } from "./auth";

const registerMiddleware = (app: express.Application) => {
  app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
  app.use(corsMiddleware);
  app.all("/api/auth/*splat", toNodeHandler(auth));
  app.use(express.json());
};

export { registerMiddleware };
