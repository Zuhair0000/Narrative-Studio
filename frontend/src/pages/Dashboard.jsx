import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [drafts, setDrafts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/stories/drafts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setDrafts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDrafts();
  }, [token]);

  return (
    <>
      <Navbar showAuthButtons={false} />
      <div className="min-h-screen bg-[#1F2028] text-white flex flex-col items-center py-20 px-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-orange-500 mb-3">
          Your Brand Stories
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Create compelling narratives that connect with your audience
        </p>

        <button
          className="bg-gradient-to-r from-orange-500 to-pink-600 px-5 py-2 rounded-md font-medium shadow-lg hover:opacity-90 transition"
          onClick={() => navigate("/create-story")}
        >
          Create New Story
        </button>

        {/* Gradient Divider */}
        <div className="relative w-full my-16">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-orange-500 to-pink-600 rounded-t-[100px]"></div>
        </div>

        {/* Previous Drafts */}
        <h2 className="text-3xl font-semibold text-orange-500 mb-8 mt-20">
          Previous Drafts
        </h2>

        {drafts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-[#2A2B33] rounded-xl p-5 w-72 shadow-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() => navigate(`/stories/${draft.id}`)}
              >
                <h3 className="text-xl font-bold mb-2">{draft.title}</h3>
                <p className="text-sm text-gray-400 mb-3">
                  {draft.date} · {draft.category}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {draft.preview}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center min-h-[300px] mt-10">
            <h1 className="text-2xl text-gray-400 mb-4">
              You don't have stories yet!
            </h1>
            <button
              className="bg-gradient-to-r from-orange-500 to-pink-600 px-5 py-2 rounded-md font-medium shadow-lg hover:opacity-90 transition"
              onClick={() => navigate("/create-story")}
            >
              Create New Story
            </button>
          </div>
        )}
      </div>
    </>
  );
}
