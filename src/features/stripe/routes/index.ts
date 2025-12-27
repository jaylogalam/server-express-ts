import { Router } from "express";
import { productRouter } from "./product.routers";
import { priceRouter } from "./price.routers";

const router = Router();

router.use("/products", productRouter);
router.use("/prices", priceRouter);

export { router as stripeRouter };
