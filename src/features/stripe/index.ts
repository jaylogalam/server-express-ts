import { Router } from "express";
import { productsRouter } from "./products/routes";
import { pricesRouter } from "./prices/routes";
import { checkoutSessionsRouter } from "./checkout-sessions/routes";
import { paymentLinksRouter } from "./payment-links/routes";
import { webhooksRouter } from "./webhook/routes";
import { subscriptionsRouter } from "./subscriptions/routes";
import { webhookEventsRouter } from "./webhook-events/routes";

const router = Router();

router.use("/checkout-sessions", checkoutSessionsRouter);
router.use("/payment-links", paymentLinksRouter);
router.use("/prices", pricesRouter);
router.use("/products", productsRouter);
router.use("/subscriptions", subscriptionsRouter);
router.use("/webhooks", webhooksRouter);
router.use("/webhook-events", webhookEventsRouter);

export { router as stripeRouter };
