import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar({ showAuthButtons = true }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center bg-[#1F2028] px-10 py-6 text-white">
      <Link
        to={token ? "/dashboard" : "/"}
        className="text-lg font-semibold flex justify-center items-center"
      >
        <img src="../../public/navbarLogo.jpg" className="w-10 mr-3" />
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
      {token ? <Button onSubmit={handleLogout}>Log out</Button> : ""}
    </nav>
  );
}
