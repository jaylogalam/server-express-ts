import Stripe from "stripe";
import SubscriptionPrice from "../models/subscription-price.model";

const subscriptionPriceServices = {
  async createAndUpdate(price: Stripe.Price) {
    await SubscriptionPrice.findOneAndUpdate(
      { stripePriceId: price.id },
      {
        stripePriceId: price.id,
        stripeProductId: price.product,
        amountCents: price.unit_amount,
        currency: price.currency,
        billingInterval: price.recurring?.interval,
        isActive: price.active,
      },
      { upsert: true, new: true }
    );
  },

  async list() {
    const prices = await SubscriptionPrice.find();
    return prices;
  },

  async delete(price: Stripe.Price) {
    await SubscriptionPrice.deleteOne({ stripePriceId: price.id });
  },
};

export { subscriptionPriceServices };
