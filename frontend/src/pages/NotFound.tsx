import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-6">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>

      <Link to="/">
        <Button>Go to Dashboard</Button>
      </Link>
    </div>
  );
}
