import Stripe from "stripe";

// Product Types
export interface CreateProductInput {
  name: string;
  description?: string;
  active?: boolean;
  metadata?: Record<string, string>;
  default_price_data?: {
    currency: string;
    unit_amount: number;
    recurring?: {
      interval: "day" | "week" | "month" | "year";
      interval_count?: number;
    };
  };
  images?: string[];
  url?: string;
  tax_code?: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  active?: boolean;
  metadata?: Record<string, string>;
  images?: string[];
  url?: string;
  default_price?: string;
  tax_code?: string;
}

export interface ListProductsParams {
  active?: boolean;
  limit?: number;
  starting_after?: string;
  ending_before?: string;
}

// Price Types
export interface CreatePriceInput {
  product: string;
  currency: string;
  unit_amount?: number;
  unit_amount_decimal?: string;
  active?: boolean;
  recurring?: {
    interval: "day" | "week" | "month" | "year";
    interval_count?: number;
    trial_period_days?: number;
    usage_type?: "metered" | "licensed";
  };
  billing_scheme?: "per_unit" | "tiered";
  metadata?: Record<string, string>;
  nickname?: string;
  tiers?: Array<{
    up_to: number | "inf";
    unit_amount?: number;
    flat_amount?: number;
  }>;
  tiers_mode?: "graduated" | "volume";
  transform_quantity?: {
    divide_by: number;
    round: "up" | "down";
  };
}

export interface UpdatePriceInput {
  active?: boolean;
  metadata?: Record<string, string>;
  nickname?: string;
  tax_behavior?: "inclusive" | "exclusive" | "unspecified";
}

export interface ListPricesParams {
  active?: boolean;
  product?: string;
  currency?: string;
  type?: "one_time" | "recurring";
  limit?: number;
  starting_after?: string;
  ending_before?: string;
}

// Response types
export type ProductResponse = Stripe.Product;
export type PriceResponse = Stripe.Price;
export type ProductListResponse = Stripe.ApiList<Stripe.Product>;
export type PriceListResponse = Stripe.ApiList<Stripe.Price>;
