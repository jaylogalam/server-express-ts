import { Schema, model, Document } from "mongoose";

export interface ISubscriptionPlan extends Document {
  // STRIPE LINKS
  stripeProductId: string;
  stripePriceId: string;

  // UI CONTENT
  name: string;
  description: string | null;
  features: string[];

  // FINANCIAL DATA
  amountCents: number | null;
  currency: string;
  billingInterval: string;

  // SYSTEM STATUS
  isActive: boolean;
  mostPopular: boolean;
}

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    // STRIPE LINKS
    stripeProductId: {
      type: String,
      required: true,
      unique: true,
    },
    stripePriceId: {
      type: String,
      required: true,
    },

    // UI CONTENT
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: null,
    },
    features: {
      type: [String],
      default: [],
    },

    // FINANCIAL DATA
    amountCents: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    billingInterval: {
      type: String,
      required: true,
    },

    // SYSTEM STATUS
    isActive: {
      type: Boolean,
      default: true,
    },
    mostPopular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        delete (ret as any).stripeProductId;
        delete (ret as any)._id;
        return ret;
      },
    },
  }
);

const SubscriptionPlan = model<ISubscriptionPlan>(
  "subscription-plans",
  subscriptionPlanSchema
);

export default SubscriptionPlan;
