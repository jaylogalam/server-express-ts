import { Router, Request, Response } from "express";

const logoutRouter = Router();

logoutRouter.post("", (req: Request, res: Response) => {
  // Clear the access token cookie
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logout successful" });
});

export { logoutRouter };
