"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function AdminProtectedRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== "valid") {
      router.push("/login");
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) return <div>Loading...</div>;

  return <>{children}</>;
}

export default AdminProtectedRoute;
