import { Router, Request, Response } from "express";
import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const router = Router();

/**
 * POST /webhooks/stripe
 * Receive and process Stripe webhook events
 *
 * CRITICAL: This endpoint requires raw body parsing for signature verification
 * Configure in your server.ts with express.raw({ type: 'application/json' })
 */
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      console.error(`⚠️ Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
      switch (event.type) {
        case "checkout.session.completed":
          await handleCheckoutSessionCompleted(event.data.object);
          break;

        case "customer.subscription.created":
          await handleSubscriptionCreated(event.data.object);
          break;

        case "customer.subscription.updated":
          await handleSubscriptionUpdated(event.data.object);
          break;

        case "customer.subscription.deleted":
          await handleSubscriptionDeleted(event.data.object);
          break;

        case "invoice.payment_succeeded":
          await handleInvoicePaymentSucceeded(event.data.object);
          break;

        case "invoice.payment_failed":
          await handleInvoicePaymentFailed(event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt
      res.json({ received: true });
    } catch (err: any) {
      console.error(`Error processing webhook: ${err.message}`);
      return res.status(500).json({ error: "Webhook processing failed" });
    }
  }
);

/**
 * Handle checkout session completed event
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  console.log("✅ Checkout session completed:", session.id);

  // TODO: Update your database with the completed checkout
  // Example:
  // - Create or update user record
  // - Store customer ID: session.customer
  // - Store subscription ID: session.subscription
  // - Grant access to paid features
}

/**
 * Handle subscription created event
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log("✅ Subscription created:", subscription.id);

  // TODO: Update your database with the new subscription
  // Example:
  // - Store subscription details
  // - Update user's subscription status
  // - Send welcome email
}

/**
 * Handle subscription updated event
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("✅ Subscription updated:", subscription.id);

  // TODO: Update your database with the subscription changes
  // Example:
  // - Update subscription plan
  // - Update billing cycle
  // - Handle plan upgrades/downgrades
}

/**
 * Handle subscription deleted event
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("✅ Subscription deleted:", subscription.id);

  // TODO: Update your database when subscription is cancelled
  // Example:
  // - Update user's subscription status to cancelled
  // - Revoke access to paid features
  // - Send cancellation confirmation email
}

/**
 * Handle invoice payment succeeded event
 */
async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log("✅ Invoice payment succeeded:", invoice.id);

  // TODO: Update your database with successful payment
  // Example:
  // - Mark invoice as paid
  // - Extend subscription period
  // - Send payment receipt
}

/**
 * Handle invoice payment failed event
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log("⚠️ Invoice payment failed:", invoice.id);

  // TODO: Handle failed payment
  // Example:
  // - Notify user of failed payment
  // - Request updated payment method
  // - Handle grace period logic
}

export default router;
