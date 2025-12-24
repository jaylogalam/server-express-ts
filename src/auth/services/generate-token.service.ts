import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = "your-super-secret-key-change-this-in-production";

type GenerateTokenParams = {
  userId: string;
  expiresIn?: SignOptions["expiresIn"];
};

const generateToken = ({ userId, expiresIn = "7d" }: GenerateTokenParams) => {
  const secret = JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign({ userId }, secret, { expiresIn });
};

export { generateToken };
