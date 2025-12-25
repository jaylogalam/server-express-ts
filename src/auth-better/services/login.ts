import { AuthError } from "../../core/errors/auth.error";
import { auth } from "../auth";

type LoginParams = {
  username?: string;
  email?: string;
  password: string;
};

const loginUsername = async ({ username, password }: LoginParams) => {
  const user = await auth.api
    .signInUsername({
      body: {
        username: username!,
        password: password,
        rememberMe: false,
      },
    })
    .catch(() => {
      throw new AuthError("Incorrect email or password", 401);
    });

  return user;
};

const loginEmail = async ({ email, password }: LoginParams) => {
  const user = await auth.api
    .signInEmail({
      body: {
        email: email!,
        password: password,
        rememberMe: false,
      },
    })
    .catch(() => {
      throw new AuthError("Incorrect email or password", 401);
    });

  return user;
};

export { loginUsername, loginEmail };
