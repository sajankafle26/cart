// Category.js
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default mongoose.models.Category || mongoose.model("Category", CategorySchema);


