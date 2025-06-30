import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    _id: String,
    username: String,
  },
  items: [
    {
      title: String,
      price: Number,
    }
  ],
  name: String,
  phone: String,
  address: String,
  total: Number,
  paymentMethod: String, // "Khalti" | "eSewa"
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
