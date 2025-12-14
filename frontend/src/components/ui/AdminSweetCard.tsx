import { deleteSweet, restockSweet } from "../../api/sweets";
import type { Sweet } from "../../api/sweets";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { useNavigate } from "react-router-dom";

interface AdminSweetCardProps {
  sweet: Sweet;
  onChange: () => void;
}

export default function AdminSweetCard({
  sweet,
  onChange,
}: AdminSweetCardProps) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!confirm(`Delete "${sweet.name}"?`)) return;

    try {
      await deleteSweet(sweet.id);
      onChange(); // refresh list
    } catch {
      alert("Failed to delete sweet");
    }
  };

  const handleRestock = async () => {
    try {
      await restockSweet(sweet.id, 5); // fixed restock amount
      onChange(); // refresh list
    } catch {
      alert("Failed to restock sweet");
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">{sweet.name}</h2>

        <p className="text-sm text-gray-500">
          Category: {sweet.category}
        </p>

        <p className="font-medium">₹ {sweet.price}</p>

        <p className="text-sm">Stock: {sweet.quantity}</p>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/edit/${sweet.id}`)}
          >
            Edit
          </Button>

          <Button
            variant="secondary"
            onClick={handleRestock}
          >
            Restock +5
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
