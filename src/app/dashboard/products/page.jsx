"use client";

import DashboardLayout from '@/app/components/DashboardLayout';
import React, { useEffect, useState } from 'react';

function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState({
    title: '',
    price: '',
    image: '',
    qty: '',
    categoryId: '',
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...input,
      price: Number(input.price),
      qty: Number(input.qty),
    };

    try {
      const res = await fetch('/api/products', {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editId ? { _id: editId, ...payload } : payload),
      });
      if (!res.ok) throw new Error('Failed to save product');
      await fetchProducts();
      setInput({ title: '', price: '', image: '', qty: '', categoryId: '' });
      setEditId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (product) => {
    setInput({
      title: product.title,
      price: product.price,
      image: product.image,
      qty: product.qty,
      categoryId: product.categoryId?._id || product.categoryId || '',
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id }),
    });
    fetchProducts();
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{editId ? 'Edit Product' : 'Add Product'}</h1>

        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8 max-w-xl space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={input.title}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={input.price}
            onChange={handleChange}
            className="w-full border p-2"
            required
            min="0"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={input.image}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={input.qty}
            onChange={handleChange}
            className="w-full border p-2"
            required
            min="0"
          />
          <select
            name="categoryId"
            value={input.categoryId}
            onChange={handleChange}
            className="w-full border p-2"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">
              {editId ? 'Update' : 'Submit'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setInput({ title: '', price: '', image: '', qty: '', categoryId: '' });
                  setEditId(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <h2 className="text-xl font-semibold mb-2">Product List</h2>

        {!loading && !error && (
          <table className="w-full text-left border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Qty</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="border px-4 py-2">{p.title}</td>
                  <td className="border px-4 py-2">{p.price}</td>
                  <td className="border px-4 py-2">
                    <img src={p.image} alt={p.title} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="border px-4 py-2">{p.qty}</td>
                  <td className="border px-4 py-2">
                    {p.categoryId?.name || p.categoryId}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Page;
