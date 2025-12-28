import Stripe from "stripe";
import {
  CreateSessionParams,
  UpdateSessionParams,
  ListSessionsParams,
  SessionResponse,
  SessionListResponse,
} from "../types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const checkoutSessionServices = {
  createSession: async (
    params: CreateSessionParams
  ): Promise<SessionResponse> => {
    const session = await stripe.checkout.sessions.create(params);
    return session;
  },

  retrieveSession: async (id: string): Promise<SessionResponse> => {
    const session = await stripe.checkout.sessions.retrieve(id);
    return session;
  },

  updateSession: async (
    id: string,
    params: UpdateSessionParams
  ): Promise<SessionResponse> => {
    const session = await stripe.checkout.sessions.update(id, params);
    return session;
  },

  listSessions: async (
    params?: ListSessionsParams
  ): Promise<SessionListResponse> => {
    const sessions = await stripe.checkout.sessions.list(params);
    return sessions;
  },

  expireSession: async (id: string): Promise<SessionResponse> => {
    const session = await stripe.checkout.sessions.expire(id);
    return session;
  },
};

export default checkoutSessionServices;
