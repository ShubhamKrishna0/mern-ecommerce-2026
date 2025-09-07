// routes/shop/order-routes.js
import express from "express";

import {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
} from "../../controllers/shop/order-controller.js"; // ✅ .js extension required

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrdersByUser);
router.get("/details/:id", getOrderDetails);

export default router; // ✅ export default, no module.exports
