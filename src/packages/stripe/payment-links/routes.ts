import { Router, Request, Response } from "express";
import paymentLinkServices from "./services";

const router = Router();

/**
 * POST /stripe/payment-links/create - Create a new payment link
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const paymentLink = await paymentLinkServices.createPaymentLink(req.body);
    return res.status(201).json(paymentLink);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/payment-links/retrieve/:id - Retrieve a single payment link
 */
router.get("/retrieve/:id", async (req: Request, res: Response) => {
  try {
    const paymentLink = await paymentLinkServices.retrievePaymentLink(
      req.params.id
    );
    return res.json(paymentLink);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
});

/**
 * PATCH /stripe/payment-links/update/:id - Update a payment link
 */
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const paymentLink = await paymentLinkServices.updatePaymentLink(
      req.params.id,
      req.body
    );
    return res.json(paymentLink);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/payment-links/list - List all payment links
 * Query params: active, limit, starting_after, ending_before
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
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      starting_after: req.query.starting_after as string | undefined,
      ending_before: req.query.ending_before as string | undefined,
    };

    const paymentLinks = await paymentLinkServices.listPaymentLinks(params);
    return res.json(paymentLinks);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/payment-links/line-items/:id - List line items for a payment link
 */
router.get("/line-items/:id", async (req: Request, res: Response) => {
  try {
    const params = {
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      starting_after: req.query.starting_after as string | undefined,
      ending_before: req.query.ending_before as string | undefined,
    };

    const lineItems = await paymentLinkServices.listLineItems(
      req.params.id,
      params
    );
    return res.json(lineItems);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as paymentLinksRouter };
