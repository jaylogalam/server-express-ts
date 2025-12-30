import Stripe from "stripe";

// Price Types
export type CreatePriceParams = Stripe.PriceCreateParams;
export type UpdatePriceParams = Stripe.PriceUpdateParams;
export type ListPricesParams = Stripe.PriceListParams;

// Response types
export type PriceResponse = Stripe.Price;
export type PriceListResponse = Stripe.ApiList<Stripe.Price>;
export type PriceSearchResponse = Stripe.ApiSearchResult<Stripe.Price>;
