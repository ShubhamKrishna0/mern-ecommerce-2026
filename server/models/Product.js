// models/Product.js (ESM)
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

// Export default so controllers can import like: import Product from "...";
export default mongoose.model("Product", ProductSchema);
