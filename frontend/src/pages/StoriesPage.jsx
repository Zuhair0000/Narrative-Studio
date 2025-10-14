import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function StoriesPage() {
  const { id } = useParams();
  const [selectedStory, setSelectedStory] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/stories/story/${id}`
        );
        const data = await res.json();
        setStories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch stories", err);
      }
    };
    fetchStories();
  }, [id]);

  // const stories = [
  //   {
  //     id: 1,
  //     title: "Story One",
  //     content:
  //       "This is the first story. It goes into more detail about your brand’s message and narrative direction. You can expand this with multiple paragraphs to simulate a real story.",
  //     date: "October 9, 2025",
  //   },
  //   {
  //     id: 2,
  //     title: "Story Two",
  //     content:
  //       "This story explores a different approach to connecting with your audience. The content elaborates on how storytelling enhances brand identity.",
  //     date: "October 8, 2025",
  //   },
  //   {
  //     id: 3,
  //     title: "Story Three",
  //     content:
  //       "This is the third story example. It showcases your creative storytelling techniques and brand positioning.",
  //     date: "October 7, 2025",
  //   },
  // ];

  return (
    <>
      <Navbar showAuthButtons={false} />
      <div className="min-h-screen bg-[#1F2028] text-white flex flex-col items-center pt-16 px-6">
        <h1 className="text-4xl font-bold text-orange-500 mb-6">
          Draft #{id} Stories
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
