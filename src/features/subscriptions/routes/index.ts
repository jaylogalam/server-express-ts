import { Router } from "express";
import { subscriptionPlanRouter } from "./subscription-plan.router";

const router = Router();

router.use("/plans", subscriptionPlanRouter);

export { router as subscriptionsRouter };
