import { useState } from "react";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (formData, setFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Sign up failed");
      }
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1F2028] min-h-screen">
      <Navbar showAuthButtons={false} />
      <div className="flex justify-center items-center px-4 mt-20">
        <AuthForm type="signup" onSubmit={handleSignUp} isLoading={isLoading} />
      </div>
      <div className="absolute top-[calc(80vh)] left-0 w-full h-[calc(100vh-80vh)] bg-gradient-to-r from-orange-500 to-pink-600 rounded-t-[100px] z-0"></div>
    </div>
  );
}
