"use client";

import AdminProtectedRoute from '@/app/components/AdminProtectedRoute';
import DashboardLayout from '@/app/components/DashboardLayout';
import React, { useEffect, useState } from 'react';

function Page() {
  const [category, setCategory] = useState([]);
  const [input, setInput] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null); //  

  // Fetch categories
  const fetchCategory = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategory(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Form submit handler
  const submitBtn = async (e) => {
    e.preventDefault(); //  
    try {
      if (editId) {
        // UPDATE
        await fetch("/api/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: editId, ...input }),
        });
        setEditId(null);
      } else {
        // CREATE
        await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
      }

      setInput({ name: "", description: "" });
      fetchCategory();
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
      });
      fetchCategory();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  // Edit handler
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setInput({ name: cat.name, description: cat.description });
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">This is the category page</h1>

      <form onSubmit={submitBtn} className="mb-6">
        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
          className="bg-white p-2 mb-2 w-[300px]"
          required
        />
        <br />
        <label>Description</label>
        <br />
        <textarea
          name="description"
          value={input.description}
          onChange={handleChange}
          className="bg-white p-2 mb-2 w-[300px]"
          required
        />
        <br />
        <button className="bg-blue-500 text-white p-2 rounded">
          {editId ? "Update" : "Send"}
        </button>
      </form>

      <table className="border-2 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">S.N.</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((a, index) => (
            <tr key={a._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{a.name}</td>
              <td className="border p-2">{a.description}</td>
              <td className="border p-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 mr-2"
                  onClick={() => handleDelete(a._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1"
                  onClick={() => handleEdit(a)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
}

export default Page;
