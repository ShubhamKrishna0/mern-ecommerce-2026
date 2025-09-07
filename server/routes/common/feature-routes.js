import express from "express";
import { addFeatureImage, getFeatureImages } from "../../controllers/common/feature-controller.js";
import { upload } from "../../helpers/cloudinary.js"; // ✅ Add multer upload

const router = express.Router();

// ✅ Route with multer middleware
router.post("/add", upload.single("image"), addFeatureImage);
router.get("/get", getFeatureImages);

export default router;
