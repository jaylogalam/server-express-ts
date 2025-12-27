import Stripe from "stripe";
import {
  CreateProductParams,
  UpdateProductParams,
  ListProductsParams,
  ProductResponse,
  ProductListResponse,
} from "../types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const productServices = {
  createProduct: async (
    params: CreateProductParams
  ): Promise<ProductResponse> => {
    const product = await stripe.products.create(params);
    return product;
  },

  readProduct: async (id: string): Promise<ProductResponse> => {
    const product = await stripe.products.retrieve(id);
    return product;
  },

  updateProduct: async (
    id: string,
    params: UpdateProductParams
  ): Promise<ProductResponse> => {
    const product = await stripe.products.update(id, params);
    return product;
  },

  deleteProduct: async (id: string): Promise<Stripe.DeletedProduct> => {
    const deleted = await stripe.products.del(id);
    return deleted;
  },

  listProducts: async (
    params?: ListProductsParams
  ): Promise<ProductListResponse> => {
    const products = await stripe.products.list(params);
    return products;
  },

  searchProducts: async (
    query: string,
    limit?: number
  ): Promise<Stripe.ApiSearchResult<Stripe.Product>> => {
    const results = await stripe.products.search({
      query,
      limit,
    });
    return results;
  },
};

export default productServices;
