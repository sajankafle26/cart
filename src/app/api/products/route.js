import { connectDB } from "@/app/lib/db";
import Products from "@/models/Products";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const categoryId = searchParams.get("category");

  if (id) {
    const product = await Products.findById(id).populate("categoryId");
    return Response.json(product);
  }

  if (categoryId) {
    const products = await Products.find({ categoryId }).populate("categoryId");
    return Response.json(products);
  }

  // Return all products if no filters
  const products = await Products.find().populate("categoryId");
  return Response.json(products);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const product = await Products.create(data);
  return Response.json(product);
}

export async function PUT(req) {
  await connectDB();
  const { _id, title, price, image, qty, categoryId } = await req.json();

  const updated = await Products.findByIdAndUpdate(
    _id,
    { title, price, image, qty, categoryId },
    { new: true }
  );

  return Response.json(updated);
}

export async function DELETE(req) {
  await connectDB();
  const { _id } = await req.json();
  const deleted = await Products.findByIdAndDelete(_id);
  return Response.json({ success: true, deleted });
}
