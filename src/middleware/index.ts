import express from "express";
import { corsMiddleware } from "./cors";
import { authMiddleware, toNodeHandler } from "./auth";

const registerMiddleware = async (app: express.Application) => {
  app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
  app.use(corsMiddleware);
  app.all("/api/auth/*splat", toNodeHandler(await authMiddleware()));
  app.use(express.json());
};

export { registerMiddleware };
