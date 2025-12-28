import { Router } from "express";
import { productRouter } from "./product.routers";
import { priceRouter } from "./price.routers";
import { sessionRouter } from "./session.routers";
import { paymentLinkRouter } from "./payment-link.routers";
import { webhookRouter } from "./webhook.routers";

const router = Router();

router.use("/products", productRouter);
router.use("/prices", priceRouter);
router.use("/sessions", sessionRouter);
router.use("/payment-links", paymentLinkRouter);
router.use("/webhooks", webhookRouter);

export { router as stripeRouter };
