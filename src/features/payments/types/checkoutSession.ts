import Stripe from "stripe";

// Checkout Session Types
export type CreateCheckoutSessionParams = Stripe.Checkout.SessionCreateParams;
export type UpdateCheckoutSessionParams = Stripe.Checkout.SessionUpdateParams;
export type ListCheckoutSessionsParams = Stripe.Checkout.SessionListParams;

// Response types
export type CheckoutSessionResponse = Stripe.Checkout.Session;
export type CheckoutSessionListResponse =
  Stripe.ApiList<Stripe.Checkout.Session>;
