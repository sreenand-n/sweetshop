import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "./button";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      {/* Left: Brand */}
      <Link to="/" className="text-xl font-bold">
        🍬 Sweet Shop
      </Link>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {user?.is_admin && (
          <Link to="/admin">
            <Button variant="outline">Admin</Button>
          </Link>
        )}

        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
}
