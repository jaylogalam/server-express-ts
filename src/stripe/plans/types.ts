import Stripe from "stripe";

// Plan Types
export type CreatePlanParams = Stripe.PlanCreateParams;
export type UpdatePlanParams = Stripe.PlanUpdateParams;
export type ListPlansParams = Stripe.PlanListParams;

// Response types
export type PlanResponse = Stripe.Plan;
export type PlanListResponse = Stripe.ApiList<Stripe.Plan>;
export type DeletedPlanResponse = Stripe.DeletedPlan;
