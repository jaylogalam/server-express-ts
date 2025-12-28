import Stripe from "stripe";
import {
  CreateWebhookEndpointParams,
  UpdateWebhookEndpointParams,
  ListWebhookEndpointsParams,
  WebhookEndpointResponse,
  WebhookEndpointListResponse,
} from "../types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookServices = {
  createWebhookEndpoint: async (
    params: CreateWebhookEndpointParams
  ): Promise<WebhookEndpointResponse> => {
    const webhookEndpoint = await stripe.webhookEndpoints.create(params);
    return webhookEndpoint;
  },

  retrieveWebhookEndpoint: async (
    id: string
  ): Promise<WebhookEndpointResponse> => {
    const webhookEndpoint = await stripe.webhookEndpoints.retrieve(id);
    return webhookEndpoint;
  },

  updateWebhookEndpoint: async (
    id: string,
    params: UpdateWebhookEndpointParams
  ): Promise<WebhookEndpointResponse> => {
    const webhookEndpoint = await stripe.webhookEndpoints.update(id, params);
    return webhookEndpoint;
  },

  deleteWebhookEndpoint: async (
    id: string
  ): Promise<Stripe.DeletedWebhookEndpoint> => {
    const deleted = await stripe.webhookEndpoints.del(id);
    return deleted;
  },

  listWebhookEndpoints: async (
    params?: ListWebhookEndpointsParams
  ): Promise<WebhookEndpointListResponse> => {
    const webhookEndpoints = await stripe.webhookEndpoints.list(params);
    return webhookEndpoints;
  },
};

export default webhookServices;
