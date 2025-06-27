import { connectDB } from "@/app/lib/db";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const user = await User.findById(id);
    return Response.json(user);
  }

  const users = await User.find();
  return Response.json(users);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const user = await User.create(data);
  return Response.json(user);
}

export async function PUT(req) {
  await connectDB();
  const { _id, username, password, adminRole } = await req.json();

  const updated = await User.findByIdAndUpdate(
    _id,
    { username, password, adminRole },
    { new: true }
  );

  return Response.json(updated);
}

export async function DELETE(req) {
  await connectDB();
  const { _id } = await req.json();
  const deleted = await User.findByIdAndDelete(_id);
  return Response.json({ success: true, deleted });
}
