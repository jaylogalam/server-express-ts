import { Router, Request, Response } from "express";
import { subscriptionProductServices } from "../services/subscription-product.services";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await subscriptionProductServices.listProducts();
    return res.json(products);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as subscriptionProductRouter };
