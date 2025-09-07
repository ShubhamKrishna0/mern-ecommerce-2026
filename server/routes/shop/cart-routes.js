// routes/shop/cart-routes.js (ESM)
import express from "express";
import {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} from "../../controllers/shop/cart-controller.js"; // ✅ Add .js extension

const router = express.Router();

// Routes
router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQty);
router.delete("/:userId/:productId", deleteCartItem);

// Export router as default
export default router;
