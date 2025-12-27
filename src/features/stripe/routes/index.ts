import { Router } from "express";
import { productRouter } from "./product.router";
import { priceRouter } from "./price.router";

const router = Router();

router.use("/products", productRouter);
router.use("/prices", priceRouter);

export { router as stripeRouter };
