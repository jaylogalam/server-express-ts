import Stripe from "stripe";
import {
  CreatePriceInput,
  UpdatePriceInput,
  ListPricesParams,
  PriceResponse,
  PriceListResponse,
} from "../types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const priceServices = {
  createPrice: async (params: CreatePriceInput): Promise<PriceResponse> => {
    const price = await stripe.prices.create(params);
    return price;
  },

  readPrice: async (id: string): Promise<PriceResponse> => {
    const price = await stripe.prices.retrieve(id);
    return price;
  },

  updatePrice: async (
    id: string,
    params: UpdatePriceInput
  ): Promise<PriceResponse> => {
    const price = await stripe.prices.update(id, params);
    return price;
  },

  listPrices: async (params?: ListPricesParams): Promise<PriceListResponse> => {
    const prices = await stripe.prices.list(params);
    return prices;
  },

  searchPrices: async (
    query: string,
    limit?: number
  ): Promise<Stripe.ApiSearchResult<Stripe.Price>> => {
    const results = await stripe.prices.search({
      query,
      limit,
    });
    return results;
  },
};

export default priceServices;
