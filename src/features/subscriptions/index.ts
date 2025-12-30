import { Router } from "express";
import { subscriptionProductRouter } from "./routes/subscription-product.router";
import { subscriptionPriceRouter } from "./routes/subscription-price.router";

const router = Router();

router.use("/products", subscriptionProductRouter);
router.use("/prices", subscriptionPriceRouter);

export { router as subscriptionsRouter };
