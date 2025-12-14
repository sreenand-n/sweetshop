import { useEffect, useState } from "react";
import Navbar from "../components/ui/Navbar";
import SweetCard from "../components/ui/SweetCard";
import { getSweets, searchSweets } from "../api/sweets";
import type { Sweet } from "../api/sweets";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);

  // Search filters
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchSweets = async () => {
    setLoading(true);
    const data = await getSweets();
    setSweets(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleSearch = async () => {
    setLoading(true);

    const params: any = {};
    if (name) params.name = name;
    if (category) params.category = category;
    if (minPrice) params.min_price = Number(minPrice);
    if (maxPrice) params.max_price = Number(maxPrice);

    const data = await searchSweets(params);
    setSweets(data);
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-6">
        {/* Hero Section */}
      <div
        className="h-56 rounded-xl bg-cover bg-center flex items-center px-8 text-white"
        style={{
          backgroundImage:
            "url(https://www.shutterstock.com/image-photo/group-indian-assorted-sweets-mithai-260nw-2068990322.jpg)",
        }}
      >
        <div>
          <h1 className="text-3xl font-extrabold text-white" >
            Fresh & Traditional Sweets
          </h1>
          <p className="text-sm opacity-90">
            Crafted daily. Delivered with love.
          </p>
        </div>
      </div>
        {/* Search Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Input
            placeholder="Search by name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* Sweet List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading sweets...</p>
        ) : sweets.length === 0 ? (
          <p className="text-center text-gray-500">No sweets found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onPurchased={fetchSweets}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
