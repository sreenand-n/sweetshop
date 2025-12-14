import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { getSweets, updateSweet } from "../api/sweets";
import type { Sweet } from "../api/sweets";

export default function EditSweet() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchSweet = async () => {
      try {
        const sweets: Sweet[] = await getSweets();
        const sweet = sweets.find((s) => s.id === Number(id));

        if (!sweet) {
          setError("Sweet not found");
          return;
        }

        setName(sweet.name);
        setCategory(sweet.category);
        setPrice(String(sweet.price));
        setQuantity(String(sweet.quantity));
      } catch {
        setError("Failed to load sweet");
      } finally {
        setLoading(false);
      }
    };

    fetchSweet();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !category || !price || !quantity) {
      setError("All fields are required");
      return;
    }

    try {
      await updateSweet(Number(id), {
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });

      navigate("/admin");
    } catch {
      setError("Failed to update sweet");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10">Loading...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">Edit Sweet</h1>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <Input
            placeholder="Sweet name"
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
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Update Sweet
          </Button>
        </form>
      </div>
    </>
  );
}
