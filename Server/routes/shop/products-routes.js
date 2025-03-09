import { Router } from "express";

import { getFilteredProducts } from "../../controllers/shopping/products-controller";

const router = Router();

router.get("/get", getFilteredProducts);

export default router;
