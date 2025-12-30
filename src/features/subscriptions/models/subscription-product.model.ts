import { Schema, model, Document } from "mongoose";

export interface ISubscriptionProduct extends Document {
  // STRIPE LINKS
  stripeProductId: string;
  defaultPriceId: string | null;

  // UI CONTENT
  name: string;
  description: string | null;
  features: string[];

  // SYSTEM STATUS
  isActive: boolean;
  mostPopular: boolean;
}

const subscriptionProductSchema = new Schema<ISubscriptionProduct>(
  {
    // STRIPE LINKS
    stripeProductId: {
      type: String,
      required: true,
      unique: true,
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

    // SYSTEM STATUS
    isActive: {
      type: Boolean,
      default: false,
    },
    mostPopular: {
      type: Boolean,
      default: false,
    },

    // PRICING
    defaultPriceId: {
      type: String,
      default: null,
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

const SubscriptionProduct = model<ISubscriptionProduct>(
  "subscription-products",
  subscriptionProductSchema
);

export default SubscriptionProduct;
