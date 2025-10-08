import { Link } from "react-router-dom";
import Button from "./Button";

export default function Navbar({ showAuthButtons = true }) {
  return (
    <nav className="flex justify-between items-center px-10 py-6 text-white">
      <Link to="/" className="text-lg font-semibold">
        Narrative Studio
      </Link>
      {showAuthButtons && (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 bg-gradient-brand rounded-md hover:opacity-90 transition"
          >
            Login
          </Link>
          <Button>Sign up</Button>
        </div>
      )}
    </nav>
  );
}
