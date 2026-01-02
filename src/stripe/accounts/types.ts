import Stripe from "stripe";

// Account Types (V2 API)
export type CreateAccountParams = Stripe.V2.Core.AccountCreateParams;
export type UpdateAccountParams = Stripe.V2.Core.AccountUpdateParams;
export type ListAccountsParams = Stripe.V2.Core.AccountListParams;

// Response types
export type AccountResponse = Stripe.V2.Core.Account;
export type AccountListResponse = Stripe.ApiList<Stripe.V2.Core.Account>;
