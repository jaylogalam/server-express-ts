import SubscriptionPlan, {
  ISubscriptionPlan,
} from "../models/subscription-plan.model";
import { Document } from "mongoose";

const plansServices = {
  async createPlan(plan: Omit<ISubscriptionPlan, keyof Document>) {
    const newPlan = await SubscriptionPlan.create(plan);
    return newPlan;
  },

  async readPlans() {
    const plans = await SubscriptionPlan.find({ is_active: true });
    return plans;
  },
};

export { plansServices };
