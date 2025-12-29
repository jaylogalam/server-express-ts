import Stripe from "stripe";
import {
  CreateCheckoutSessionParams,
  UpdateCheckoutSessionParams,
  ListCheckoutSessionsParams,
  CheckoutSessionResponse,
  CheckoutSessionListResponse,
} from "./types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const checkoutSessionServices = {
  createSession: async (
    params: CreateCheckoutSessionParams
  ): Promise<CheckoutSessionResponse> => {
    const session = await stripe.checkout.sessions.create(params);
    return session;
  },

  retrieveSession: async (id: string): Promise<CheckoutSessionResponse> => {
    const session = await stripe.checkout.sessions.retrieve(id);
    return session;
  },

  updateSession: async (
    id: string,
    params: UpdateCheckoutSessionParams
  ): Promise<CheckoutSessionResponse> => {
    const session = await stripe.checkout.sessions.update(id, params);
    return session;
  },

  listSessions: async (
    params?: ListCheckoutSessionsParams
  ): Promise<CheckoutSessionListResponse> => {
    const sessions = await stripe.checkout.sessions.list(params);
    return sessions;
  },

  expireSession: async (id: string): Promise<CheckoutSessionResponse> => {
    const session = await stripe.checkout.sessions.expire(id);
    return session;
  },
};

export default checkoutSessionServices;
