import Stripe from "stripe";

/**
 * StripeService - Handles all Stripe API interactions
 * Follows SRP by isolating payment processing logic
 */
class StripeService {
  private stripe: Stripe;
  private webhookSecret: string;

  constructor() {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "STRIPE_SECRET_KEY is not defined in environment variables"
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error(
        "STRIPE_WEBHOOK_SECRET is not defined in environment variables"
      );
    }

    this.stripe = new Stripe(secretKey);
    this.webhookSecret = webhookSecret;
  }

  /**
   * Creates a payment intent with validation
   * @param amount - Amount in cents (must be positive integer)
   * @param currency - Currency code (e.g., "usd")
   * @returns Client secret for frontend integration
   */
  async createPaymentIntent(amount: number, currency: string): Promise<string> {
    // Validate amount
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error("Amount must be a positive integer representing cents");
    }

    // Validate currency
    if (!currency || typeof currency !== "string" || currency.length !== 3) {
      throw new Error("Currency must be a valid 3-letter ISO currency code");
    }

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: currency.toLowerCase(),
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent.client_secret!;
    } catch (error) {
      if (error instanceof Stripe.errors.StripeError) {
        throw new Error(`Stripe API error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Constructs and verifies webhook event from Stripe
   * @param payload - Raw request body
   * @param signature - Stripe signature header
   * @returns Verified Stripe event
   */
  constructWebhookEvent(payload: Buffer, signature: string): Stripe.Event {
    try {
      return this.stripe.webhooks.constructEvent(
        payload,
        signature,
        this.webhookSecret
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Webhook signature verification failed: ${error.message}`
        );
      }
      throw error;
    }
  }

  /**
   * Handles successful payment intent events
   * @param paymentIntent - The payment intent object from Stripe
   */
  async handlePaymentIntentSucceeded(
    paymentIntent: Stripe.PaymentIntent
  ): Promise<void> {
    console.log(`Payment succeeded for PaymentIntent: ${paymentIntent.id}`);
    console.log(`Amount: ${paymentIntent.amount} ${paymentIntent.currency}`);
    console.log(`Status: ${paymentIntent.status}`);

    // TODO: Add your business logic here
    // Examples:
    // - Update order status in database
    // - Send confirmation email to customer
    // - Trigger fulfillment process
    // - Update user subscription status
  }
}

export default new StripeService();
