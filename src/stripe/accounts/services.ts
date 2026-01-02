import {
  CreateAccountParams,
  UpdateAccountParams,
  ListAccountsParams,
  AccountResponse,
  AccountListResponse,
} from "./types";
import stripe from "../../lib/stripe";

const accountServices = {
  createAccount: async (
    params: CreateAccountParams
  ): Promise<AccountResponse> => {
    const account = await stripe.v2.core.accounts.create(params);
    return account;
  },

  retrieveAccount: async (id: string): Promise<AccountResponse> => {
    const account = await stripe.v2.core.accounts.retrieve(id);
    return account;
  },

  updateAccount: async (
    id: string,
    params: UpdateAccountParams
  ): Promise<AccountResponse> => {
    const account = await stripe.v2.core.accounts.update(id, params);
    return account;
  },

  listAccounts: async (
    params?: ListAccountsParams
  ): Promise<AccountListResponse> => {
    const accounts = await stripe.v2.core.accounts.list(params);
    return accounts;
  },

  closeAccount: async (id: string): Promise<AccountResponse> => {
    const account = await stripe.v2.core.accounts.close(id);
    return account;
  },
};

export default accountServices;
