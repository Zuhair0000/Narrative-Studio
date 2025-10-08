import GradientBackground from "../components/GradientBackground";
import AuthForm from "../components/AuthForm";
import Navbar from "../components/Navbar";

export default function SignUp() {
  const handleSignUp = (data) => {
    console.log("Sign Up Data:", data);
  };

  return (
    <GradientBackground>
      <Navbar showAuthButtons={false} />
      <div className="flex justify-center items-center min-h-screen px-4">
        <AuthForm type="signup" onSubmit={handleSignUp} />
      </div>
    </GradientBackground>
  );
}
