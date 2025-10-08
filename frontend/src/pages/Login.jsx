import GradientBackground from "../components/GradientBackground";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";

export default function Login() {
  const handleLogin = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <GradientBackground>
      <Navbar showAuthButtons={false} />
      <div className="flex justify-center items-center min-h-screen px-4">
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </GradientBackground>
  );
}
