import Stripe from "stripe";
import SubscriptionPlan from "../models/subscription-plan.model";
import stripe from "../../../core/config/stripe.config";

type SyncSubscriptionPlanParams = {
  product?: Stripe.Product;
  price?: Stripe.Price;
};

export const syncSubscriptionPlan = async ({
  product,
  price,
}: SyncSubscriptionPlanParams) => {
  // Sync product
  if (product) {
    await SubscriptionPlan.findOneAndUpdate(
      { stripeProductId: product.id },
      {
        // STRIPE LINKS
        stripeProductId: product.id,
        stripePriceId: product.default_price,

        // UI CONTENT
        name: product.name,
        description: product.description,
        features: product.marketing_features.map((f) => f.name),

        // SYSTEM STATUS
        isActive: product.active,
        mostPopular: product.metadata.mostPopular === "yes",
      },
      { upsert: true, new: true }
    );
  }

  // Sync price
  if (price?.product) {
    await SubscriptionPlan.findOneAndUpdate(
      { stripeProductId: price.product as string },
      {
        // STRIPE LINKS
        stripePriceId: price.id,

        // FINANCIAL DATA
        amountCents: price.unit_amount,
        currency: price.currency,
        billingInterval: price.recurring?.interval,
      }
    );
  } else if (product?.default_price) {
    const price = await stripe.prices.retrieve(product.default_price as string);
    await SubscriptionPlan.findOneAndUpdate(
      { stripeProductId: price.product as string },
      {
        // STRIPE LINKS
        stripePriceId: price.id,

        // FINANCIAL DATA
        amountCents: price.unit_amount,
        currency: price.currency,
        billingInterval: price.recurring?.interval,
      }
    );
  }
};
