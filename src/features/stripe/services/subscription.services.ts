import Stripe from "stripe";
import {
  CreateSubscriptionParams,
  UpdateSubscriptionParams,
  ListSubscriptionsParams,
  CancelSubscriptionParams,
  SubscriptionResponse,
  SubscriptionListResponse,
  CreatePortalSessionParams,
  PortalSessionResponse,
} from "../types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const subscriptionServices = {
  /**
   * Create a new subscription
   */
  createSubscription: async (
    params: CreateSubscriptionParams
  ): Promise<SubscriptionResponse> => {
    return await stripe.subscriptions.create(params);
  },

  /**
   * Retrieve a subscription by ID
   */
  retrieveSubscription: async (
    subscriptionId: string
  ): Promise<SubscriptionResponse> => {
    return await stripe.subscriptions.retrieve(subscriptionId);
  },

  /**
   * Update an existing subscription
   */
  updateSubscription: async (
    subscriptionId: string,
    params: UpdateSubscriptionParams
  ): Promise<SubscriptionResponse> => {
    return await stripe.subscriptions.update(subscriptionId, params);
  },

  /**
   * List all subscriptions with optional filters
   */
  listSubscriptions: async (
    params?: ListSubscriptionsParams
  ): Promise<SubscriptionListResponse> => {
    return await stripe.subscriptions.list(params);
  },

  /**
   * Cancel a subscription
   */
  cancelSubscription: async (
    subscriptionId: string,
    params?: CancelSubscriptionParams
  ): Promise<SubscriptionResponse> => {
    return await stripe.subscriptions.cancel(subscriptionId, params);
  },

  /**
   * Resume a paused subscription
   */
  resumeSubscription: async (
    subscriptionId: string
  ): Promise<SubscriptionResponse> => {
    return await stripe.subscriptions.resume(subscriptionId);
  },

  /**
   * Get subscription status for a customer
   */
  getCustomerSubscriptions: async (
    customerId: string
  ): Promise<SubscriptionListResponse> => {
    return await stripe.subscriptions.list({
      customer: customerId,
      status: "all",
    });
  },

  /**
   * Create a billing portal session for subscription management
   */
  createPortalSession: async (
    params: CreatePortalSessionParams
  ): Promise<PortalSessionResponse> => {
    return await stripe.billingPortal.sessions.create(params);
  },
};

export default subscriptionServices;
