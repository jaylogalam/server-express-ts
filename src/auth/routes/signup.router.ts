import { Router, Request, Response } from "express";
import { createUser } from "../services/create-user.service";
import { generateToken } from "../services/generate-token.service";

const signupRouter = Router();

signupRouter.post("", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if username, email, and password are provided
    if (!username || !email || !password)
      return res.status(400).json({ error: "Missing required fields" });

    // Create new user
    const newUser = await createUser({ username, email, password });

    // Generate access token for auto-login
    const accessToken = generateToken({ userId: newUser._id.toString() });

    // Set cookie with secure options
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return success response
    return res.status(201).json({
      message: "Signup successful",
      user: newUser,
    });
  } catch (error: any) {
    // MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      if (field === "username") {
        return res.status(409).json({
          message: `Username already exists`,
        });
      }
      if (field === "email") {
        return res.status(409).json({
          message: `Email already exists`,
        });
      }
    }

    return res.status(500).json();
  }
});

export { signupRouter };
