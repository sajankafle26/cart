
//User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  adminRole: { type: Boolean, default: false },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
