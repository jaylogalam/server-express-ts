import {
  CreatePriceParams,
  UpdatePriceParams,
  ListPricesParams,
  PriceResponse,
  PriceListResponse,
  PriceSearchResponse,
} from "./types";
import stripe from "../../../core/config/stripe.config";

const priceServices = {
  createPrice: async (params: CreatePriceParams): Promise<PriceResponse> => {
    const price = await stripe.prices.create(params);
    return price;
  },

  retrievePrice: async (id: string): Promise<PriceResponse> => {
    const price = await stripe.prices.retrieve(id);
    return price;
  },

  updatePrice: async (
    id: string,
    params: UpdatePriceParams
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
  ): Promise<PriceSearchResponse> => {
    const results = await stripe.prices.search({
      query,
      limit,
    });
    return results;
  },
};

export default priceServices;
