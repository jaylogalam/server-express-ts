import Stripe from "stripe";

// Webhook Event Types
export type WebhookEvent = Stripe.Event;
export type WebhookSignature = string;

// Event Data Types
export type CheckoutSessionEvent = Stripe.Checkout.Session;
export type SubscriptionEvent = Stripe.Subscription;
export type InvoiceEvent = Stripe.Invoice;

// Webhook Configuration Types (for webhook endpoint CRUD)
export type CreateWebhookEndpointParams = Stripe.WebhookEndpointCreateParams;
export type UpdateWebhookEndpointParams = Stripe.WebhookEndpointUpdateParams;
export type ListWebhookEndpointsParams = Stripe.WebhookEndpointListParams;

// Response types
export type WebhookEndpointResponse = Stripe.WebhookEndpoint;
export type WebhookEndpointListResponse =
  Stripe.ApiList<Stripe.WebhookEndpoint>;
