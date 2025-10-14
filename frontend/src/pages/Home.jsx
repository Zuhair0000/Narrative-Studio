import Navbar from "../components/Navbar";
import GradientBackground from "../components/GradientBackground";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1F2028]">
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
      <div className="absolute top-[calc(80vh)] left-0 w-full h-[calc(100vh-80vh)] bg-gradient-to-r from-orange-500 to-pink-600 rounded-t-[100px] z-0"></div>
    </div>
  );
}
