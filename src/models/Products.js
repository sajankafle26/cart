//Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  qty: Number,
  categoryId: String,
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);