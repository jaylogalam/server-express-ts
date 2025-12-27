import { ISubscriptionPlan } from "../models/subscription-plan.model";
import { mongoClient } from "../../../db/mongodb";

const db = mongoClient
  .db("subscription")
  .collection<ISubscriptionPlan>("plans");

const plansServices = {
  async createPlan(
    plan: Omit<ISubscriptionPlan, "_id" | "created_at" | "updated_at">
  ) {
    const now = new Date();
    const newPlan: ISubscriptionPlan = {
      ...plan,
      created_at: now,
      updated_at: now,
    };

    const result = await db.insertOne(newPlan);
    return result;
  },

  async readPlans() {
    const plans = await db.find({ is_active: true }).toArray();
    return plans;
  },
};

export { plansServices };
