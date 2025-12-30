import User from "../models/user.model";

type CreateUserParams = {
  username: string;
  email: string;
  password: string;
};

const createUser = async ({ username, email, password }: CreateUserParams) => {
  const user = new User({
    username,
    email,
    password_hash: password,
    avatar_url: "",
    last_sign_in_at: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  });
  const response = await user.save();
  return response;
};

export { createUser };
