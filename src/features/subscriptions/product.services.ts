import Stripe from "stripe";
import SubscriptionProduct from "./models/product.model";

const subscriptionProductServices = {
  async createAndUpdate(product: Stripe.Product) {
    await SubscriptionProduct.findOneAndUpdate(
      { stripeProductId: product.id },
      {
        stripeProductId: product.id,
        defaultPriceId: product.default_price,
        name: product.name,
        description: product.description,
        features: product.marketing_features.map((f) => f.name),
        isActive: product.active,
        mostPopular: product.metadata.mostPopular === "yes",
      },
      { upsert: true, new: true }
    );
  },

  async read(stripeProductId: string, isActive: boolean) {
    const product = await SubscriptionProduct.findOne({
      stripeProductId: stripeProductId,
      isActive: isActive,
    });
    return product;
  },

  async list() {
    const products = await SubscriptionProduct.find();
    return products;
  },

  async delete(product: Stripe.Product) {
    await SubscriptionProduct.deleteOne({ stripeProductId: product.id });
  },
};

export { subscriptionProductServices };
