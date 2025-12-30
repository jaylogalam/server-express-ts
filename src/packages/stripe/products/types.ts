import Stripe from "stripe";

// Product Types
export type CreateProductParams = Stripe.ProductCreateParams;
export type UpdateProductParams = Stripe.ProductUpdateParams;
export type ListProductsParams = Stripe.ProductListParams;

// Response types
export type ProductResponse = Stripe.Product;
export type ProductListResponse = Stripe.ApiList<Stripe.Product>;
export type ProductSearchResponse = Stripe.ApiSearchResult<Stripe.Product>;
export type ProductDeletedResponse = Stripe.DeletedProduct;