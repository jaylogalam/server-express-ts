import { Router, Request, Response } from "express";
import planServices from "./services";

const router = Router();

/**
 * POST /stripe/plans/create - Create a new plan
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const plan = await planServices.createPlan(req.body);
    return res.status(201).json(plan);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/plans/read/:id - Read a single plan
 */
router.get("/read/:id", async (req: Request, res: Response) => {
  try {
    const plan = await planServices.retrievePlan(req.params.id);
    return res.json(plan);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
});

/**
 * PATCH /stripe/plans/update/:id - Update a plan
 * Note: Only metadata, nickname, active status, and product can be updated
 */
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const plan = await planServices.updatePlan(req.params.id, req.body);
    return res.json(plan);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/plans/list - List all plans
 * Query params: active, product, limit, starting_after, ending_before
 */
router.get("/list", async (req: Request, res: Response) => {
  try {
    const params = {
      active:
        req.query.active === "true"
          ? true
          : req.query.active === "false"
          ? false
          : undefined,
      product: req.query.product as string | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      starting_after: req.query.starting_after as string | undefined,
      ending_before: req.query.ending_before as string | undefined,
    };

    const plans = await planServices.listPlans(params);
    return res.json(plans);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /stripe/plans/delete/:id - Delete a plan
 */
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await planServices.deletePlan(req.params.id);
    return res.json(deleted);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as plansRouter };
