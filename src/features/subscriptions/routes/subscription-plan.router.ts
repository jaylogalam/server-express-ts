import { Router, Request, Response } from "express";
import { plansServices } from "../services/subscription-plan.services";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const plans = await plansServices.readPlans();
    return res.json(plans);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const plan = await plansServices.createPlan(req.body);
    return res.json(plan);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as subscriptionPlanRouter };
