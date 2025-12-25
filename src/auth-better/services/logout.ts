import { auth } from "../auth";
import { Request } from "express";

const logout = async (req: Request) => {
  await auth.api.signOut({
    headers: req.headers as Record<string, string>,
  });
};

export { logout };
