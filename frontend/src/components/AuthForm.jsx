import { useState } from "react";
import Navbar from "./Navbar";

export default function AuthForm({ type, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isSignUp = type === "signup";

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg text-white border border-white/10">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                required
                className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-gradient-to-r from-pink-500 to-purple-500 font-semibold hover:opacity-90 transition"
          >
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <a href="/login" className="text-pink-400 hover:underline">
                Log in
              </a>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <a href="/signup" className="text-pink-400 hover:underline">
                Sign up
              </a>
            </>
          )}
        </p>
      </div>
    </>
  );
}
