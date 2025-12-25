import { AuthError } from "../../core/errors/auth.error";
import { auth } from "../auth";

type SignUpEmailProps = {
  username: string;
  email: string;
  password: string;
};

const signupEmail = async ({ username, email, password }: SignUpEmailProps) => {
  const user = await auth.api
    .signUpEmail({
      body: {
        name: username,
        email: email,
        password: password,
        username: username,
      },
    })
    .catch((error) => {
      if (error.body.message.includes("email"))
        throw new AuthError(
          "This email is already linked to an account",
          error.statusCode
        );
      else throw new AuthError(error.body.message, error.statusCode);
    });

  return user;
};

export { signupEmail };
