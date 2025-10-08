import Navbar from "../components/Navbar";
import GradientBackground from "../components/GradientBackground";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  return (
    <GradientBackground>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F3911D] to-[#840B86] text-transparent bg-clip-text pb-10">
          Narrative Studio
        </h1>
        <p className="max-w-xl text-gray-300 mb-8">
          Transform your company’s vision into compelling brand stories that
          resonate with your audience. Powered by advanced AI to craft
          narratives that inspire and convert.
        </p>
        <Button>Get Started</Button>
      </div>
    </GradientBackground>
  );
}
