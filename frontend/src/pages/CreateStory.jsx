import React, { useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CreateStory() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyPitch: "",
    targetAudience: "",
    storyTone: "",
    coreValues: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/stories/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Generated stories:", data);

      if (res.ok) {
        alert("Stories generated successfully!");
        navigate(`/stories/${data.draft_id}`);
      } else {
        alert(data.message || "Failed to generate stories");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Navbar showAuthButtons={false} />
      <div className="min-h-screen bg-[#1F2028] text-white flex flex-col items-center">
        {/* Form */}
        <form className="bg-[#1F2028] shadow-2xl rounded-2xl p-10 mt-20 w-full max-w-3xl z-10 relative">
          <h1 className="text-2xl text-center text-orange-500 font-bold mb-3">
            Create Story
          </h1>
          <p className="text-gray-400 text-sm mb-5 text-center">
            Share your company details and let AI craft compelling narratives
            that resonate with your audience
          </p>

          <div className="space-y-5 flex flex-col items-center w-full">
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-100 bg-gray-800 border border-gray-700 rounded-2xl p-2 text-s, focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Company Pitch
              </label>
              <textarea
                name="companyPitch"
                value={formData.companyPitch}
                onChange={handleChange}
                rows="3"
                className="w-100 bg-gray-800 border border-gray-700 rounded-2xl p-2 text-s, focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Target Audience
              </label>
              <input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                placeholder="e.g. Small business owners"
                className="w-100 bg-gray-800 border border-gray-700 rounded-2xl p-2 text-s, focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Story Tone
              </label>
              <select
                name="storyTone"
                value={formData.storyTone}
                onChange={handleChange}
                className="w-100 bg-gray-800 border border-gray-700 rounded-2xl p-2 text-s, focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
              >
                <option value="">Select Tone... </option>
                <option value="Professional">Professional </option>
                <option value="Casual">Casual </option>
                <option value="Inspiring">Inspiring </option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                Core Values
              </label>
              <input
                type="text"
                name="coreValues"
                value={formData.coreValues}
                onChange={handleChange}
                placeholder="Innovation, Sustainability, Customer-First"
                className="w-100 bg-gray-800 border border-gray-700 rounded-2xl p-2 text-s, focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <Button onSubmit={handleSubmit}>Create Story</Button>
          </div>
        </form>

        {/* Gradient Section */}
        <div className="flex-1 w-full bg-gradient-to-r from-[#F3911D] to-[#840B86] rounded-t-[100px] mt-10"></div>
      </div>
    </>
  );
}
