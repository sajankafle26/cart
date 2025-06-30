import { connectDB } from "@/app/lib/db";
import User from "@/models/User";

// GET - Get all users or user by ID
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const user = await User.findById(id);
      if (!user) return Response.json({ error: "User not found" }, { status: 404 });
      return Response.json(user);
    } catch (error) {
      return Response.json({ error: "Invalid ID" }, { status: 400 });
    }
  }

  const users = await User.find();
  return Response.json(users);
}

// POST - Create a new user
export async function POST(req) {
  await connectDB();
  const data = await req.json();

  try {
    const user = await User.create(data);
    return Response.json(user, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}

// PUT - Update a user
export async function PUT(req) {
  await connectDB();
  const { _id, username, password, adminRole } = await req.json();

  try {
    const updated = await User.findByIdAndUpdate(
      _id,
      { username, password, adminRole },
      { new: true }
    );

    if (!updated) return Response.json({ error: "User not found" }, { status: 404 });

    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}

// DELETE - Delete a user
export async function DELETE(req) {
  await connectDB();
  const { _id } = await req.json();

  try {
    const deleted = await User.findByIdAndDelete(_id);
    if (!deleted) return Response.json({ error: "User not found" }, { status: 404 });

    return Response.json({ success: true, deleted });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
