import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function StoriesPage() {
  const { id } = useParams();
  const [selectedStory, setSelectedStory] = useState(null);
  const [stories, setStories] = useState([]);
  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/stories/story/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setStories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch stories", err);
      }
    };
    fetchStories();
  }, [API_URL, id, token]);

  return (
    <>
      <Navbar showAuthButtons={false} />
      <div className="min-h-screen bg-[#1F2028] text-white flex flex-col items-center pt-16 px-6">
        <h1 className="text-4xl font-bold text-orange-500 mb-6">
          AI Generated Stories
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="bg-[#2A2B33] rounded-xl p-6 w-72 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-bold mb-2">{story.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{story.date}</p>
              <p className="text-gray-300 text-sm line-clamp-3">
                {story.content}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Overlay */}
        {selectedStory && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={() => setSelectedStory(null)}
          >
            {/* Modal Content */}
            <div
              className="bg-[#2A2B33] p-8 rounded-2xl max-w-lg w-full mx-4 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
                onClick={() => setSelectedStory(null)}
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-orange-500 mb-2">
                {selectedStory.title}
              </h2>
              <p className="text-sm text-gray-400 mb-4">{selectedStory.date}</p>
              <p className="text-gray-200 leading-relaxed">
                {selectedStory.content}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
