import { Router, Request, Response } from "express";
import SubscriptionProduct from "./models/product.model";
import SubscriptionPrice from "./models/price.model";
import { subscriptionProductServices } from "./product.services";
import { subscriptionPriceServices } from "./price.services";
import stripe from "../../lib/stripe";

const router = Router();

router.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await subscriptionProductServices.list();
    return res.json(products);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/prices", async (req: Request, res: Response) => {
  try {
    const prices = await subscriptionPriceServices.list();
    return res.json(prices);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/plans", async (req: Request, res: Response) => {
  try {
    const plans: any[] = [];

    const prices = await subscriptionPriceServices.list();
    for (const price of prices) {
      if (price.stripeProductId && price.isActive) {
        const product = await subscriptionProductServices.read(
          price.stripeProductId,
          true
        );
        if (product)
          plans.push({ ...price.toObject(), ...product?.toObject() });
      }
    }
    res.json(plans);
  } catch (error: any) {
    console.error("Error fetching products and prices:", error);
    res.status(500).json({ error: "Failed to fetch products and prices" });
  }
});

export { router as subscriptionsRouter };
