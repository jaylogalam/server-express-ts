import { Router, Request, Response } from "express";
import { AuthError } from "../../core/errors/auth.error";
import { loginEmail, loginUsername } from "../services/login";

const router = Router();

router.post("", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AuthError("Incorrect email or password", 401);
    }

    if (email.includes("@")) await loginEmail({ email, password });
    else await loginUsername({ username: email, password });

    return res.status(200).json({ message: "Login successful" });
  } catch (error: any) {
    if (error instanceof AuthError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    if (error.name === "APIError") {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { router as loginRouter };
