// controllers/common/feature-controller.js
import Feature from "../../models/Feature.js";
import { imageUploadUtil } from "../../helpers/cloudinary.js"; // ✅ Cloudinary uploader

// Upload + Save Feature Image in ONE API
export const addFeatureImage = async (req, res) => {
  try {
    console.log("=== Debug: addFeatureImage called ===");
    console.log("req.file:", req.file);

    // 1️⃣ Validate file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }

    // 2️⃣ Upload image to Cloudinary
    console.log("Uploading image to Cloudinary...");
    const result = await imageUploadUtil(req.file.buffer);
    console.log("Cloudinary upload result:", result);

    // 3️⃣ Save image URL to MongoDB
    const featureImage = new Feature({ image: result.secure_url });
    await featureImage.save();

    // 4️⃣ Send success response
    res.status(201).json({
      success: true,
      data: featureImage,
    });
  } catch (error) {
    console.error("Error in addFeatureImage:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading feature image",
      error: error.message,
    });
  }
};


export const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});
    return res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};
