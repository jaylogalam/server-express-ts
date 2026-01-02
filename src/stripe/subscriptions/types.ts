import Stripe from "stripe";

// Subscription Types
export type CreateSubscriptionParams = Stripe.SubscriptionCreateParams;
export type UpdateSubscriptionParams = Stripe.SubscriptionUpdateParams;
export type ListSubscriptionsParams = Stripe.SubscriptionListParams;
export type CancelSubscriptionParams = Stripe.SubscriptionCancelParams;

// Portal Session Types
export type CreatePortalSessionParams =
  Stripe.BillingPortal.SessionCreateParams;
export type PortalSessionResponse = Stripe.BillingPortal.Session;

// Response types
export type SubscriptionResponse = Stripe.Subscription;
export type SubscriptionListResponse = Stripe.ApiList<Stripe.Subscription>;
