import { Router, Request, Response } from "express";
import accountServices from "./services";

const router = Router();

/**
 * POST /stripe/accounts/create - Create a new account
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const account = await accountServices.createAccount(req.body);
    return res.status(201).json(account);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/accounts/read/:id - Read a single account
 */
router.get("/read/:id", async (req: Request, res: Response) => {
  try {
    const account = await accountServices.retrieveAccount(req.params.id);
    return res.json(account);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
});

/**
 * POST /stripe/accounts/update/:id - Update an account
 */
router.post("/update/:id", async (req: Request, res: Response) => {
  try {
    const account = await accountServices.updateAccount(
      req.params.id,
      req.body
    );
    return res.json(account);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/accounts/list - List all accounts
 * Query params: limit
 */
router.get("/list", async (req: Request, res: Response) => {
  try {
    const params = {
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    };

    const accounts = await accountServices.listAccounts(params);
    return res.json(accounts);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * POST /stripe/accounts/close/:id - Close an account
 */
router.post("/close/:id", async (req: Request, res: Response) => {
  try {
    const account = await accountServices.closeAccount(req.params.id);
    return res.json(account);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as accountsRouter };
