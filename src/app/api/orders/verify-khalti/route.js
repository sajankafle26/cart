import { connectDB } from "@/app/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();

  const { token, amount, orderId } = await req.json();

  // Verify payment with Khalti's verification API
  const res = await fetch("https://khalti.com/api/v2/payment/verify/", {
    method: "POST",
    headers: {
      Authorization: "Key test_secret_key_1234567890abcdef", // Use your Khalti secret key here
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, amount }),
  });

  const data = await res.json();

  if (res.ok && data.idx) {
    // Payment verified, update order status
    await Order.findByIdAndUpdate(orderId, { isPaid: true });
    return Response.json({ success: true });
  }

  return Response.json({ success: false, error: "Verification failed" }, { status: 400 });
}
