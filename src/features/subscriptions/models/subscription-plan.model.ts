import { ObjectId } from "mongodb";

export interface ISubscriptionPlan {
  _id?: ObjectId;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  most_popular: boolean;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}
