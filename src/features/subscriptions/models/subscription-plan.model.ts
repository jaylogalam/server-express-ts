import { Schema, model, Document } from "mongoose";

export interface ISubscriptionPlan extends Document {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  most_popular: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
      default: [],
    },
    most_popular: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    versionKey: false,
  }
);

const SubscriptionPlan = model<ISubscriptionPlan>(
  "plans",
  subscriptionPlanSchema
);

export default SubscriptionPlan;
