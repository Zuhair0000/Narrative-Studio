import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StoriesPage from "./pages/StoriesPage";
import CreateStory from "./pages/CreateStory";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stories/:id" element={<StoriesPage />} />
        <Route path="/create-story" element={<CreateStory />} />
      </Routes>
    </>
  );
}
