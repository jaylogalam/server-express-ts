import { Router, Request, Response } from "express";
import webhookServices from "./services";

const router = Router();

/**
 * POST /stripe/webhooks/create - Create a new webhook endpoint
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const webhookEndpoint = await webhookServices.createWebhookEndpoint(
      req.body
    );
    return res.status(201).json(webhookEndpoint);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/webhooks/read/:id - Retrieve a webhook endpoint
 */
router.get("/read/:id", async (req: Request, res: Response) => {
  try {
    const webhookEndpoint = await webhookServices.retrieveWebhookEndpoint(
      req.params.id
    );
    return res.json(webhookEndpoint);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
});

/**
 * PATCH /stripe/webhooks/update/:id - Update a webhook endpoint
 */
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const webhookEndpoint = await webhookServices.updateWebhookEndpoint(
      req.params.id,
      req.body
    );
    return res.json(webhookEndpoint);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /stripe/webhooks/delete/:id - Delete a webhook endpoint
 */
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await webhookServices.deleteWebhookEndpoint(req.params.id);
    return res.json(deleted);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/webhooks/list - List all webhook endpoints
 * Query params: limit, starting_after, ending_before
 */
router.get("/list", async (req: Request, res: Response) => {
  try {
    const params = {
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      starting_after: req.query.starting_after as string | undefined,
      ending_before: req.query.ending_before as string | undefined,
    };

    const webhookEndpoints = await webhookServices.listWebhookEndpoints(params);
    return res.json(webhookEndpoints);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as webhooksRouter };
