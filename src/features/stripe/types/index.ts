import Stripe from "stripe";

// Price Types
export type CreatePriceParams = Stripe.PriceCreateParams;
export type UpdatePriceParams = Stripe.PriceUpdateParams;
export type ListPricesParams = Stripe.PriceListParams;

// Product Types
export type CreateProductParams = Stripe.ProductCreateParams;
export type UpdateProductParams = Stripe.ProductUpdateParams;
export type ListProductsParams = Stripe.ProductListParams;

// Checkout Session Types
export type CreateCheckoutSessionParams = Stripe.Checkout.SessionCreateParams;
export type UpdateCheckoutSessionParams = Stripe.Checkout.SessionUpdateParams;
export type ListCheckoutSessionsParams = Stripe.Checkout.SessionListParams;

// Payment Link Types
export type CreatePaymentLinkParams = Stripe.PaymentLinkCreateParams;
export type UpdatePaymentLinkParams = Stripe.PaymentLinkUpdateParams;
export type ListPaymentLinksParams = Stripe.PaymentLinkListParams;

// Webhook Endpoint Types
export type CreateWebhookEndpointParams = Stripe.WebhookEndpointCreateParams;
export type UpdateWebhookEndpointParams = Stripe.WebhookEndpointUpdateParams;
export type ListWebhookEndpointsParams = Stripe.WebhookEndpointListParams;

// Subscription Types
export type CreateSubscriptionParams = Stripe.SubscriptionCreateParams;
export type UpdateSubscriptionParams = Stripe.SubscriptionUpdateParams;
export type ListSubscriptionsParams = Stripe.SubscriptionListParams;
export type CancelSubscriptionParams = Stripe.SubscriptionCancelParams;

// Billing Portal Types
export type CreatePortalSessionParams =
  Stripe.BillingPortal.SessionCreateParams;

// Response types
export type ProductResponse = Stripe.Product;
export type PriceResponse = Stripe.Price;
export type CheckoutSessionResponse = Stripe.Checkout.Session;
export type PaymentLinkResponse = Stripe.PaymentLink;
export type WebhookEndpointResponse = Stripe.WebhookEndpoint;
export type SubscriptionResponse = Stripe.Subscription;
export type PortalSessionResponse = Stripe.BillingPortal.Session;
export type ProductListResponse = Stripe.ApiList<Stripe.Product>;
export type PriceListResponse = Stripe.ApiList<Stripe.Price>;
export type CheckoutSessionListResponse =
  Stripe.ApiList<Stripe.Checkout.Session>;
export type PaymentLinkListResponse = Stripe.ApiList<Stripe.PaymentLink>;
export type WebhookEndpointListResponse =
  Stripe.ApiList<Stripe.WebhookEndpoint>;
export type SubscriptionListResponse = Stripe.ApiList<Stripe.Subscription>;
