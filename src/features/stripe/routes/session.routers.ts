import { Router, Request, Response } from "express";
import { sessionServices } from "../services";

const router = Router();

/**
 * POST /stripe/sessions/create - Create a new checkout session
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const session = await sessionServices.createSession(req.body);
    return res.status(201).json(session);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/sessions/retrieve/:id - Retrieve a single checkout session
 */
router.get("/retrieve/:id", async (req: Request, res: Response) => {
  try {
    const session = await sessionServices.retrieveSession(req.params.id);
    return res.json(session);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
});

/**
 * PATCH /stripe/sessions/update/:id - Update a checkout session
 * Note: Only metadata can be updated after a session is created
 */
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const session = await sessionServices.updateSession(
      req.params.id,
      req.body
    );
    return res.json(session);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/sessions/list - List all checkout sessions
 * Query params: limit, starting_after, ending_before
 */
router.get("/list", async (req: Request, res: Response) => {
  try {
    const params = {
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      starting_after: req.query.starting_after as string | undefined,
      ending_before: req.query.ending_before as string | undefined,
    };

    const sessions = await sessionServices.listSessions(params);
    return res.json(sessions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /stripe/sessions/expire/:id - Expire an active checkout session
 */
router.post("/expire/:id", async (req: Request, res: Response) => {
  try {
    const session = await sessionServices.expireSession(req.params.id);
    return res.json(session);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as sessionRouter };
