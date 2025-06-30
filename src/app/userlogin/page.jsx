"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [input, setInput] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(input),
    });

    const data = await res.json();
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login successful");
      router.push("/cart"); // Redirect to home or dashboard
    } else {
      alert(data.error || "Login failed");
    }
  };

  const handleRegister = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ ...input, adminRole: false }),
    });

    const data = await res.json();
    if (data._id) {
      alert("Register successful, now login.");
      setIsLogin(true);
    } else {
      alert(data.error || "Registration failed");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      <input
        name="username"
        type="text"
        placeholder="Username"
        value={input.username}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={input.password}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />

      <button
        onClick={isLogin ? handleLogin : handleRegister}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <p className="text-center mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          className="text-blue-600 underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
