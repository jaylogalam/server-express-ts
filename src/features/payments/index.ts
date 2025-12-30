import { Router } from "express";
import { subscriptionsRouter } from "./routes/subscriptions.router";

const router = Router();

router.use("/subscriptions", subscriptionsRouter);

export { router as paymentsRouter };
