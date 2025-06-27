"use client";

import Layout from "@/app/components/Layout";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products?id=${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-10 text-gray-600">Loading product...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[400px] object-cover rounded shadow"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-xl text-green-700 font-semibold">Rs. {product.price}</p>
            <p className="text-gray-700 text-base leading-relaxed">
              {product.description || "This is a great product with high quality and excellent reviews."}
            </p>

            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition"
              onClick={() => console.log("Add to cart:", product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;
