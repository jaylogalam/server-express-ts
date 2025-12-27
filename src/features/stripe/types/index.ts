import Stripe from "stripe";

// Price Types
export type CreatePriceParams = Stripe.PriceCreateParams;
export type UpdatePriceParams = Stripe.PriceUpdateParams;
export type ListPricesParams = Stripe.PriceListParams;

// Product Types
export type CreateProductParams = Stripe.ProductCreateParams;
export type UpdateProductParams = Stripe.ProductUpdateParams;
export type ListProductsParams = Stripe.ProductListParams;

// Response types
export type ProductResponse = Stripe.Product;
export type PriceResponse = Stripe.Price;
export type ProductListResponse = Stripe.ApiList<Stripe.Product>;
export type PriceListResponse = Stripe.ApiList<Stripe.Price>;
