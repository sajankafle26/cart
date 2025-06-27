
import { connectDB } from "@/app/lib/db";
import Category from "@/models/Category";



// ✅ GET all categories
export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return Response.json(categories);
}

// ✅ POST a new category
export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const category = await Category.create(data);
  return Response.json(category);
}

// ✅ PUT to update a category (expects { _id, name, description })
export async function PUT(req) {
  await connectDB();
  const data = await req.json();
  const { _id, name, description } = data;

  const updated = await Category.findByIdAndUpdate(
    _id,
    { name, description },
    { new: true }
  );

  return Response.json(updated);
}

// ✅ DELETE a category (expects { _id } in request body)
export async function DELETE(req) {
  await connectDB();
  const data = await req.json();
  const { _id } = data;

  const deleted = await Category.findByIdAndDelete(_id);
  return Response.json({ success: true, deleted });
}
