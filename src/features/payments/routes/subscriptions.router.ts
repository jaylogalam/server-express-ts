import { Router, Request, Response } from "express";
import { configSubscriptionSessionParams } from "../config/subscriptionSession.config";
import checkoutSessionServices from "../services/checkoutSession";

const router = Router();

router.post("/create-checkout-session", async (req: Request, res: Response) => {
  try {
    const params = configSubscriptionSessionParams(req.body);
    const session = await checkoutSessionServices.createSession(params);
    return res.status(200).json(session.url);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as subscriptionsRouter };
