import cors from "cors";
import { origins } from "../core/origins";

export const corsMiddleware = cors({
  origin: origins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
