import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-[#1F2028] min-h-screen">
      <Navbar showAuthButtons={false} />
      <div className="flex justify-center items-center px-4 mt-20">
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
}
