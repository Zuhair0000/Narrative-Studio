import GradientBackground from "../components/GradientBackground";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Sign up failed");
      }
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-[#1F2028] min-h-screen">
      <Navbar showAuthButtons={false} />
      <div className="flex justify-center items-center px-4 mt-20">
        <AuthForm type="signup" onSubmit={handleSignUp} />
      </div>
    </div>
  );
}
