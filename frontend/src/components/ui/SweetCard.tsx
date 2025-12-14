import { purchaseSweet } from "../../api/sweets";
import type { Sweet } from "../../api/sweets";
import { Button } from "./button";
import { Card, CardContent } from "./card";

interface SweetCardProps {
  sweet: Sweet;
  onPurchased: () => void;
}

export default function SweetCard({
  sweet,
  onPurchased,
}: SweetCardProps) {
  const handlePurchase = async () => {
    try {
      await purchaseSweet(sweet.id);
      onPurchased(); // refresh list after purchase
    } catch {
      // backend already handles stock validation
      alert("Unable to purchase sweet");
    }
  };

  return (
    
    <Card>
      <CardContent className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{sweet.name}</h2>

        <p className="text-sm text-gray-500">
          Category: {sweet.category}
        </p>

        <p className="font-medium">₹ {sweet.price}</p>

        <p
          className={`text-sm ${
            sweet.quantity === 0
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          Stock: {sweet.quantity}
        </p>

        <Button
          className="w-full"
          disabled={sweet.quantity === 0}
          onClick={handlePurchase}
        >
          {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
        </Button>
      </CardContent>
    </Card>
  );
}
