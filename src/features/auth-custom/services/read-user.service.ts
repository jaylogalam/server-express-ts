import { QueryFilter } from "mongoose";
import User, { IUser } from "../models/user.model";
import { AuthError } from "../../core/errors/auth.error";

// All user fields except password_hash
type SafeUserFields =
  | "username"
  | "email"
  | "avatar_url"
  | "last_sign_in_at"
  | "created_at"
  | "updated_at"
  | "_id";

type ReadUserParams = {
  filter: QueryFilter<IUser>;
  select?: SafeUserFields[];
  limit?: number;
  skip?: number;
};

const readUser = async ({
  filter,
  select,
}: Omit<ReadUserParams, "limit" | "skip">) => {
  const selectFields = select?.length ? select.join(" ") : "";
  const user = await User.findOne(filter).select(selectFields).exec();
  if (!user) throw new AuthError("User not found");
  return user;
};

const readUsers = async ({ filter, select, limit, skip }: ReadUserParams) => {
  const selectFields = select?.length ? select.join(" ") : "";

  const query = User.find(filter).select(selectFields);

  if (skip) query.skip(skip);
  if (limit) query.limit(limit);

  return await query.exec();
};

export { readUser, readUsers };
