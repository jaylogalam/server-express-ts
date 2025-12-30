import Stripe from "stripe";

// Webhook Endpoint Types
export type CreateWebhookEndpointParams = Stripe.WebhookEndpointCreateParams;
export type UpdateWebhookEndpointParams = Stripe.WebhookEndpointUpdateParams;
export type ListWebhookEndpointsParams = Stripe.WebhookEndpointListParams;

// Response types
export type WebhookEndpointResponse = Stripe.WebhookEndpoint;
export type WebhookEndpointListResponse =
  Stripe.ApiList<Stripe.WebhookEndpoint>;
