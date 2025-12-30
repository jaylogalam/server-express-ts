import { Router, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";
import { syncSubscriptionPlan } from "../../features/subscriptions/stripe";
import stripe from "../../core/config/stripe.config";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

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
        await syncSubscriptionPlan({
          product: event.data.object as Stripe.Product,
        });
        console.log("Product synced:", event.data.object.id);
        break;

      case "price.created":
      case "price.updated":
        await syncSubscriptionPlan({
          price: event.data.object as Stripe.Price,
        });
        console.log("Price synced:", event.data.object.id);
        break;

      default:
        break;
    }
    return res.status(200);
  }
);

export { router as stripeWebhookEventsRouter };
