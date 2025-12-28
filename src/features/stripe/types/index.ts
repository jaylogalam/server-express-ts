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
export type CreateSessionParams = Stripe.Checkout.SessionCreateParams;
export type UpdateSessionParams = Stripe.Checkout.SessionUpdateParams;
export type ListSessionsParams = Stripe.Checkout.SessionListParams;

// Payment Link Types
export type CreatePaymentLinkParams = Stripe.PaymentLinkCreateParams;
export type UpdatePaymentLinkParams = Stripe.PaymentLinkUpdateParams;
export type ListPaymentLinksParams = Stripe.PaymentLinkListParams;

// Response types
export type ProductResponse = Stripe.Product;
export type PriceResponse = Stripe.Price;
export type SessionResponse = Stripe.Checkout.Session;
export type PaymentLinkResponse = Stripe.PaymentLink;
export type ProductListResponse = Stripe.ApiList<Stripe.Product>;
export type PriceListResponse = Stripe.ApiList<Stripe.Price>;
export type SessionListResponse = Stripe.ApiList<Stripe.Checkout.Session>;
export type PaymentLinkListResponse = Stripe.ApiList<Stripe.PaymentLink>;
