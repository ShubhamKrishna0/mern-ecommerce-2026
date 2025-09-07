// routes/shop/address-routes.js
import express from "express";

import {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} from "../../controllers/shop/address-controller.js"; // ✅ add .js extension

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

export default router; // ✅ default export for ESM
