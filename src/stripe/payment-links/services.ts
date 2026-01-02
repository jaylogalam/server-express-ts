import {
  CreatePaymentLinkParams,
  UpdatePaymentLinkParams,
  ListPaymentLinksParams,
  PaymentLinkResponse,
  PaymentLinkListResponse,
  LinkListLineItemsParams,
  LineItemsResponse,
} from "./types";
import stripe from "../../lib/stripe";

const paymentLinkServices = {
  createPaymentLink: async (
    params: CreatePaymentLinkParams
  ): Promise<PaymentLinkResponse> => {
    const paymentLink = await stripe.paymentLinks.create(params);
    return paymentLink;
  },

  retrievePaymentLink: async (id: string): Promise<PaymentLinkResponse> => {
    const paymentLink = await stripe.paymentLinks.retrieve(id);
    return paymentLink;
  },

  updatePaymentLink: async (
    id: string,
    params: UpdatePaymentLinkParams
  ): Promise<PaymentLinkResponse> => {
    const paymentLink = await stripe.paymentLinks.update(id, params);
    return paymentLink;
  },

  listPaymentLinks: async (
    params?: ListPaymentLinksParams
  ): Promise<PaymentLinkListResponse> => {
    const paymentLinks = await stripe.paymentLinks.list(params);
    return paymentLinks;
  },

  listLineItems: async (
    id: string,
    params?: LinkListLineItemsParams
  ): Promise<LineItemsResponse> => {
    const lineItems = await stripe.paymentLinks.listLineItems(id, params);
    return lineItems;
  },
};

export default paymentLinkServices;
