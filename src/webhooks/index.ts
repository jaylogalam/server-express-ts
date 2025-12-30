import { Router } from "express";
import { stripeWebhookEventsRouter } from "./stripe/routes";

const router = Router();

router.use("/stripe", stripeWebhookEventsRouter);

export { router as webhooksRouter };
