import { connectDB } from "@/app/lib/db";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();

  const { username, password } = await req.json();

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
      return Response.json({ error: "Incorrect password" }, { status: 401 });
    }

    // Login success
    return Response.json({ message: "Login successful", user });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
