import { Router, Request, Response } from "express";
import subscriptionServices from "../services/subscription.services";

const router = Router();

/**
 * POST /stripe/subscriptions/create
 * Create a new subscription
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const subscription = await subscriptionServices.createSubscription(
      req.body
    );
    return res.status(201).json(subscription);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/subscriptions/retrieve/:id
 * Retrieve a subscription by ID
 */
router.get("/retrieve/:id", async (req: Request, res: Response) => {
  try {
    const subscription = await subscriptionServices.retrieveSubscription(
      req.params.id
    );
    return res.status(200).json(subscription);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * PATCH /stripe/subscriptions/update/:id
 * Update an existing subscription
 */
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const subscription = await subscriptionServices.updateSubscription(
      req.params.id,
      req.body
    );
    return res.status(200).json(subscription);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/subscriptions/list
 * List all subscriptions with optional filters
 */
router.get("/list", async (req: Request, res: Response) => {
  try {
    const subscriptions = await subscriptionServices.listSubscriptions(
      req.query
    );
    return res.status(200).json(subscriptions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /stripe/subscriptions/cancel/:id
 * Cancel a subscription
 */
router.post("/cancel/:id", async (req: Request, res: Response) => {
  try {
    const subscription = await subscriptionServices.cancelSubscription(
      req.params.id,
      req.body
    );
    return res.status(200).json(subscription);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /stripe/subscriptions/resume/:id
 * Resume a paused subscription
 */
router.post("/resume/:id", async (req: Request, res: Response) => {
  try {
    const subscription = await subscriptionServices.resumeSubscription(
      req.params.id
    );
    return res.status(200).json(subscription);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/subscriptions/customer/:customerId
 * Get all subscriptions for a customer
 */
router.get("/customer/:customerId", async (req: Request, res: Response) => {
  try {
    const subscriptions = await subscriptionServices.getCustomerSubscriptions(
      req.params.customerId
    );
    return res.status(200).json(subscriptions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /stripe/subscriptions/portal
 * Create a billing portal session for subscription management
 */
router.post("/portal", async (req: Request, res: Response) => {
  try {
    const session = await subscriptionServices.createPortalSession(req.body);
    return res.status(201).json(session);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
