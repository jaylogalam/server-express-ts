import { Router, Request, Response } from "express";
import { AuthError } from "../../core/errors/auth.error";
import { signupEmail } from "../services/signup";

const router = Router();

router.post("", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new AuthError("Missing required fields", 400);
    }

    await signupEmail({
      username,
      email,
      password,
    });

    return res.status(201).json({ message: "Signup successful" });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    if (error.name === "APIError") {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { router as signupRouter };
