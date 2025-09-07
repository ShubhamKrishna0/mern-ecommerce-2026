// routes/shop/search-routes.js
import express from "express";
import { searchProducts } from "../../controllers/shop/search-controller.js"; // ✅ .js extension required

const router = express.Router();

router.get("/:keyword", searchProducts);

export default router;
