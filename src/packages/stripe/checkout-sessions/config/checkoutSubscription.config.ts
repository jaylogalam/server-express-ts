import type { CreateCheckoutSessionParams } from "../types";

type ConfigParams = {
  priceId: string;
};

const createCheckoutSubscriptionConfig = ({ priceId }: ConfigParams) => {
  const params: CreateCheckoutSessionParams = {
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url:
      "https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}",
    subscription_data: {
      billing_mode: {
        flexible: {
          proration_discounts: "included",
        },
        type: "flexible",
      },
    },
  };

  return params;
};

export default createCheckoutSubscriptionConfig;
