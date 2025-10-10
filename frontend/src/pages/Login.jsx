import GradientBackground from "../components/GradientBackground";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";

export default function Login() {
  const handleLogin = (data) => {
    console.log("Login Data:", data);
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
