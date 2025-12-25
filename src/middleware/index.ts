import express from "express";
import { corsMiddleware } from "./cors";
import { auth, toNodeHandler } from "./auth";

const registerMiddleware = (app: express.Application) => {
  app.use(corsMiddleware);
  app.all("auth/*splat", toNodeHandler(auth));
  app.use(express.json());
};

export { registerMiddleware };
