import { connectDB } from "@/app/lib/db";
import Order from "@/models/Order";

export async function GET(req) {
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }); // latest first
  return Response.json(orders);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  try {
    const order = await Order.create(data);
    return Response.json(order, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
