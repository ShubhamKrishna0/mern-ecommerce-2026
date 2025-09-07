// routes/shop/product-review-routes.js
import express from "express";
import {
  addProductReview,
  getProductReviews,
} from "../../controllers/shop/product-review-controller.js"; // ✅ .js extension required

const router = express.Router();

router.post("/add", addProductReview);
router.get("/:productId", getProductReviews);

export default router; // ✅ use default export for ES modules
