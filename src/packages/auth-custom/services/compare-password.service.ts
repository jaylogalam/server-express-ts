import bcrypt from "bcrypt";
import { AuthError } from "../../../core/errors/auth.error";

type ComparePasswordParams = {
  password: string;
  hashedPassword: string;
};

const comparePassword = async ({
  password,
  hashedPassword,
}: ComparePasswordParams) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordValid) throw new AuthError();
};

export { comparePassword };
