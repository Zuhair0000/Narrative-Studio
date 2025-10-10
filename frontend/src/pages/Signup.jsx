import GradientBackground from "../components/GradientBackground";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";

export default function SignUp() {
  const handleSignUp = (data) => {
    console.log("Sign Up Data:", data);
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
