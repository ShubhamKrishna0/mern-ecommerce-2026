// products-routes.js (ESM)
import express from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/products-controller.js"; // ✅ .js extension required

const router = express.Router();

// Routes
router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);

// Export router as default for ES module import
export default router;
