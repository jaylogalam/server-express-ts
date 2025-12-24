import { Router, Request, Response } from "express";
import { comparePassword } from "../services/compare-password.service";
import { AuthError } from "../errors/auth.error";
import { readUser } from "../services/read-user.service";
import { generateToken } from "../services/generate-token.service";

const loginRouter = Router();

loginRouter.post("", async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    // Check if email or username and password are provided
    if ((!email && !username) || !password)
      return res.status(400).json({ error: "Missing required fields" });

    // Check if email or username is provided
    const filter = email
      ? { email: email.toLowerCase() }
      : { username: username.toLowerCase() };

    // Check if user exists
    const user = await readUser({ filter });

    // Check if password is correct
    await comparePassword({
      password,
      hashedPassword: user.password_hash,
    });

    // Update last_sign_in_at
    user.last_sign_in_at = new Date();
    await user.save();

    // Generate access token
    const accessToken = generateToken({ userId: user._id.toString() });

    // Set cookie with secure options
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return success response
    return res.status(200).json({
      message: "Login successful",
      user: user,
    });
  } catch (error: any) {
    // Handle authentication errors
    if (error instanceof AuthError) {
      return res
        .status(error.statusCode)
        .json({ error: "Invalid email or password" });
    }

    // Handle other errors
    return res.status(500).json({ error: `Internal server error` });
  }
});

export { loginRouter };
