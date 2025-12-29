import { Router, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = new Stripe(STRIPE_SECRET_KEY!);
const router = Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const signature = req.headers["stripe-signature"];
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature!,
        STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      console.log("Error processing webhook event:", error);
      return res.status(400);
    }

    switch (event.type) {
      case "product.created":
      case "product.updated":
        const product = await stripe.products.retrieve(event.data.object.id);
        console.log("Product:", product);
        break;

      default:
        break;
    }
    return res.status(200);
  }
);

export { router as stripeWebhookEventsRouter };
