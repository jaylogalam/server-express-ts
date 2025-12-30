import { Router, Request, Response } from "express";
import checkoutSessionServices from "./services";

const router = Router();

/**
 * POST /stripe/checkout-sessions/create - Create a new checkout session
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const session = await checkoutSessionServices.createSession(req.body);
    return res.status(201).json(session);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/checkout-sessions/retrieve/:id - Retrieve a single checkout session
 */
router.get("/retrieve/:id", async (req: Request, res: Response) => {
  try {
    const session = await checkoutSessionServices.retrieveSession(
      req.params.id
    );
    return res.json(session);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
});

/**
 * PATCH /stripe/checkout-sessions/update/:id - Update a checkout session
 * Note: Only metadata can be updated after a session is created
 */
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const session = await checkoutSessionServices.updateSession(
      req.params.id,
      req.body
    );
    return res.json(session);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/checkout-sessions/list - List all checkout sessions
 * Query params: limit, starting_after, ending_before
 */
router.get("/list", async (req: Request, res: Response) => {
  try {
    const params = {
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      starting_after: req.query.starting_after as string | undefined,
      ending_before: req.query.ending_before as string | undefined,
    };

    const sessions = await checkoutSessionServices.listSessions(params);
    return res.json(sessions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /stripe/checkout-sessions/expire/:id - Expire an active checkout session
 */
router.post("/expire/:id", async (req: Request, res: Response) => {
  try {
    const session = await checkoutSessionServices.expireSession(req.params.id);
    return res.json(session);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as checkoutSessionsRouter };
