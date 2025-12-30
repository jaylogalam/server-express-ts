import { Router, Request, Response } from "express";
import productServices from "./services";

const router = Router();

/**
 * POST /stripe/products - Create a new product
 */
router.post("/create", async (req: Request, res: Response) => {
  try {
    const product = await productServices.createProduct(req.body);
    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/products/:id - Read a single product
 */
router.get("/read/:id", async (req: Request, res: Response) => {
  try {
    const product = await productServices.retrieveProduct(req.params.id);
    return res.json(product);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
});

/**
 * PATCH /stripe/products/:id - Update a product
 */
router.patch("/update/:id", async (req: Request, res: Response) => {
  try {
    const product = await productServices.updateProduct(
      req.params.id,
      req.body
    );
    return res.json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /stripe/products/:id - Delete (archive) a product
 */
router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const deleted = await productServices.deleteProduct(req.params.id);
    return res.json(deleted);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/products - List all products
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

    const products = await productServices.listProducts(params);
    return res.json(products);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * GET /stripe/products/search - Search products
 * Query params: query, limit
 */
router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    if (!query) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    const results = await productServices.searchProducts(query, limit);
    return res.json(results);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as productsRouter };
