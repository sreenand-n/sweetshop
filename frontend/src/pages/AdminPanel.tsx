import { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import AdminSweetCard from "../components/ui/AdminSweetCard";
import { getSweets } from "../api/sweets";
import type { Sweet } from "../api/sweets";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSweets = async () => {
    setLoading(true);
    const data = await getSweets();
    setSweets(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>

          <Button onClick={() => navigate("/admin/add")}>
            + Add Sweet
          </Button>
        </div>

        {/* Sweet List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading sweets...</p>
        ) : sweets.length === 0 ? (
          <p className="text-center text-gray-500">
            No sweets available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweets.map((sweet) => (
              <AdminSweetCard
                key={sweet.id}
                sweet={sweet}
                onChange={fetchSweets}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
