// controllers/admin/products-controller.js (ESM)
import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";

// Handle image upload only (optional)
export const handleImageUpload = async (req, res) => {
  try {
    console.log("=== Debug: handleImageUpload called ===");
    console.log("req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await imageUploadUtil(req.file.buffer);
    console.log("Cloudinary upload result:", result);

    res.json({
      success: true,
      url: result.secure_url, // Cloudinary URL
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while uploading image",
      error: error.message,
    });
  }
};

// Add product with image upload (supports file OR URL)
export const addProduct = async (req, res) => {
  try {
    console.log("=== Debug: addProduct called ===");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    let imageUrl = "";

    // Case 1: File upload (via multipart/form-data)
    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      try {
        const result = await imageUploadUtil(req.file.buffer);
        console.log("Cloudinary result:", result);
        imageUrl = result.secure_url;
      } catch (cloudErr) {
        console.error("Cloudinary upload error:", cloudErr);
        return res.status(500).json({
          success: false,
          message: "Cloudinary upload failed",
          error: cloudErr.message,
        });
      }
    } 
    // Case 2: Image URL passed directly in request body
    else if (req.body.image) {
      console.log("Using provided image URL...");
      imageUrl = req.body.image;
    } else {
      console.warn("No image provided.");
    }

    // Destructure product fields from request body
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Create new product
    const newlyCreatedProduct = new Product({
      image: imageUrl,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newlyCreatedProduct.save();
    console.log("Saved product:", newlyCreatedProduct);

    return res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (err) {
    console.error("Error in addProduct:", err);
    return res.status(500).json({
      success: false,
      message: "Error occurred while adding product",
      error: err.message,
    });
  }
};

// Fetch all products
export const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// Edit a product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    return res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};
