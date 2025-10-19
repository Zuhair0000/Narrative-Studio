import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Logo from "../assets/navbarLogo.jpg";
import { useEffect } from "react";
import { useState } from "react";

export default function Navbar({ showAuthButtons = true }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [credits, setCredits] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchCredits = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5432/api/stories/credits", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCredits(data.credits);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCredits();
    const interval = setInterval(fetchCredits, 30000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <nav className="flex justify-between items-center bg-[#1F2028] px-10 py-6 text-white">
      <Link
        to={token ? "/dashboard" : "/"}
        className="text-lg font-semibold flex justify-center items-center"
      >
        <img src={Logo} className="w-10 mr-3" />
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
      {token && (
        <div className="flex items-center gap-6">
          <Link
            to="/create-order"
            className="text-[#00FFAB] underline ml-2 text-sm hover:text-[#00D191]"
          >
            Buy more credits
          </Link>
          <div className="bg-[#2A2B33] px-4 py-2 rounded-lg text-sm">
            💰 Credits:{" "}
            <span className="font-semibold text-[#00FFAB]">
              {credits !== null ? credits : "…"}
            </span>
          </div>
          <Button onSubmit={handleLogout}>Log out</Button>
        </div>
      )}
    </nav>
  );
}
