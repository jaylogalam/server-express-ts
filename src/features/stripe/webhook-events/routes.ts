import { Router, Request, Response } from "express";
import express from "express";
import { verifyWebhookSignature, processWebhookEvent } from "./services";

const router = Router();

/**
 * POST /webhooks/stripe
 * Receive and process Stripe webhook events
 *
 * CRITICAL: This endpoint requires raw body parsing for signature verification
 * Configure in your server.ts with express.raw({ type: 'application/json' })
 */
router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;

    try {
      // Verify the webhook signature
      const event = verifyWebhookSignature(req.body, sig);

      // Process the webhook event
      await processWebhookEvent(event);

      // Return a 200 response to acknowledge receipt
      res.json({ received: true });
    } catch (err: any) {
      if (err.message.includes("signature verification failed")) {
        console.error(`⚠️ ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      console.error(`Error processing webhook: ${err.message}`);
      return res.status(500).json({ error: "Webhook processing failed" });
    }
  }
);

export { router as webhookEventsRouter };
