import { Router, Request, Response } from "express";
import { logout } from "../services/logout";

const router = Router();

router.post("", async (req: Request, res: Response) => {
  try {
    await logout(req);
    return res.status(200).json({ message: "Logout successful" });
  } catch (error: any) {
    if (error.name === "APIError") {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error.name);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export { router as logoutRouter };
