import Stripe from "stripe";

// Payment Link Types
export type CreatePaymentLinkParams = Stripe.PaymentLinkCreateParams;
export type UpdatePaymentLinkParams = Stripe.PaymentLinkUpdateParams;
export type ListPaymentLinksParams = Stripe.PaymentLinkListParams;
export type LinkListLineItemsParams = Stripe.PaymentLinkListLineItemsParams;

// Response types
export type PaymentLinkResponse = Stripe.PaymentLink;
export type PaymentLinkListResponse = Stripe.ApiList<Stripe.PaymentLink>;
export type LineItemsResponse = Stripe.ApiList<Stripe.LineItem>;
