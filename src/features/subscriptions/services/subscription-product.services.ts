import SubscriptionProduct from "../models/subscription-product.model";

const subscriptionProductServices = {
  async listProducts() {
    const products = await SubscriptionProduct.find();
    return products;
  },
};

export { subscriptionProductServices };
