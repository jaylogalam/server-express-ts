import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

/**
 * Webhook Stripe Services
 * Handles Stripe webhook event verification and processing
 */

/**
 * Verify webhook signature and construct event
 */
export const verifyWebhookSignature = (
  body: Buffer,
  signature: string
): Stripe.Event => {
  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }
};

/**
 * Handle checkout session completed event
 */
export const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session
): Promise<void> => {
  console.log("✅ Checkout session completed:", session.id);

  // TODO: Update your database with the completed checkout
  // Example:
  // - Create or update user record
  // - Store customer ID: session.customer
  // - Store subscription ID: session.subscription
  // - Grant access to paid features
};

/**
 * Handle subscription created event
 */
export const handleSubscriptionCreated = async (
  subscription: Stripe.Subscription
): Promise<void> => {
  console.log("✅ Subscription created:", subscription.id);

  // TODO: Update your database with the new subscription
  // Example:
  // - Store subscription details
  // - Update user's subscription status
  // - Send welcome email
};

/**
 * Handle subscription updated event
 */
export const handleSubscriptionUpdated = async (
  subscription: Stripe.Subscription
): Promise<void> => {
  console.log("✅ Subscription updated:", subscription.id);

  // TODO: Update your database with the subscription changes
  // Example:
  // - Update subscription plan
  // - Update billing cycle
  // - Handle plan upgrades/downgrades
};

/**
 * Handle subscription deleted event
 */
export const handleSubscriptionDeleted = async (
  subscription: Stripe.Subscription
): Promise<void> => {
  console.log("✅ Subscription deleted:", subscription.id);

  // TODO: Update your database when subscription is cancelled
  // Example:
  // - Update user's subscription status to cancelled
  // - Revoke access to paid features
  // - Send cancellation confirmation email
};

/**
 * Handle invoice payment succeeded event
 */
export const handleInvoicePaymentSucceeded = async (
  invoice: Stripe.Invoice
): Promise<void> => {
  console.log("✅ Invoice payment succeeded:", invoice.id);

  // TODO: Update your database with successful payment
  // Example:
  // - Mark invoice as paid
  // - Extend subscription period
  // - Send payment receipt
};

/**
 * Handle invoice payment failed event
 */
export const handleInvoicePaymentFailed = async (
  invoice: Stripe.Invoice
): Promise<void> => {
  console.log("⚠️ Invoice payment failed:", invoice.id);

  // TODO: Handle failed payment
  // Example:
  // - Notify user of failed payment
  // - Request updated payment method
  // - Handle grace period logic
};

/**
 * Process webhook event based on type
 */
export const processWebhookEvent = async (
  event: Stripe.Event
): Promise<void> => {
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
};
