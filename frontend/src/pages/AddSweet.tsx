import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/Navbar";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { createSweet } from "../api/sweets";

export default function AddSweet() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !category || !price || !quantity) {
      setError("All fields are required");
      return;
    }

    try {
      await createSweet({
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });

      navigate("/admin");
    } catch (err) {
      setError("Failed to add sweet");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">Add Sweet</h1>

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
            Create Sweet
          </Button>
        </form>
      </div>
    </>
  );
}
