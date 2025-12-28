import { Router, Request, Response } from "express";
import { priceServices } from "../services";

const router = Router();

/**
 * POST /stripe/prices - Create a new price
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const price = await priceServices.createPrice(req.body);
    return res.status(201).json(price);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/prices/:id - Read a single price
 */
router.get("/read/:id", async (req: Request, res: Response) => {
  try {
    const price = await priceServices.retrievePrice(req.params.id);
    return res.json(price);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
});

/**
 * PATCH /stripe/prices/:id - Update a price
 * Note: Only metadata, active status, and nickname can be updated
 */
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const price = await priceServices.updatePrice(req.params.id, req.body);
    return res.json(price);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/prices - List all prices
 * Query params: active, product, currency, type, limit, starting_after, ending_before
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
      currency: req.query.currency as string | undefined,
      type: req.query.type as "one_time" | "recurring" | undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      starting_after: req.query.starting_after as string | undefined,
      ending_before: req.query.ending_before as string | undefined,
    };

    const prices = await priceServices.listPrices(params);
    return res.json(prices);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/prices/search - Search prices
 * Query params: query, limit
 */
router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    if (!query) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const results = await priceServices.searchPrices(query, limit);
    return res.json(results);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as priceRouter };
