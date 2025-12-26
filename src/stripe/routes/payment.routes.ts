import { Router, Request, Response } from "express";
import stripeService from "../services/stripe.service";

const paymentRouter = Router();

/**
 * POST /create-payment-intent
 * Creates a Stripe payment intent
 * Body: { amount: number, currency: string }
 */
paymentRouter.post(
  "/create-payment-intent",
  async (req: Request, res: Response) => {
    try {
      const { amount, currency } = req.body;

      // Validate request body
      if (!amount || !currency) {
        res.status(400).json({
          error: "Missing required fields: amount and currency",
        });
        return;
      }

      // Create payment intent using the service
      const clientSecret = await stripeService.createPaymentIntent(
        amount,
        currency
      );

      res.status(200).json({
        clientSecret,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);

      if (error instanceof Error) {
        res.status(400).json({
          error: error.message,
        });
      } else {
        res.status(500).json({
          error: "Internal server error",
        });
      }
    }
  }
);

/**
 * POST /webhook
 * Handles Stripe webhook events
 * Requires raw body for signature verification
 */
paymentRouter.post("/webhook", async (req: Request, res: Response) => {
  try {
    const signature = req.headers["stripe-signature"];

    if (!signature || typeof signature !== "string") {
      res.status(400).json({
        error: "Missing Stripe signature header",
      });
      return;
    }

    // Get raw body (must be Buffer for signature verification)
    const payload = req.body;

    if (!Buffer.isBuffer(payload)) {
      res.status(400).json({
        error: "Invalid request body format - raw body required",
      });
      return;
    }

    // Construct and verify the webhook event
    const event = stripeService.constructWebhookEvent(payload, signature);

    // Handle the event based on type
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        await stripeService.handlePaymentIntentSucceeded(paymentIntent);
        break;

      // Add more event handlers as needed
      case "payment_intent.payment_failed":
        console.log(`Payment failed: ${event.data.object.id}`);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);

    if (error instanceof Error) {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        error: "Webhook handler failed",
      });
    }
  }
});

export { paymentRouter };
