import {
  CreatePlanParams,
  UpdatePlanParams,
  ListPlansParams,
  PlanResponse,
  PlanListResponse,
  DeletedPlanResponse,
} from "./types";
import stripe from "../../lib/stripe";

const planServices = {
  createPlan: async (params: CreatePlanParams): Promise<PlanResponse> => {
    const plan = await stripe.plans.create(params);
    return plan;
  },

  retrievePlan: async (id: string): Promise<PlanResponse> => {
    const plan = await stripe.plans.retrieve(id);
    return plan;
  },

  updatePlan: async (
    id: string,
    params: UpdatePlanParams
  ): Promise<PlanResponse> => {
    const plan = await stripe.plans.update(id, params);
    return plan;
  },

  listPlans: async (params?: ListPlansParams): Promise<PlanListResponse> => {
    const plans = await stripe.plans.list(params);
    return plans;
  },

  deletePlan: async (id: string): Promise<DeletedPlanResponse> => {
    const deleted = await stripe.plans.del(id);
    return deleted;
  },
};

export default planServices;
