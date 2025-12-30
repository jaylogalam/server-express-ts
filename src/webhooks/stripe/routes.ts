import { Router, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";
import stripe from "../../core/config/stripe.config";
import { subscriptionProductServices } from "../../features/subscriptions/services/subscription-product.services";
import { subscriptionPriceServices } from "../../features/subscriptions/services/subscription-price.services";

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
        await subscriptionProductServices.createAndUpdate(event.data.object);
        break;
      case "product.deleted":
        await subscriptionProductServices.delete(event.data.object);
        break;

      case "price.created":
      case "price.updated":
        await subscriptionPriceServices.createAndUpdate(event.data.object);
        break;

      case "price.deleted":
        await subscriptionPriceServices.delete(event.data.object);
        break;

      default:
        break;
    }
    return res.status(200);
  }
);

export { router as stripeWebhookEventsRouter };
