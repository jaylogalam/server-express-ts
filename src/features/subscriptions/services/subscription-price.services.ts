import SubscriptionPrice from "../models/subscription-price.model";

const subscriptionPriceServices = {
  async listPrices() {
    const prices = await SubscriptionPrice.find();
    return prices;
  },
};

export { subscriptionPriceServices };
