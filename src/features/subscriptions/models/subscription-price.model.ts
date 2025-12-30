import { Schema, model, Document } from "mongoose";

export interface ISubscriptionPrice extends Document {
  // STRIPE LINKS
  stripePriceId: string;
  stripeProductId: string;

  // FINANCIAL DATA
  amountCents: number | null;
  currency: string;
  billingInterval: string;

  // SYSTEM STATUS
  isActive: boolean;
}

const subscriptionPriceSchema = new Schema<ISubscriptionPrice>(
  {
    // STRIPE LINKS
    stripePriceId: {
      type: String,
      required: true,
      unique: true,
    },
    stripeProductId: {
      type: String,
      required: true,
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
        delete (ret as any)._id;
        delete (ret as any).stripeProductId;
        return ret;
      },
    },
  }
);

const SubscriptionPrice = model<ISubscriptionPrice>(
  "subscription-prices",
  subscriptionPriceSchema
);

export default SubscriptionPrice;
