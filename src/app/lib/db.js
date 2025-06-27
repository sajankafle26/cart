import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://localhost:27017/krishna";

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGODB_URI);
  console.log("MongoDB connected");
}


// lib/db.js
// import mongoose from 'mongoose';

// let isConnected = false;

// export const connectDB = async () => {
//   if (isConnected) {
//     return;
//   }

//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "myDatabase", // Replace with your DB name
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     isConnected = true;
//     console.log("✅ MongoDB connected:", db.connection.name);
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     throw new Error("Failed to connect to MongoDB");
//   }
// };
