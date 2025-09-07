// routes/admin/products-routes.js (ESM)
import express from "express";
import {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} from "../../controllers/admin/products-controller.js"; // ✅ .js extension required

import { upload } from "../../helpers/cloudinary.js"; // ✅ .js extension required

const router = express.Router();

// Routes

// 1️⃣ Optional separate image upload (if you want two-step)
router.post("/upload-image", upload.single("image"), handleImageUpload);

// 2️⃣ Add product with image upload (single-step)
router.post("/add", upload.single("image"), addProduct);

// 3️⃣ Edit product (if you want to support image update, also add upload.single("image") here)
router.put("/edit/:id", upload.single("image"), editProduct);

// 4️⃣ Delete product
router.delete("/delete/:id", deleteProduct);

// 5️⃣ Fetch all products
router.get("/get", fetchAllProducts);

// Export router as default
export default router;
