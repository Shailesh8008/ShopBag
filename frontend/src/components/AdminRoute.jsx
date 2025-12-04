import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/checkadmin", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) return setIsAdmin(true);
        return toast(data.message || "Unauthorized", { icon: " ℹ️" });
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-24 h-24 border-8 border-t-8 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  if (isAdmin) return children;
  return (
    <div className="h-screen">
      <h1>Error: authentication failed</h1>
    </div>
  );
}
