import React, { useState } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

export default function CreateStory() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyPitch: "",
    targetAudience: "",
    storyTone: "",
    coreValues: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <Navbar showAuthButtons={false} />
      <div className="min-h-screen bg-[#1F2028] text-white flex flex-col items-center py-20 px-6">
        <form className="bg-[#qF2028] shadow-2xl rounded-2xl p-10">
          <h1 className="text-2xl text-center text-orange-500 font-bold mb-3">
            Create Story
          </h1>
          <p className="text-gray-400 text-sm mb-5 text-center">
            Share Your company details and let AI craft compelling narratives{" "}
            <br />
            that resonate with your audience
          </p>

          <div className="space-y-5 mb-5 flex flex-col items-center">
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
            <Button>Create Story</Button>
          </div>
        </form>
      </div>
    </>
  );
}
