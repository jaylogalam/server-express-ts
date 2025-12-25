import { Router } from "express";
import { signupRouter } from "./signup.router";
import { loginRouter } from "./login.router";
import { logoutRouter } from "./logout.router";

const router = Router();

router.use("/signup", signupRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

export { router as authRouter };
