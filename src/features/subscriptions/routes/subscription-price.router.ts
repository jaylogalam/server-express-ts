import { Router, Request, Response } from "express";
import { subscriptionPriceServices } from "../services/subscription-price.services";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const prices = await subscriptionPriceServices.listPrices();
    return res.json(prices);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as subscriptionPriceRouter };
