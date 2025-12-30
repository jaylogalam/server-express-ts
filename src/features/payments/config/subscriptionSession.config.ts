import type { CreateCheckoutSessionParams } from "../types/checkoutSession";

type SubscriptionSessionParams = {
  priceId: string;
  successUrl?: string;
};

/**
 * Creates the session params for a subscription checkout session.
 * Use with checkoutSessionServices.createSession() to create the session.
 *
 * @example
 * const params = configSubscriptionSessionParams({ priceId: "price_xxx" });
 * const session = await checkoutSessionServices.createSession(params);
 */
const configSubscriptionSessionParams = ({
  priceId,
  successUrl = "https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}",
}: SubscriptionSessionParams): CreateCheckoutSessionParams => {
  return {
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    subscription_data: {
      billing_mode: {
        flexible: {
          proration_discounts: "included",
        },
        type: "flexible",
      },
    },
  };
};

export { configSubscriptionSessionParams };
export type { SubscriptionSessionParams };
